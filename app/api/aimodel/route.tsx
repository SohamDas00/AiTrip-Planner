import { NextRequest, NextResponse } from "next/server";

const STEPS = [
  {
    ui: "source",
    question: "Where are you starting your trip from?",
  },
  {
    ui: "destination",
    question: "Great! Where would you like to travel?",
  },
  {
    ui: "groupSize",
    question: "How many people will be traveling with you? (e.g., Solo, Couple, Family, Friends)",
  },
  {
    ui: "budget",
    question: "What budget level are you aiming for? (Low, Medium, High)",
  },
  {
    ui: "TripDuration",
    question: "How many days will your trip last?",
  },
  {
    ui: "interest",
    question:
      "What kind of trip are you interested in? (Adventure, Sightseeing, Food, Culture, Nature, Relaxation, Nightlife)",
  },
  {
    ui: "special",
    question: "Do you have any special requirements or preferences?",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const userMessages = messages.filter(
      (m: any) => m.role === "user"
    );

    const totalAnswers = userMessages.length;

    // Still asking questions
    if (totalAnswers < STEPS.length) {
      const nextStep = STEPS[totalAnswers];

      return NextResponse.json({
        resp: nextStep.question,
        ui: nextStep.ui,
      });
    }

    // All questions completed
    const tripDetails = {
      source: userMessages[0]?.content ?? "",
      destination: userMessages[1]?.content ?? "",
      groupSize: userMessages[2]?.content ?? "",
      budget: userMessages[3]?.content ?? "",
      tripDuration: userMessages[4]?.content ?? "",
      interest: userMessages[5]?.content ?? "",
      special: userMessages[6]?.content ?? "",
    };

    return NextResponse.json({
      resp: "Perfect! I'm generating your personalized travel itinerary...",
      ui: "Final",
      tripDetails,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        resp: "Something went wrong.",
        ui: "error",
      },
      {
        status: 500,
      }
    );
  }
}