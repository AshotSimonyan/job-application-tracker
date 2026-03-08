import Link from "next/link";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import type { SiteHeaderProps } from "@/components/layout/site-header.types";

export const SiteHeader = ({ user }: SiteHeaderProps) => {
  const navigationItems = user
    ? siteConfig.navigation.filter((item) => item.href !== "/auth/sign-in")
    : siteConfig.navigation;

  return (
    <header className="border-line/80 bg-surface/80 sticky top-0 z-30 border-b backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-semibold"
        >
          <span className="bg-panel text-panel-foreground flex h-10 w-10 items-center justify-center rounded-2xl shadow-[0_16px_32px_-20px_rgba(8,22,47,0.9)]">
            JT
          </span>
          <span className="text-foreground hidden text-sm tracking-[-0.02em] sm:inline-flex">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <Link
              href="/dashboard"
              aria-label={`${user.displayName} account`}
              title={user.email ?? user.displayName}
              className="border-line bg-surface-alt text-foreground hover:border-brand/30 hover:text-brand inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors"
            >
              {user.initial}
            </Link>
          ) : null}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
