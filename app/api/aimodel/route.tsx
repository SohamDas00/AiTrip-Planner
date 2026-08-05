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

const PROMPT = `You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by asking ONE trip-related question at a time.

Ask the questions ONLY in this exact order:

1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (Adventure, Sightseeing, Food, Culture, Nature, Relaxation, Nightlife)
7. Special requirements or preferences

Rules:

- Ask ONLY ONE question at a time.
- Wait for the user's answer before asking the next question.
- Never ask multiple questions together.
- Never repeat the same question unless the user's answer is completely unrelated.
- Never ask for confirmation.
- Never output markdown.
- Never output explanations.
- Always respond with valid JSON only.

=========================
UI MAPPING (STRICT)
=========================

Whenever you ask a question, the "ui" field MUST be exactly one of these values.

Question: "Where are you starting your trip from?"
ui: "source"

Question: "Great! Where would you like to travel?"
ui: "destination"

Question: "How many people will be traveling with you? (e.g., Solo, Couple, Family, Friends)"
ui: "groupSize"

Question: "What budget level are you aiming for? (Low, Medium, High)"
ui: "budget"

Question: "How many days will your trip last?"
ui: "TripDuration"

Question: "What kind of trip are you interested in? (Adventure, Sightseeing, Food, Culture, Nature, Relaxation, Nightlife)"
ui: "interest"

Question: "Do you have any special requirements or preferences?"
ui: "special"

After collecting ALL information, DO NOT generate the itinerary.

Instead return:

{
  "resp": "Thank you! I'm generating your personalized itinerary. This may take a moment.",
  "ui": "Final"
}

=========================
OUTPUT FORMAT
=========================

Every response MUST be valid JSON.

Return ONLY:

{
  "resp": "question or message",
  "ui": "one ui value"
}

The "ui" field MUST contain EXACTLY ONE of these values:

source
destination
groupSize
budget
TripDuration
interest
special
Final

Never return:

"source|destination|groupSize|budget|TripDuration|interest|special|Final"

Never return multiple ui values.

Never return "unknown".

Never include text before or after the JSON.

`

export async function POST(req: NextRequest) {
    const { messages } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemma-4-31b-it:free",
            // response_format: { type: 'json_object' },
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