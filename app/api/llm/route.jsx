import OpenAI from "openai";
import { NextResponse } from "next/server"; // Import NextResponse
import { LLM_MODEL, QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {
  try { // It's often better to wrap the whole thing, including req.json()
    const { title, description, duration, type } = await req.json();

    // Basic validation (optional but recommended)
    if (!title || !description || !duration || !type) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{title}}", title)
      .replace("{{description}}", description)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("FINAL_PROMPT:", FINAL_PROMPT); // Good for debugging

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: LLM_MODEL,
      messages: [{ role: "user", content: FINAL_PROMPT }],

      response_format:'json',
    });

    // Check if the response is valid before accessing properties
    if (completion && completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
        console.log("OpenRouterAI Response Message:", completion.choices[0].message);
        // --- Return the successful response directly from the try block ---
        return NextResponse.json(completion.choices[0].message);
    } else {
        // Handle cases where OpenRouterAI might return an unexpected structure or no choices
        console.error("Unexpected response structure from OpenRouterAI:", completion);
        return NextResponse.json({ error: "Failed to get a valid response from LLM" }, { status: 502 }); // 502 Bad Gateway might be appropriate
    }

  } catch (error) {
    console.error("API Route Error:", error); // Log the actual error for server-side debugging

    // Return a structured error response with an appropriate status code
    // Avoid returning the raw error object to the client for security reasons
    let errorMessage = "An internal server error occurred.";
    let statusCode = 500;

    // Check if it's an OpenRouterAI API error to potentially provide more specific feedback
    if (error instanceof OpenAI.APIError) {
         errorMessage = `LLM API Error: ${error.status} ${error.name}`;
         statusCode = error.status || 500;
    } else if (error.name === 'SyntaxError') { // Handle potential JSON parsing errors
        errorMessage = "Invalid request format.";
        statusCode = 400;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}