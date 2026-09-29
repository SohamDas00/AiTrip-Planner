import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const HOTEL_FALLBACKS = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
];

const DESTINATION_FALLBACKS = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
];

function getFallbackImage(name: string): string {
  const isHotel = /hotel|resort|inn|suite|hostel|villa|lodge|stay/i.test(name);
  const list = isHotel ? HOTEL_FALLBACKS : DESTINATION_FALLBACKS;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % list.length;
  return list[index];
}

async function fetchWikiImage(query: string): Promise<string | null> {
  try {
    const clean = query.split(",")[0].trim();
    if (!clean) return null;

    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      clean
    )}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=1000`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "AITripPlanner/1.0 (contact: info@aitripplanner.dev)",
      },
      timeout: 5000,
    });

    const pages = res.data?.query?.pages;
    if (pages) {
      const first = Object.values(pages)[0] as any;
      if (first?.thumbnail?.source) {
        return first.thumbnail.source;
      }
    }
  } catch (err: any) {
    console.log("Wiki Image Fetch Error:", err?.message || err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { placeName } = await req.json();

    if (!placeName || typeof placeName !== "string") {
      return NextResponse.json({ photoUrl: DESTINATION_FALLBACKS[0] });
    }

    const apiKey = process.env.GOOGLE_PLACE_KEY;

    // 1. Try Google Places API (New) if API key is provided
    if (apiKey) {
      try {
        const baseURL = "https://places.googleapis.com/v1/places:searchText";
        const result = await axios.post(
          baseURL,
          { textQuery: placeName },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "places.id,places.displayName,places.photos",
            },
            timeout: 6000,
          }
        );

        const place = result.data?.places?.[0];
        const photoName = place?.photos?.[0]?.name;

        if (photoName) {
          const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`;
          return NextResponse.json({ photoUrl });
        }
      } catch (googleError: any) {
        console.log(
          "Google Places API fetch error:",
          googleError?.response?.data || googleError.message
        );
      }
    }

    // 2. High-Quality Fallback: Wikipedia / Wikimedia Commons photo
    const wikiPhoto = await fetchWikiImage(placeName);
    if (wikiPhoto) {
      return NextResponse.json({ photoUrl: wikiPhoto });
    }

    // 3. Guaranteed Fallback: Curated high-res Travel/Hotel photo
    const fallbackPhoto = getFallbackImage(placeName);
    return NextResponse.json({ photoUrl: fallbackPhoto });
  } catch (error: any) {
    console.error("googlePhoto handler general error:", error);
    return NextResponse.json(
      { photoUrl: DESTINATION_FALLBACKS[0] },
      { status: 200 }
    );
  }
}