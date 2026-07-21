"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { useWeather } from "@/context/WeatherContext";
import { WeatherVisuals } from "./WeatherVisuals";
import {
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Cloudy,
  Umbrella,
  Calendar,
  Loader2,
  Clock,
} from "lucide-react";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { cn, getDate, getIconUrl } from "@/utils/utils";
import Image from "next/image";

export const WeatherCard: React.FC = () => {
  const { weatherData, loading, locationData, weatherDispacter, favorites } =
    useWeather();

  const cardContentRef = useRef<HTMLDivElement>(null);

  // Trigger scale/fade animation on day change or location change
  useGSAP(
    () => {
      if (cardContentRef.current) {
        gsap.fromTo(
          cardContentRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      }
    },
    {
      dependencies: [weatherData],
      scope: cardContentRef,
    },
  );

  const formatDate = useCallback(() => {
    if (!weatherData) return { date: "", time: "" };

    const date = getDate(weatherData.dt);
    const now = new Date();

    const startOfGiven = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    let label: "Today" | "Past" | "Future";

    if (startOfGiven.getTime() < startOfToday.getTime()) label = "Past";
    else if (startOfGiven.getTime() > startOfToday.getTime()) label = "Future";
    else label = "Today";

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    return {
      date: label + " - " + date.toLocaleDateString("en-US", options),
      time,
    };
  }, [weatherData]);

  const isFav = useMemo(() => {
    if (!locationData || favorites.length === 0) return false;

    return favorites.some(
      (f) => f.formatted.toLowerCase() === locationData.formatted.toLowerCase(),
    );
  }, [favorites, locationData]);

  const handleFavoriteToggle = useCallback(() => {
    if (!locationData) return;
    weatherDispacter({
      type: "toggle-favorite",
      payload: locationData,
    });
  }, [locationData]);

  // Stat details grid
  const stats = useMemo(() => {
    if (!weatherData) return [];

    const getPrecipitation = () => {
      if (weatherData.rain) {
        return `${weatherData.rain["1h"] || weatherData.rain["3h"] || 0} mm`;
      } else if (weatherData.snow) {
        return `${weatherData.snow["1h"] || weatherData.snow["3h"] || 0} mm`;
      } else return "0 mm";
    };

    return [
      {
        label: "Feels Like",
        value: `${Math.round(weatherData.main.feels_like)}°C`,
        icon: Thermometer,
        color: "text-amber-500 dark:text-amber-400",
      },
      {
        label: "Wind Speed",
        value: `${weatherData.wind.speed} m/s`,
        icon: Wind,
        color: "text-blue-500 dark:text-blue-400",
      },
      {
        label: "Humidity",
        value: `${weatherData.main.humidity}%`,
        icon: Droplets,
        color: "text-teal-500 dark:text-teal-400",
      },
      {
        label: "Pressure",
        value: `${weatherData.main.pressure} hPa`,
        icon: Gauge,
        color: "text-purple-500 dark:text-purple-400",
      },
      {
        label: "Cloud Coverage",
        value: `${weatherData.clouds.all}%`,
        icon: Cloudy,
        color: "text-zinc-500 dark:text-zinc-400",
      },
      {
        label: "Precipitation",
        value: getPrecipitation(),
        icon: Umbrella,
        color: "text-indigo-500 dark:text-indigo-400",
      },
    ];
  }, [weatherData]);

  if (loading.weather && !weatherData) {
    return (
      <section className="flex w-full flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white py-12.5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900">
        <Loader2 className="size-12 animate-spin text-blue-500" />
        <p className="mt-4 animate-pulse text-sm font-semibold text-zinc-500">
          Loading weather snaps...
        </p>
      </section>
    );
  }

  if (!weatherData || !locationData) return null;

  return (
    <section className="transition-300 relative w-full overflow-hidden rounded-3xl border border-zinc-200 shadow-xl dark:border-zinc-800">
      {/* Background Visual Layer */}
      <WeatherVisuals condition={weatherData.weather[0].main || "Clear"} />

      {/* Main Glass Content Container */}
      <section
        ref={cardContentRef}
        className="relative z-10 flex h-full flex-col justify-between px-5 py-6 text-zinc-800 md:p-8 dark:text-zinc-100"
      >
        {/* Top Header Row */}
        <main className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="truncate text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                {locationData.formatted.split(",").slice(0, 2).join(", ")}
              </h2>
              <span className="shrink-0 rounded-md bg-blue-500/15 px-2 py-0.5 text-sm font-extrabold text-blue-500 uppercase backdrop-blur-sm">
                {locationData.components.country_code}
              </span>
            </div>

            <p className="mt-1.75 flex items-center gap-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              <Calendar className="-mt-0.5 size-3.5 text-zinc-400" />
              {formatDate().date}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              <Clock className="size-3.5 text-zinc-400" />
              {formatDate().time}
            </p>
          </div>

          {locationData.formatted !== "Your Location" && (
            <button
              onClick={handleFavoriteToggle}
              className={cn(
                `transition-300 shrink-0 cursor-pointer rounded-2xl border border-zinc-200 bg-white p-3 text-zinc-400 backdrop-blur-xl`,
                {
                  "scale-105 border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20":
                    isFav,
                  "hover:scale-105 hover:text-red-500 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-500 dark:hover:text-red-400":
                    !isFav,
                },
              )}
              title={
                isFav
                  ? "Remove location from favorites"
                  : "Save location to favorites"
              }
            >
              <Heart className={cn(`size-5`, { "fill-current": isFav })} />
            </button>
          )}
        </main>

        {/* Mid Hero Section */}
        <main className="my-8 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center">
            <h1 className="flex items-center">
              <span className="text-7xl font-black tracking-tighter text-zinc-800 select-none md:text-8xl dark:text-white">
                {Math.round(weatherData.main.temp)}
              </span>
              <span className="mt-2 self-start text-3xl font-extrabold text-blue-500 md:text-4xl">
                °C
              </span>
            </h1>

            <div className="ml-5">
              <p className="text-xl font-bold text-zinc-800 capitalize md:text-2xl dark:text-zinc-200">
                {weatherData.weather[0].description || "Clear Sky"}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-500 dark:text-red-400">
                  H: {Math.round(weatherData.main.temp_max)}°
                </span>
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-500 dark:text-blue-400">
                  L: {Math.round(weatherData.main.temp_min)}°
                </span>
              </div>
            </div>
          </div>

          <div className="group relative flex shrink-0 items-center justify-center">
            <span className="transition-300 absolute inset-0 rounded-full bg-blue-500/15 blur-2xl group-hover:scale-110 dark:bg-blue-500/10" />
            <span className="relative z-10 inline-block size-32 md:size-40">
              <Image
                src={getIconUrl(weatherData.weather[0].icon)}
                fill
                sizes="100%"
                alt={weatherData.weather[0].main || "Clear"}
                className="object-contain object-center drop-shadow-md select-none"
                style={{ contentVisibility: "auto" }}
              />
            </span>
          </div>
        </main>

        {/* Detailed Grid Stats */}
        <main className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="transition-300 flex items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white/50 p-3.5 backdrop-blur-md hover:scale-103 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <span
                className={cn(
                  `shrink-0 rounded-xl bg-white p-2.5 shadow-sm dark:bg-zinc-800`,
                  stat.color,
                )}
              >
                <stat.icon className="size-5" />
              </span>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                  {stat.label}
                </p>
                <p className="mt-0.5 truncate text-[15px] font-bold text-zinc-700 dark:text-zinc-100">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </main>
      </section>
    </section>
  );
};
