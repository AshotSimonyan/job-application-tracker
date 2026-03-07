import Link from "next/link";

import { dashboardNavItems } from "@/features/dashboard/content/dashboard-content";

export const DashboardSidebar = () => {
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
        {dashboardNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={
              item.active
                ? "text-panel-foreground rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold"
                : "text-panel-foreground/70 hover:text-panel-foreground rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-white/8"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-panel-foreground/45 text-xs font-semibold tracking-[0.24em] uppercase">
          This week
        </p>
        <p className="text-panel-foreground/78 mt-3 text-sm leading-7">
          Follow up with hiring teams, prepare for scheduled interviews, and
          keep your materials ready for the next role.
        </p>
      </div>
    </aside>
  );
};
