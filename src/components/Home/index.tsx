"use client";

import { HelpCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { FavoritesList } from "../shared/FavoritesList";
import { ForecastTimeline } from "../shared/ForecastTimeline";
import { WeatherCard } from "../shared/WeatherCard";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import { useWeather } from "@/context/WeatherContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getCurrentPosition } from "@/utils/utils";
import { fetcher, getData, STORAGE_KEY } from "@/utils/fetcter";
import { defaultCoordinate } from "@/data/default-coordinate";
import { useToggle } from "@/hooks/useToggle";
import LocationBtn from "../ui/LocationBtn";

const HomePage = () => {
  const { weatherData, loading } = useWeather();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [mount, toggleMount] = useToggle(false);

  useGSAP(
    () => {
      if (!dashboardRef.current) return;

      const tl = gsap.timeline();
      tl.fromTo(
        dashboardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3",
      );
    },
    { scope: dashboardRef },
  );

  useEffect(() => toggleMount(true), []);
  if (!mount) return;

  return (
    <main
      ref={dashboardRef}
      className="wrapper flex flex-1 flex-col justify-center py-8"
    >
      {loading.weather ? (
        <LoadingJsx />
      ) : weatherData ? (
        <section className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <main className="flex w-full flex-col gap-6 lg:col-span-2">
            <LocationBtn />
            <WeatherCard />
            <ForecastTimeline />
          </main>

          <main className="sticky top-31 flex w-full flex-col gap-6">
            <FavoritesList />
            <WidgetJsx />
          </main>
        </section>
      ) : (
        <ErrorJsx />
      )}
    </main>
  );
};

export default HomePage;

const ErrorJsx = () => {
  const { loading, weatherDispacter, locationData } = useWeather();

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

  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center rounded-3xl border border-red-500/5 bg-white px-4 py-8 text-center shadow-2xl dark:bg-zinc-900">
      <DotLottieReact src="/error.lottie" className="size-15" loop autoplay />

      <h3 className="mt-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">
        Connection Interrupted
      </h3>
      <p className="mt-2 max-w-70 text-sm leading-relaxed text-pretty text-zinc-400">
        We couldn't load the weather details. Please verify your connection and
        try again.
      </p>

      <button
        onClick={refreshWeather}
        disabled={loading.weather}
        className="transition-300 mt-6 cursor-pointer rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600"
      >
        Retry Connection
      </button>
    </section>
  );
};

const LoadingJsx = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center py-20">
      <DotLottieReact src="/compass.lottie" className="size-30" loop autoplay />

      <h3 className="text-lg font-bold tracking-wide text-zinc-700 dark:text-zinc-100">
        Positioning ClimateSnap...
      </h3>
      <p className="mt-2 text-xs font-semibold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
        Detecting location and fetching snaps
      </p>
    </section>
  );
};

const WidgetJsx = () => {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-linear-to-br from-blue-500/5 to-teal-500/5 px-5 py-6 shadow-sm backdrop-blur-xl dark:border-zinc-900 dark:from-blue-500/15 dark:to-indigo-500/15">
      <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
        <HelpCircle className="size-5" />
        <h4 className="text-sm font-extrabold tracking-wider uppercase">
          Climate Fact
        </h4>
      </div>

      <p className="mt-3.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        Did you know? Geolocation allows ClimateSnap to give you immediate,
        high-fidelity local weather updates based on your coordinates. You can
        also search for cities globally and add them to your wishlist to track
        them in real time!
      </p>
    </section>
  );
};
