import { fetcher } from "@/utils/fetcter";
import { NextResponse } from "next/server";

const FORECAST_WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function POST(req: Request) {
  let body: LatLng;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { lat, lng } = body;
  if (typeof lat !== "number" || typeof lng !== "number") {
    return NextResponse.json(
      { message: "`lat` and `lng` must be numbers" },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    console.warn("OPEN_WEATHER_API_KEY is not set");
    return NextResponse.json(
      {
        message: "Server misconfiguration",
      },
      { status: 400 },
    );
  }

  try {
    const url = new URL(FORECAST_WEATHER_URL);
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lng.toString());
    url.searchParams.set("appid", apiKey);
    url.searchParams.set("units", "metric");
    // url.searchParams.set("cnt", "7");

    const data = await fetcher<WeatherForecast>(url.toString());
    return NextResponse.json(data);
  } catch (error) {
    console.error("OpenWeatherMap Forecast request failed:", error);
    return NextResponse.json(
      { message: "Failed to fetch OpenWeatherMap forecast results" },
      { status: 502 },
    );
  }
}
