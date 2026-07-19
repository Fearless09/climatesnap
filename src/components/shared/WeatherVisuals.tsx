"use client";

import React, { useEffect, useState } from "react";

interface WeatherVisualsProps {
  condition: string; // e.g. "Clear", "Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"
}

export const WeatherVisuals: React.FC<WeatherVisualsProps> = ({
  condition,
}) => {
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
     if (
      condition === "Rain" ||
      condition === "Drizzle" ||
      condition === "Thunderstorm"
    ) {
      const drops = Array.from({ length: 40 }, () => Math.random() * 100);
      setDrops(drops);
    } else if (condition === "Snow") {
      const flakes = Array.from({ length: 30 }, () => Math.random() * 100);
      setDrops(flakes);
    } else {
      setDrops([]);
    }
  }, [condition]);

   switch (condition) {
    case "Rain":
    case "Drizzle":
      return (
        <main
          className="transition-300 pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
          aria-label={condition}
        >
          {/* Rainy gradient background */}
          <span className="absolute inset-0 bg-linear-to-b from-slate-200/60 via-slate-300/60 to-blue-400/60 backdrop-blur-md dark:from-slate-700/60 dark:via-slate-800/60 dark:to-blue-900/60" />

          {/* Rain streaks */}
          <div className="absolute inset-0">
            {drops.map((left, i) => {
              const delay = Math.random() * 2;
              const duration = 0.8 + Math.random() * 0.8;
              return (
                <div
                  key={i}
                  className="animate-rain absolute w-0.5 rounded-full bg-linear-to-b from-transparent to-blue-600/40 dark:to-blue-300/40"
                  style={{
                    left: `${left}%`,
                    top: `-20px`,
                    height: `${30 + Math.random() * 40}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                  }}
                />
              );
            })}
          </div>
        </main>
      );

    case "Thunderstorm":
      return (
        <main
          aria-label={condition}
          className="transition-300 pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
        >
          {/* Dark stormy gradient */}
          <span className="absolute inset-0 bg-linear-to-b from-slate-200/80 via-slate-300/80 to-purple-300/70 backdrop-blur-md dark:from-slate-900/80 dark:via-slate-800/80 dark:to-purple-950/70" />

          {/* Heavy rain streaks */}
          <div className="absolute inset-0 opacity-50">
            {drops.map((left, i) => {
              const delay = Math.random() * 1.5;
              const duration = 0.6 + Math.random() * 0.6;
              return (
                <div
                  key={i}
                  className="animate-rain absolute w-0.5 rounded-full bg-linear-to-b from-transparent to-blue-600 dark:to-blue-200"
                  style={{
                    left: `${left}%`,
                    top: `-20px`,
                    height: `${40 + Math.random() * 50}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Lightning flash overlay */}
          <span className="animate-lightning absolute inset-0 z-10 bg-white opacity-0" />
        </main>
      );

    case "Clouds":
      return (
        <main
          aria-label={condition}
          className="transition-300 pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
        >
          {/* Overcast cloudy background */}
          <span className="absolute inset-0 bg-linear-to-b from-zinc-400/30 via-slate-400/40 to-slate-500/40 backdrop-blur-md dark:from-zinc-800/50 dark:via-slate-800/60 dark:to-slate-900/60" />

          {/* Drifting soft clouds */}
          <div className="absolute inset-0 opacity-70 dark:opacity-30">
            <span className="animate-drift-slow absolute top-10 -left-20 h-37.5 w-62.5 rounded-full bg-white blur-2xl dark:bg-slate-300" />
            <span className="animate-drift-fast absolute -right-20 bottom-10 h-45 w-87.5 rounded-full bg-white blur-3xl dark:bg-slate-200" />
          </div>
        </main>
      );

    case "Snow":
      return (
        <main
          aria-label={condition}
          className="transition-300 pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
        >
          {/* Snowy frosty background */}
          <span className="absolute inset-0 bg-linear-to-b from-sky-100 via-indigo-100/60 to-slate-200/60 backdrop-blur-md dark:from-sky-950/40 dark:via-indigo-950/40 dark:to-slate-900/50" />

          {/* Snow flakes */}
          <div className="absolute inset-0 opacity-70">
            {drops.map((left, i) => {
              const delay = Math.random() * 5;
              const duration = 3 + Math.random() * 4;
              const size = 3 + Math.random() * 5;
              return (
                <div
                  key={i}
                  className="animate-snow absolute rounded-full bg-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:bg-white"
                  style={{
                    left: `${left}%`,
                    top: `-10px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                  }}
                />
              );
            })}
          </div>
        </main>
      );

    case "Clear":
    default:
      return (
        <main
          aria-label={condition}
          className="transition-300 pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
        >
          {/* Sunny warm background */}
          <span className="absolute inset-0 bg-linear-to-b from-sky-400/20 via-amber-200/20 to-orange-400/20 backdrop-blur-md dark:from-sky-600/20 dark:via-amber-500/20 dark:to-orange-500/20" />

          {/* Ambient sun rays glow */}
          <span className="animate-pulse-slow absolute top-0 right-0 size-100 translate-x-1/4 -translate-y-1/4 rounded-full bg-radial from-amber-300/30 to-transparent blur-3xl dark:from-amber-500/10" />
        </main>
      );
  }
};
