import type { DashboardPipelineViewProps } from "@/features/dashboard/types";

export const DashboardPipelineView = ({
  statusSummary,
}: DashboardPipelineViewProps) => {
  return (
    <section className="border-line bg-surface rounded-[2rem] border p-6 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-8">
      <div>
        <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
          Pipeline
        </p>
        <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
          Status breakdown
        </h1>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-7 sm:text-base">
          See how your applications are distributed across the current hiring
          pipeline.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statusSummary.map((item) => (
          <article
            key={item.label}
            className="border-line bg-surface-alt rounded-[1.5rem] border p-5"
          >
            <p className="text-muted text-sm font-medium">{item.label}</p>
            <p className="text-foreground mt-5 text-4xl font-semibold tracking-[-0.05em]">
              {item.count}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
