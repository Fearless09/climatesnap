"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { useWeather } from "@/context/WeatherContext";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { cn, getIconUrl } from "@/utils/utils";
import Image from "next/image";

export const ForecastTimeline: React.FC = () => {
  const { forecast, loading } = useWeather();
  const listRef = useRef<HTMLDivElement>(null);

  // Stagger entry animation for timeline cards on load
  useGSAP(
    () => {
      if (!listRef.current) return;

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    },
    { dependencies: [forecast], scope: listRef },
  );

  return (
    <section className="mt-4 flex w-full flex-col gap-2">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
          Forecast
        </h3>

        <span className="rounded-full bg-zinc-200/40 px-2.25 py-0.75 text-[11px] font-bold text-zinc-400 dark:bg-zinc-800/40 dark:text-zinc-600">
          5 Days - 3 Hours Interval
        </span>
      </header>

      {loading.forecast ? (
        <main className="custom-scrollbar flex w-full gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-36 w-28 shrink-0 animate-pulse rounded-2xl border border-zinc-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900"
            />
          ))}
        </main>
      ) : forecast ? (
        <main
          ref={listRef}
          className={cn(
            "custom-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pt-1 pb-3",
            "mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
          )}
        >
          {forecast?.list.map((item, idx) => (
            <ForecastItem key={idx} item={item} />
          ))}
        </main>
      ) : (
        ""
      )}
    </section>
  );
};

const ForecastItem = ({ item }: { item: ForecastEntry }) => {
  const { weatherDispacter, weatherData } = useWeather();

  const formatDate = useCallback(() => {
    const rawDate = new Date(item.dt_txt);
    const date = rawDate.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
    const time = rawDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    return { date, time };
  }, [item]);

  const currentItem = useMemo(() => {
    if (!weatherData) return false;
    if (weatherData.dt === item.dt) return true;
    return false;
  }, [weatherData]);

  const onSelect = useCallback(() => {
    if (!weatherData) return;

    weatherDispacter({
      type: "set-weather",
      payload: {
        ...weatherData,
        dt: item.dt,
        main: item.main,
        weather: item.weather,
        clouds: item.clouds,
        wind: item.wind,
        visibility: item.visibility,
        rain: item.rain,
        snow: item.snow,
      },
    });
  }, [weatherData]);

  return (
    <button
      onClick={onSelect}
      className={cn(
        `transition-300 group flex w-30 shrink-0 cursor-pointer snap-start flex-col items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 backdrop-blur-xl dark:bg-zinc-900`,
        {
          "scale-103! border-blue-500/80 bg-blue-500/10 shadow-lg ring-1 shadow-blue-500/5 ring-blue-500/30 dark:bg-blue-500/15":
            currentItem,
          "dark:border-zinc-800": !currentItem,
        },
      )}
    >
      {/* Day Name */}
      <div className="flex flex-col">
        <span
          className={cn(
            `text-[11px] font-bold tracking-wider text-zinc-400 uppercase dark:text-zinc-500`,
            {
              "text-blue-500 dark:text-blue-400": currentItem,
            },
          )}
        >
          {formatDate().date}
        </span>
        <span
          className={cn(
            `text-[10px] font-black tracking-wider text-zinc-600 uppercase dark:text-zinc-400`,
            {
              "text-blue-500 dark:text-blue-400": currentItem,
            },
          )}
        >
          {formatDate().time}
        </span>
      </div>

      {/* Weather Icon */}
      <div className="relative my-2.5 flex items-center justify-center">
        <Image
          src={getIconUrl(item.weather[0]?.icon || "01d")}
          alt={item.weather[0]?.main || "Clear"}
          width={48}
          height={48}
          className={cn(
            "transition-300 size-12 object-contain drop-shadow-sm select-none group-hover:scale-150",
            { "scale-150": currentItem },
          )}
          style={{ contentVisibility: "auto" }}
        />
      </div>

      {/* Temperatures */}
      <div className="flex flex-col items-center">
        <span className="text-lg leading-none font-black text-zinc-800 dark:text-zinc-100">
          {Math.round(item.main.temp)}°
        </span>
        <span className="mt-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">
          {Math.round(item.main.temp_max)}° / {Math.round(item.main.temp_min)}°
        </span>
      </div>
    </button>
  );
};
