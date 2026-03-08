import { createJobApplicationAction } from "@/features/dashboard/actions";
import { CreateApplicationForm } from "@/features/dashboard/components/create-application-form";
import type { DashboardOverviewProps } from "@/features/dashboard/types";

export const DashboardOverview = ({ data }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <section className="border-line bg-surface overflow-hidden rounded-[2rem] border shadow-[0_28px_90px_-64px_rgba(8,22,47,0.3)]">
        <div className="border-line from-panel text-panel-foreground border-b bg-gradient-to-r via-[#0d2248] to-[#16346d] p-6 sm:p-8">
          <p className="text-panel-foreground/55 text-xs font-semibold tracking-[0.28em] uppercase">
            Dashboard
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
            Keep your applications moving forward.
          </h1>
          <p className="text-panel-foreground/72 mt-4 max-w-3xl text-base leading-7 sm:text-lg">
            Start a new application, review your current totals, and keep the
            main pipeline visible from one place.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:p-8 xl:grid-cols-3">
          {data.metrics.map((metric) => (
            <article
              key={metric.label}
              className="border-line bg-surface-alt rounded-[1.5rem] border p-5"
            >
              <p className="text-muted text-sm font-medium">{metric.label}</p>
              <p className="text-foreground mt-6 text-4xl font-semibold tracking-[-0.06em]">
                {metric.value}
              </p>
              <p className="text-muted mt-2 text-sm">{metric.note}</p>
            </article>
          ))}
        </div>
      </section>

      <CreateApplicationForm
        action={createJobApplicationAction}
        resumes={data.resumes}
      />

      <section className="border-line bg-surface rounded-[2rem] border p-6 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
              Recent activity
            </p>
            <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Latest applications
            </h2>
          </div>
          <p className="text-muted text-sm">
            Three most recent updates from your tracker
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {data.recentApplications.length > 0 ? (
            data.recentApplications.map((application) => (
              <article
                key={application.id}
                className="border-line bg-surface-alt grid gap-4 rounded-[1.5rem] border p-5 md:grid-cols-[1.2fr_1fr_auto] md:items-center"
              >
                <div>
                  <p className="text-muted text-sm font-medium">
                    {application.company}
                  </p>
                  <p className="text-foreground mt-1 text-xl font-semibold tracking-[-0.03em]">
                    {application.title}
                  </p>
                </div>
                <div>
                  <p className="bg-brand/10 text-brand inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase">
                    {application.statusLabel}
                  </p>
                </div>
                <p className="text-muted text-sm md:text-right">
                  {application.updatedLabel}
                </p>
              </article>
            ))
          ) : (
            <article className="border-line bg-surface-alt rounded-[1.5rem] border p-6">
              <h3 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
                No applications yet
              </h3>
              <p className="text-muted mt-3 text-sm leading-7">
                Use the form above to create your first tracked application.
              </p>
            </article>
          )}
        </div>
      </section>
    </div>
  );
};
