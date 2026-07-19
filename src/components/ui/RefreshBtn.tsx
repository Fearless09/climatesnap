"use client";

import { useWeather } from "@/context/WeatherContext";
import { defaultCoordinate } from "@/data/default-coordinate";
import { fetcher, getData, STORAGE_KEY } from "@/utils/fetcter";
import { cn, getCurrentPosition } from "@/utils/utils";
import { RefreshCw } from "lucide-react";

const RefreshBtn = () => {
  const { weatherData, loading, locationData, weatherDispacter } = useWeather();

  const refreshWeather = async () => {
    weatherDispacter({
      type: "set-loading",
      payload: { location: true, weather: true },
    });

    try {
      const { lat, lng } = await getCurrentPosition(defaultCoordinate);
      const query = locationData ? locationData.formatted : `${lat},${lng}`;

      const [address, weather, forecast, favorites] = await Promise.all([
        fetcher<GeocodingResult[]>("/api/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }),
        fetcher<OpenWeatherMap>("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lng }),
        }),
        fetcher<WeatherForecast>("/api/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lng }),
        }),
        getData<GeocodingResult[]>(STORAGE_KEY, []),
      ]);

      weatherDispacter({ type: "set-favorites", payload: favorites });
      weatherDispacter({ type: "set-location", payload: address[0] });
      weatherDispacter({ type: "set-weather", payload: weather });
      weatherDispacter({ type: "set-forecast", payload: forecast });
    } catch (error) {
    } finally {
      weatherDispacter({
        type: "set-loading",
        payload: { location: false, weather: false },
      });
    }
  };

  if (!weatherData) return;

  return (
    <button
      onClick={refreshWeather}
      disabled={loading.weather}
      className={cn(
        "transition-300 flex size-10.5 cursor-pointer items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 hover:bg-slate-50 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800",
      )}
      title="Refresh Weather Data"
    >
      <RefreshCw
        className={cn("size-5", { "animate-spin": loading.weather })}
      />
    </button>
  );
};

export default RefreshBtn;
