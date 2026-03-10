import { authMilestones } from "@/features/auth/content/auth-content";
import type { AuthShellProps } from "@/features/auth/types";
import Link from "next/link";

export const AuthShell = ({
  title,
  description,
  eyebrow,
  children,
  variant = "default",
}: AuthShellProps) => {
  return (
    <div
      className={`grid w-full items-center gap-6 px-6 py-6 lg:px-10 lg:py-8 ${variant === "compact" ? "lg:grid-cols-[0.72fr_1.08fr]" : "lg:grid-cols-[0.95fr_1.05fr]"}`}
    >
      <section className="border-line bg-panel text-panel-foreground rounded-[1.5rem] border p-6 shadow-[0_40px_110px_-60px_rgba(8,22,47,0.9)] sm:p-8">
        <p className="text-panel-foreground/55 text-xs font-semibold tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-lg text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
          {title}
        </h1>
        <p className="text-panel-foreground/72 mt-3 max-w-xl text-sm leading-7 sm:text-base">
          {description}
        </p>

        {variant === "default" ? (
          <div className="mt-6 grid gap-2.5">
            {authMilestones.map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-panel-foreground/45 text-xs font-semibold tracking-[0.24em] uppercase">
                  0{index + 1}
                </p>
                <p className="text-panel-foreground mt-2 text-base font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_28px_90px_-64px_rgba(8,22,47,0.28)] sm:p-6">
        <div className="flex justify-end">
          <Link
            href="/"
            className="text-muted hover:text-brand inline-flex items-center text-sm font-semibold transition-colors"
          >
            Back to home
          </Link>
        </div>

        <div className="mt-4 space-y-4">{children}</div>
      </section>
    </div>
  );
};
