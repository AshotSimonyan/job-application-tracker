"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { dashboardNavItems } from "@/features/dashboard/content/dashboard-content";
import type { DashboardSidebarProps } from "@/features/dashboard/types";
import { cn } from "@/lib/utils/cn";

export const DashboardSidebar = ({ data }: DashboardSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="border-line bg-panel text-panel-foreground rounded-[2rem] border p-6 shadow-[0_36px_100px_-62px_rgba(8,22,47,0.92)] lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-8">
      <div>
        <p className="text-panel-foreground/45 text-xs font-semibold tracking-[0.28em] uppercase">
          Overview
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
          Job search workspace
        </h2>
      </div>

      <nav className="mt-10 grid gap-2">
        {dashboardNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm transition-colors",
                isActive
                  ? "text-panel-foreground border border-white/10 bg-white/10 font-semibold"
                  : "text-panel-foreground/70 hover:text-panel-foreground hover:bg-white/8",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-panel-foreground/45 text-xs font-semibold tracking-[0.24em] uppercase">
          Workspace snapshot
        </p>
        <p className="text-panel-foreground/78 mt-3 text-sm leading-7">
          {data.applicationCount} tracked{" "}
          {data.applicationCount === 1 ? "application" : "applications"} and{" "}
          {data.resumeCount} saved {data.resumeCount === 1 ? "resume" : "resumes"}.
        </p>
        <p className="text-panel-foreground/55 mt-3 text-sm">
          {data.memberSinceLabel}
        </p>
      </div>

      <div className="mt-6">
        <SignOutButton />
      </div>
    </aside>
  );
};
