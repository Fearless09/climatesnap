"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWeather } from "@/context/WeatherContext";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { fetcher } from "@/utils/fetcter";
import { useClose } from "@/hooks/useClose";

export const SearchLocation: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedQuery = useDebounce(query, 400);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useClose(() => setShowDropdown(false));

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length < 3) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetcher<GeocodingResult[]>("/api/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: debouncedQuery }),
        });

        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch (err) {
        console.error("Geocoding fetch error:", err);
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // GSAP animation for Suggestions Dropdown sliding/fade transition
  useGSAP(
    () => {
      if (!showDropdown || !dropdownRef.current) return;

      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.2)" },
      );
    },
    { dependencies: [showDropdown], scope: searchContainerRef },
  );

  const clearInput = () => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <section ref={searchContainerRef} className="relative z-50 w-full max-w-lg">
      <main className="group relative flex w-full items-center">
        <span className="transition-300 absolute left-3.75 z-1 text-zinc-400 group-focus-within:text-blue-500 [&_svg]:size-4.5">
          {loading ? <Loader2 className="animate-spin stroke-2" /> : <Search />}
        </span>

        <input
          type="text"
          id="search-location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for cities or regions..."
          className="transition-300 w-full rounded-2xl border border-zinc-200 bg-white px-10 py-3.25 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-100/10 backdrop-blur-xl placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none dark:border-zinc-800/50 dark:bg-zinc-900/70 dark:text-zinc-100 dark:shadow-none"
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
        />
        {query && (
          <button
            onClick={clearInput}
            className="transition-300 absolute right-3.5 cursor-pointer rounded-full p-1.25 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="size-4" />
          </button>
        )}
      </main>

      {showDropdown && suggestions.length > 0 && (
        <main
          ref={dropdownRef}
          className="custom-scrollbar absolute inset-x-0 z-50 mt-3 max-h-75 origin-top divide-y divide-zinc-100 overflow-hidden overflow-y-auto rounded-2xl border border-zinc-200 bg-white/90 shadow-2xl backdrop-blur-2xl dark:divide-zinc-900 dark:border-zinc-800 dark:bg-zinc-950"
        >
          {suggestions.map((loc, idx) => (
            <Item key={idx} item={loc} onClose={clearInput} />
          ))}
        </main>
      )}
    </section>
  );
};

const Item = ({
  item,
  onClose,
}: {
  item: GeocodingResult;
  onClose: () => void;
}) => {
  const { weatherDispacter } = useWeather();

  const onSelect = async () => {
    weatherDispacter({ type: "set-location", payload: item });
    weatherDispacter({
      type: "set-loading",
      payload: { weather: true, forecast: true },
    });
    onClose();

    try {
      const { lat, lng } = item.geometry;

      const [weather, forecast] = await Promise.all([
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

      weatherDispacter({ type: "set-weather", payload: weather });
      weatherDispacter({ type: "set-forecast", payload: forecast });
    } catch (error) {
    } finally {
      weatherDispacter({
        type: "set-loading",
        payload: { weather: false, forecast: false },
      });
    }
  };
  return (
    <button
      onClick={onSelect}
      className="group transition-300 flex w-full cursor-pointer items-center gap-3.5 px-5 py-4 text-left text-zinc-700 hover:bg-blue-500/10 dark:text-zinc-300"
    >
      <MapPin className="transition-300 size-4.5 shrink-0 text-zinc-400 group-hover:text-blue-500" />

      <div className="min-w-0 flex-1">
        <p className="transition-300 truncate text-sm font-semibold text-zinc-800 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
          {item.formatted.split(",")[0]}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-zinc-400 dark:text-zinc-500">
          {item.formatted}
        </p>
      </div>
    </button>
  );
};
