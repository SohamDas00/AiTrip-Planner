import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_SDK,
});

export async function POST(req: NextRequest) {
  try {
    const {
      source,
      destination,
      groupSize,
      budget,
      tripDuration,
      interest,
      special,
    } = await req.json();

    const FINAL_PROMPT = `
Generate a complete travel plan using the following details.

Trip Details

Origin: ${source}
Destination: ${destination}
Group Size: ${groupSize}
Budget: ${budget}
Trip Duration: ${tripDuration}
Travel Interests: ${interest}
Special Requirements: ${special}

Generate the best travel itinerary.

Return ONLY valid JSON.

Output Schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}

Do not return markdown.

Do not explain anything.

Return ONLY valid JSON.
`;

    const models = [
      "google/gemma-4-31b-it:free",
      "openai/gpt-oss-20b:free",
    ];

    let lastError: any = null;

    for (const model of models) {
      try {
        const completion = await openai.chat.completions.create({
          model,
          temperature: 0.2,
          messages: [
            {
              role: "user",
              content: FINAL_PROMPT,
            },
          ],
        });

        const content = completion.choices[0].message.content ?? "";

        const cleaned = content
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();

        const data = JSON.parse(cleaned);

        // For now just log it
        console.log("========= GENERATED TRIP =========");
        // console.dir(data, { depth: null });
        console.log(JSON.stringify(data, null, 2));

        return NextResponse.json(data);
      } catch (err: any) {
        lastError = err;

        if (err?.status === 429) {
          console.log(`${model} rate limited. Trying next...`);
          continue;
        }

        break;
      }
    }

    console.error(lastError);

    return NextResponse.json(
      {
        error: "Unable to generate trip. Please try again.",
      },
      {
        status: 500,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}