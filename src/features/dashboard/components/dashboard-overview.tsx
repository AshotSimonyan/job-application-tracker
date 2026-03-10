import Link from "next/link";

import { ApplicationStatusBadge } from "@/features/dashboard/components/application-status-badge";
import type { DashboardOverviewProps } from "@/features/dashboard/types";

export const DashboardOverview = ({ data }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <section className="border-line bg-surface overflow-hidden rounded-[1.5rem] border shadow-[0_28px_90px_-64px_rgba(8,22,47,0.3)]">
        <div className="border-line bg-surface-alt border-b p-5 sm:p-6">
          <p className="text-muted text-xs font-semibold tracking-[0.28em] uppercase">
            Dashboard
          </p>
          <h1 className="text-foreground mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-[2rem]">
            Keep your applications moving forward.
          </h1>
          <p className="text-muted mt-2 max-w-3xl text-sm leading-7 sm:text-base">
            Start a new application, review your current totals, and keep the
            main pipeline visible from one place.
          </p>
        </div>

        <div className="grid gap-3 p-5 sm:p-6 xl:grid-cols-3">
          {data.metrics.map((metric) => (
            <article
              key={metric.label}
              className="border-line bg-surface-alt rounded-xl border p-4"
            >
              <p className="text-muted text-sm font-medium">{metric.label}</p>
              <p className="text-foreground mt-3 text-[1.7rem] font-semibold tracking-[-0.05em]">
                {metric.value}
              </p>
              <p className="text-muted mt-2 text-sm">{metric.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
              Add application
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Start a new entry
            </h2>
            <p className="text-muted mt-2 max-w-3xl text-sm leading-7">
              Create a new application from the dedicated form and keep your
              tracker current.
            </p>
          </div>

          <Link
            href="/dashboard/applications/new"
            className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Add application
          </Link>
        </div>
      </section>

      <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
              Recent activity
            </p>
            <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Latest applications
            </h2>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {data.recentApplications.length > 0 ? (
            data.recentApplications.map((application) => (
              <article
                key={application.id}
                className="border-line bg-surface-alt grid gap-3 rounded-xl border p-4 md:grid-cols-[1.2fr_auto_auto] md:items-center"
              >
                <div>
                  <p className="text-muted text-sm font-medium">
                    {application.company}
                  </p>
                  <p className="text-foreground mt-1 text-lg font-semibold tracking-[-0.03em]">
                    {application.title}
                  </p>
                </div>
                <div>
                  <ApplicationStatusBadge status={application.status} />
                </div>
                <p className="text-muted text-sm md:text-right">
                  {application.updatedLabel}
                </p>
              </article>
            ))
          ) : (
            <article className="border-line bg-surface-alt rounded-xl border p-6">
              <h3 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
                No applications yet
              </h3>
              <p className="text-muted mt-3 text-sm leading-7">
                Start with the new application page to create your first tracked
                application.
              </p>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};
