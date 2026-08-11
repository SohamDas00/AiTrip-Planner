// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const { placeName } = await req.json();

//     const baseURL =
//         "https://places.googleapis.com/v1/places:searchText";

//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//             "X-Goog-Api-Key": process.env.GOOGLE_PLACE_KEY,
//             // "X-Goog-FieldMask": "places.photos,places.displayName,places.id",
//             "X-Goog-FieldMask": "*",
//         },
//     };

//     try {
//         // Search hotel
//         const result = await axios.post(
//             baseURL,
//             {
//                 textQuery: placeName,
//             },
//             config
//         );

//         const place = result.data?.places?.[0];

//         console.log("PLACE:", place);
//         console.log("PHOTOS:", place?.photos);

//         if (!place) {
//             return NextResponse.json({
//                 photoUrl: null,
//             });
//         }

//         // Get first Google photo
//         const photoName = place?.photos?.[0]?.name;

//         console.log("PHOTO NAME:", photoName);

//         if (!photoName) {
//             return NextResponse.json({
//                 photoUrl: null,
//             });
//         }

//         // Get actual image
//         const photoResult = `https://places.googleapis.com/v1/${photoName}/media?key=${process.env.GOOGLE_PLACE_KEY}`;

//         console.log("PHOTO URL:", photoResult);

//         return NextResponse.json({ photoUrl: photoResult });

//     } catch (error: any) {
//         console.log(
//             "Google API Error:",
//             error?.response?.data || error.message
//         );

//         return NextResponse.json(
//             {
//                 error: error?.response?.data || error.message,
//             },
//             {
//                 status: error?.response?.status || 500,
//             }
//         );
//     }
// }



import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();

    const baseURL = "https://places.googleapis.com/v1/places:searchText";

    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.GOOGLE_PLACE_KEY,
            "X-Goog-FieldMask": "places.id,places.displayName",
        },
    };

    try {
        // Step 1: Text Search - just find the place id
        const result = await axios.post(
            baseURL,
            { textQuery: placeName },
            config
        );

        const place = result.data?.places?.[0];
        console.log("PLACE:", place);

        if (!place?.id) {
            return NextResponse.json({ photoUrl: null });
        }

        // Step 2: Place Details - ask specifically for photos using the id
        const detailsResult = await axios.get(
            `https://places.googleapis.com/v1/places/${place.id}`,
            {
                headers: {
                    "X-Goog-Api-Key": process.env.GOOGLE_PLACE_KEY,
                    "X-Goog-FieldMask": "photos",
                },
            }
        );

        console.log("DETAILS PHOTOS:", detailsResult.data?.photos);

        const photoName = detailsResult.data?.photos?.[0]?.name;
        console.log("PHOTO NAME:", photoName);

        if (!photoName) {
            return NextResponse.json({ photoUrl: null });
        }

        // Step 3: Build the direct photo URL
        const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?key=${process.env.GOOGLE_PLACE_KEY}&maxWidthPx=800`;

        console.log("PHOTO URL:", photoUrl);

        return NextResponse.json({ photoUrl });

    } catch (error: any) {
        console.log(
            "Google API Error:",
            error?.response?.data || error.message
        );

        return NextResponse.json(
            { error: error?.response?.data || error.message },
            { status: error?.response?.status || 500 }
        );
    }
}