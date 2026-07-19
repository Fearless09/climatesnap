"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { gsap } from "@/utils/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/utils";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || !buttonRef.current) return;

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: "power2.out" },
      );

      const icon = buttonRef.current.querySelector(".theme-icon");
      if (!icon) return;
      gsap.fromTo(
        icon,
        { rotate: -180, scale: 0.3, opacity: 0 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.5)",
        },
      );
    },
    { dependencies: [theme, mounted], scope: buttonRef },
  );

  if (!mounted) {
    return (
      <div className="size-10.5 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "transition-300 group relative flex size-10.5 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md backdrop-blur-xl select-none hover:bg-slate-50 hover:shadow-lg",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:hover:bg-zinc-800",
      )}
      title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
      aria-label="Toggle theme"
    >
      {/* Light glow particle effects inside the button */}
      <span className="transition-300 pointer-events-none absolute inset-0 bg-linear-to-tr from-blue-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 dark:from-indigo-500/10 dark:to-purple-500/10" />

      <div className="theme-icon flex items-center justify-center">
        {isDark ? (
          <Moon className="h-5 w-5 fill-indigo-400/20 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]" />
        ) : (
          <Sun className="h-5 w-5 fill-amber-500/20 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitch;
