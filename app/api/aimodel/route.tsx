import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_SDK,
    defaultHeaders: {
        "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        "X-OpenRouter-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    },
})

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final) , where Final means AI generating complete final outpur


Every single response MUST be valid JSON.

Return ONLY:

{
  "resp": "text to show user",
  "ui": "source|destination|groupSize|budget|TripDuration|interest|special|Final"
}

For EVERY response, return ONLY a JSON object.

Do not include any text before or after the JSON.

`

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-oss-20b:free",
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: PROMPT,
                },
                ...messages,
            ]
        })

        const content = completion.choices[0].message.content ?? "";

        try {
            return NextResponse.json(JSON.parse(content));
        } catch {
            const start = content.indexOf("{");
            const end = content.lastIndexOf("}");

            if (start !== -1 && end !== -1) {
                try {
                    return NextResponse.json(
                        JSON.parse(content.slice(start, end + 1))
                    );
                } catch { }
            }

            return NextResponse.json({
                resp: content,
                ui: "unknown",
            });
        }
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}