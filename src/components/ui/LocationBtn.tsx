"use client";

import { useWeather } from "@/context/WeatherContext";
import { defaultCoordinate } from "@/data/default-coordinate";
import { fetcher } from "@/utils/fetcter";
import { getCurrentPosition } from "@/utils/utils";
import { useMemo, useState } from "react";

const LocationBtn = () => {
  const { weatherDispacter, locationData } = useWeather();
  const [coord, setCoord] = useState<LatLng | null>(null);

  const onClick = async () => {
    try {
      const { lat, lng, error } = await getCurrentPosition(defaultCoordinate);
      if (error) return alert(error);

      weatherDispacter({
        type: "set-loading",
        payload: { location: true, weather: true, forecast: true },
      });
      setCoord({ lat, lng });

      const [address, weather, forecast] = await Promise.all([
        fetcher<GeocodingResult[]>("/api/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: `${lat},${lng}` }),
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
      ]);

      weatherDispacter({ type: "set-forecast", payload: forecast });
      weatherDispacter({ type: "set-location", payload: address[0] });
      weatherDispacter({ type: "set-weather", payload: weather });
    } catch (error) {
    } finally {
      weatherDispacter({
        type: "set-loading",
        payload: { location: false, weather: false, forecast: false },
      });
    }
  };

  const isCurrentCoord = useMemo(() => {
    if (!coord || !locationData) return false;
    return (
      coord.lat === locationData.geometry.lat &&
      coord.lng === locationData.geometry.lng
    );
  }, [coord, locationData]);

  if (isCurrentCoord) return;

  return (
    <button
      onClick={onClick}
      className="transition-300 w-max cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-500 hover:bg-zinc-50 active:scale-98 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      type="button"
      aria-label="Use Current Location"
    >
      Use Current Location
    </button>
  );
};

export default LocationBtn;
