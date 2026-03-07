import type { SetupNoticeProps } from "@/components/ui/setup-notice.types";

export const SetupNotice = ({
  title,
  description,
  steps,
}: SetupNoticeProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
          {title}
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          {description}
        </p>
      </div>

      <div className="border-line bg-surface-alt rounded-[1.5rem] border p-5">
        <p className="text-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          Local setup
        </p>
        <ol className="text-muted mt-4 space-y-3 text-sm leading-7">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="text-brand font-semibold">0{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
