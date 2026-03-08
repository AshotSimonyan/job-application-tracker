import { ApplicationsTable } from "@/features/dashboard/components/applications-table";

import type { DashboardApplicationsViewProps } from "@/features/dashboard/types";

export const DashboardApplicationsView = ({
  applications,
}: DashboardApplicationsViewProps) => {
  return (
    <section className="border-line bg-surface rounded-[2rem] border p-6 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
            Applications
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Application tracker
          </h1>
        </div>
        <p className="text-muted text-sm">
          Full list of saved and submitted roles
        </p>
      </div>

      <div className="mt-6">
        {applications.length > 0 ? (
          <ApplicationsTable applications={applications} />
        ) : (
          <div className="border-line bg-surface-alt rounded-[1.5rem] border p-6">
            <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
              No applications yet
            </h2>
            <p className="text-muted mt-3 text-sm leading-7">
              Add your first role from the Overview page to populate this table.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
