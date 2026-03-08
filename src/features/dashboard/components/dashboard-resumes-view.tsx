import type { DashboardResumesViewProps } from "@/features/dashboard/types";

export const DashboardResumesView = ({
  resumes,
}: DashboardResumesViewProps) => {
  return (
    <section className="border-line bg-surface rounded-[2rem] border p-6 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
            Resumes
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Resume library
          </h1>
        </div>
        <p className="text-muted text-sm">
          Resume versions currently available for applications
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <article
              key={resume.id}
              className="border-line bg-surface-alt flex items-center justify-between rounded-[1.5rem] border p-5"
            >
              <div>
                <p className="text-foreground text-lg font-semibold">
                  {resume.name}
                </p>
                <p className="text-muted mt-2 text-sm">
                  Added {resume.createdAtLabel}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="border-line bg-surface-alt rounded-[1.5rem] border p-6">
            <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
              No resumes yet
            </h2>
            <p className="text-muted mt-3 text-sm leading-7">
              Resume management will appear here once the upload flow is added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
