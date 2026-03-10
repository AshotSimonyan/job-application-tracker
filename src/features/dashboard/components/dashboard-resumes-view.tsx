import { ResumeDeleteButton } from "@/features/dashboard/components/resume-delete-button";
import { ResumeUploadForm } from "@/features/dashboard/components/resume-upload-form";
import type { DashboardResumesViewProps } from "@/features/dashboard/types";

export const DashboardResumesView = ({
  resumes,
  action,
}: DashboardResumesViewProps) => {
  return (
    <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
            Resumes
          </p>
          <h1 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
            Resume library
          </h1>
        </div>
        <p className="text-muted text-sm">Files ready to attach to applications</p>
      </div>

      <div className="mt-5 grid gap-3">
        <ResumeUploadForm action={action} />

        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <article
              key={resume.id}
              className="border-line bg-surface-alt flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-foreground text-lg font-semibold">
                  {resume.name}
                </p>
                <p className="text-muted mt-2 text-sm">
                  Added {resume.createdAtLabel}
                </p>
                <p className="text-muted mt-2 text-xs break-all">
                  {resume.filePath}
                </p>
              </div>
              <ResumeDeleteButton
                resumeId={resume.id}
                resumeName={resume.name}
              />
            </article>
          ))
        ) : (
          <div className="border-line bg-surface-alt rounded-xl border p-6">
            <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
              No resumes yet
            </h2>
            <p className="text-muted mt-3 text-sm leading-7">
              Upload your first resume to make it available on new
              applications.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
