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
    <aside className="border-line bg-surface-alt text-foreground rounded-[1.5rem] border p-5 shadow-[0_24px_56px_-52px_rgba(8,22,47,0.26)] lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-5">
      <div>
        <p className="text-muted text-xs font-semibold tracking-[0.28em] uppercase">
          Overview
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
          Job search workspace
        </h2>
      </div>

      <nav className="mt-6 grid gap-1.5">
        {dashboardNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-xl px-4 py-2 text-sm transition-colors",
                isActive
                  ? "border-brand/20 bg-brand/8 text-foreground border font-semibold"
                  : "text-muted hover:text-foreground hover:bg-surface",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-line mt-8 rounded-xl border bg-surface p-4">
        <p className="text-muted text-xs font-semibold tracking-[0.24em] uppercase">
          Workspace snapshot
        </p>
        <p className="text-foreground mt-3 text-sm leading-7">
          {data.applicationCount} tracked{" "}
          {data.applicationCount === 1 ? "application" : "applications"} and{" "}
          {data.resumeCount} saved {data.resumeCount === 1 ? "resume" : "resumes"}.
        </p>
        <p className="text-muted mt-3 text-sm">
          {data.memberSinceLabel}
        </p>
      </div>

      <div className="mt-5">
        <SignOutButton />
      </div>
    </aside>
  );
};
