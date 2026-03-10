"use client";

import { MoonIcon } from "@/components/icons/moon-icon";
import { SunIcon } from "@/components/icons/sun-icon";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils/cn";

export const ThemeToggle = () => {
  const { theme, toggleTheme, isMounted } = useTheme();
  const isDark = isMounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="group border-line bg-surface-alt hover:bg-surface text-foreground inline-flex h-10 w-11 items-center justify-center rounded-xl border shadow-[0_16px_32px_-24px_rgba(8,22,47,0.45)] transition-colors"
    >
      <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
        <span
          className={cn(
            "absolute transition-all duration-300 ease-out",
            isDark
              ? "-translate-y-2 scale-75 opacity-0"
              : "translate-y-0 scale-100 opacity-100",
          )}
        >
          <SunIcon className="h-4 w-4" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-300 ease-out",
            isDark
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-2 scale-75 opacity-0",
          )}
        >
          <MoonIcon className="h-4 w-4" />
        </span>
      </span>
    </button>
  );
};
