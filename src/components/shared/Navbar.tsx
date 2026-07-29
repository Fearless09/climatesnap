"use client";

import { CloudSun } from "lucide-react";
import { SearchLocation } from "./SearchLocation";
import ThemeSwitch from "../ui/ThemeSwitch";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsap";
import Link from "next/link";
import RefreshBtn from "../ui/RefreshBtn";

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { scope: ref },
  );

  return (
    <>
      <header
        ref={ref}
        className="sticky top-0 z-50 border-b border-zinc-100 bg-white/30 backdrop-blur-xl dark:border-zinc-900 dark:bg-black/30"
      >
        <section className="wrapper flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link
            href={"/"}
            className="group flex items-center gap-3 select-none"
          >
            <span className="transition-300 relative flex items-center justify-center rounded-2xl bg-blue-500 p-2.5 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105">
              <CloudSun className="size-6" />
            </span>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-700 dark:text-zinc-50">
                ClimateSnap
              </h1>
              <p className="mt-0.5 text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:text-zinc-500">
                Precision Weather
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <SearchLocation />
          </div>
          <div className="flex items-center gap-3">
            <RefreshBtn />
            <ThemeSwitch />
          </div>
        </section>
      </header>

      <div className="wrapper mt-2 md:hidden">
        <SearchLocation />
      </div>
    </>
  );
};

export default Navbar;
