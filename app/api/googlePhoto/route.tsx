import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();

    const baseURL = "https://places.googleapis.com/v1/places:searchText";

    try {
        const result = await axios.post(
            baseURL,
            {
                textQuery: placeName,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.GOOGLE_PLACE_KEY,
                    "X-Goog-FieldMask": "places.id,places.displayName,places.photos,places.photos"
                }
            }
        );


        console.log("FULL GOOGLE RESPONSE:", JSON.stringify(result.data, null, 2));

        const place = result.data?.places?.[0];

        console.log("PLACE:", JSON.stringify(place, null, 2));

        if (!place) {
            return NextResponse.json({ photoUrl: null });
        }

        // 2. Get first photo
        const photoName = place.photos?.[0]?.name;

        console.log("PHOTO NAME:", photoName);

        if (!photoName) {
            return NextResponse.json({ photoUrl: null });
        }
        const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_PLACE_KEY}`;

        console.log("PHOTO URL:", photoUrl);

        // Standardizing response as an object wrapper
        return NextResponse.json({ photoUrl });

    } catch (error: any) {
        console.log("Google API Error:", error?.response?.data || error.message);
        return NextResponse.json(
            { error: error?.response?.data || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}