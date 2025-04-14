import { LLM_MODEL, FEEDBACK_PROMPT } from '@/services/Constants'
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { conversation } = await req.json();

    // if (!conversation) {
    //     return NextResponse.json({ error: "Conversation data is required." }, { status: 400 });
    // }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

    try {
        console.log("FINAL_PROMPT:", FINAL_PROMPT); // Good for debugging

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: LLM_MODEL,
            messages: [{ role: "user", content: FINAL_PROMPT }],

            response_format: 'json',
        });

        // Check if the response is valid before accessing properties
        if (completion && completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
            return NextResponse.json(completion.choices[0].message);
        }

    } catch (error) {
        console.error("API Route Error:", error);
        let errorMessage = "An internal server error occurred.";
        let statusCode = 500;

        return NextResponse.json({ error: errorMessage, details: error.message }, { status: statusCode });
    }
}