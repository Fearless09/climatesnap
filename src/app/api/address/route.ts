import { fetcher } from "@/utils/fetcter";
import { NextResponse } from "next/server";

const OPENCAGE_URL = "https://api.opencagedata.com/geocode/v1/json";

interface GeocodeRequestBody {
  query: string;
}

export async function POST(req: Request) {
  let body: GeocodeRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json(
      { message: "`query` is required and must be a non-empty string" },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPEN_CAGE_API_KEY;
  if (!apiKey) {
    console.error("OPEN_CAGE_API_KEY is not set");
    return NextResponse.json(
      { message: "Server misconfiguration" },
      { status: 500 },
    );
  }

  try {
    const url = new URL(OPENCAGE_URL);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("q", query);
    url.searchParams.set("pretty", "1");
    url.searchParams.set("no_annotations", "1");

    const data = await fetcher<{ results: GeocodingResult[] }>(url.toString());

    const results: GeocodingResult[] = [...data.results]
      .map((item) => ({
        confidence: item.confidence,
        formatted: item.formatted,
        geometry: item.geometry,
        components: {
          _category: item.components._category,
          _type: item.components._type,
          continent: item.components.continent,
          country: item.components.country,
          country_code: item.components.country_code,
        },
      }))
      .sort((a, b) => b.confidence - a.confidence);

    return NextResponse.json(results);
  } catch (err) {
    console.error("OpenCage geocoding request failed:", err);
    return NextResponse.json(
      { message: "Failed to fetch geocoding results" },
      { status: 502 },
    );
  }
}
