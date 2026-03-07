import { ButtonLink } from "@/components/ui/button-link";
import { authMilestones } from "@/features/auth/content/auth-content";

type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: React.ReactNode;
};

export const AuthShell = ({
  title,
  description,
  eyebrow,
  children,
}: AuthShellProps) => {
  return (
    <div className="grid min-h-[calc(100vh-81px)] gap-10 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-16">
      <section className="border-line bg-panel text-panel-foreground rounded-[2rem] border p-8 shadow-[0_40px_110px_-60px_rgba(8,22,47,0.9)] sm:p-10">
        <p className="text-panel-foreground/55 text-xs font-semibold tracking-[0.28em] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-lg text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
          {title}
        </h1>
        <p className="text-panel-foreground/72 mt-4 max-w-xl text-base leading-7 sm:text-lg">
          {description}
        </p>

        <div className="mt-10 grid gap-3">
          {authMilestones.map((item, index) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
            >
              <p className="text-panel-foreground/45 text-xs font-semibold tracking-[0.24em] uppercase">
                0{index + 1}
              </p>
              <p className="text-panel-foreground mt-3 text-lg font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-line bg-surface flex flex-col justify-between gap-6 rounded-[2rem] border p-6 shadow-[0_28px_90px_-64px_rgba(8,22,47,0.28)] sm:p-8">
        <div className="space-y-4">{children}</div>

        <div className="border-line flex flex-col gap-3 border-t pt-6 sm:flex-row">
          <ButtonLink href="/dashboard" variant="secondary">
            View dashboard
          </ButtonLink>
          <ButtonLink href="/" variant="ghost" className="px-0 py-3">
            Back to home
          </ButtonLink>
        </div>
      </section>
    </div>
  );
};
