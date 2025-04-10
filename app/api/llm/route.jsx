import OpenAI from "openai";
import { LLM_MODEL, QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {
  const { title, description, duration, type } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{title}}", title)
    .replace("{{description}}", description)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);

  console.log(FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      // model: "google/gemini-2.5-pro-exp-03-25:free",
      model: LLM_MODEL,
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
