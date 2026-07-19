"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWeather } from "@/context/WeatherContext";
import { Trash2, Heart } from "lucide-react";
import Image from "next/image";
import { cn, getIconUrl } from "@/utils/utils";
import { fetcher } from "@/utils/fetcter";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";

export const FavoritesList: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { favorites } = useWeather();

  useGSAP(
    () => {
      if (!listRef.current) return;

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    },
    { dependencies: [favorites], scope: listRef },
  );

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <Heart className="mb-3 size-8 text-zinc-400 dark:text-zinc-500" />
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          No Saved Locations
        </p>
        <p className="mt-1 max-w-50 text-xs text-pretty text-zinc-400">
          Tap the heart on any location to save it here for quick access.
        </p>
      </div>
    );
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
          Favorite Locations ({favorites.length})
        </h3>
      </header>

      <main
        ref={listRef}
        className="custom-scrollbar grid max-h-95 grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 md:grid-cols-1"
      >
        {favorites.map((fav, idx) => (
          <FavoriteItem key={idx} item={fav} />
        ))}
      </main>
    </section>
  );
};

const FavoriteItem = ({ item }: { item: GeocodingResult }) => {
  const { locationData, weatherDispacter } = useWeather();

  const [favWeather, setFavWeather] = useState<OpenWeatherMap | null>(null);
  const [favLoading, setFavLoading] = useState<boolean>(false);

  const isActive = useMemo(() => {
    if (!locationData) return false;

    return (
      item.formatted.toLowerCase() === locationData.formatted.toLowerCase()
    );
  }, [locationData]);

  const onSelect = useCallback(async () => {
    if (!favWeather) return;

    weatherDispacter({
      type: "set-weather",
      payload: favWeather,
    });
    weatherDispacter({
      type: "set-location",
      payload: item,
    });
    weatherDispacter({
      type: "set-loading",
      payload: { forecast: true },
    });

    try {
      const { lat, lng } = item.geometry;
      const data = await fetcher<WeatherForecast>("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });

      weatherDispacter({
        type: "set-forecast",
        payload: data,
      });
    } catch (error) {
    } finally {
      weatherDispacter({
        type: "set-loading",
        payload: { forecast: false },
      });
    }
  }, [favWeather]);

  useEffect(() => {
    async function init() {
      setFavLoading(true);
      try {
        const { lat, lng } = item.geometry;
        const data = await fetcher<OpenWeatherMap>("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lng }),
        });

        setFavWeather(data);
      } catch (error) {
        setFavWeather(null);
      } finally {
        setFavLoading(false);
      }
    }

    init();
  }, []);

  return (
    <button
      className={cn(
        `group transition-300 flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:bg-zinc-900`,
        {
          "border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/50": isActive,
          "hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700/50":
            !isActive,
        },
      )}
    >
      <div
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center text-left"
      >
        <div className="mr-2 min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-zinc-800 capitalize dark:text-zinc-100">
            {item.formatted.split(",")[0]}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-zinc-400 dark:text-zinc-500">
            {item.components.country}
          </p>
        </div>

        {favLoading ? (
          <div className="h-6 w-12 shrink-0 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        ) : favWeather ? (
          <div className="flex shrink-0 items-center gap-2">
            <Image
              src={getIconUrl(favWeather.weather[0].icon)}
              alt={favWeather.weather[0].description}
              width={40}
              height={40}
              className="size-10 object-contain drop-shadow-sm select-none"
            />
            <div className="text-right">
              <span className="text-lg font-black text-zinc-800 dark:text-zinc-100">
                {Math.round(favWeather.main.temp)}°
              </span>
              <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                {favWeather.weather[0].main}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <span
        onClick={(e) => {
          e.stopPropagation();
          weatherDispacter({ type: "toggle-favorite", payload: item });
        }}
        className="transition-300 ml-3 cursor-pointer rounded-xl bg-red-500/5 p-2 text-red-500/60 hover:bg-red-500/10 hover:text-red-500 dark:bg-red-500/10 dark:text-red-400/60 dark:hover:bg-red-500/20 dark:hover:text-red-400"
        title="Remove from favorites"
      >
        <Trash2 className="size-4.5" />
      </span>
    </button>
  );
};
