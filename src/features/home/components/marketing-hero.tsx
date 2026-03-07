import { ButtonLink } from "@/components/ui/button-link";
import { homeHighlights } from "@/features/home/content/home-content";

export const MarketingHero = () => {
  return (
    <section className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
      <div className="space-y-8">
        <div className="border-brand/15 bg-brand/8 text-brand inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.24em] uppercase">
          Stay on top of your search
        </div>

        <div className="space-y-6">
          <h1 className="text-foreground max-w-4xl text-5xl font-semibold tracking-[-0.08em] sm:text-6xl lg:text-7xl">
            Track every application without losing the bigger picture.
          </h1>
          <p className="text-muted max-w-2xl text-lg leading-8 sm:text-xl">
            Organize roles, interviews, contacts, and follow-ups in one clean
            workspace designed to make your search feel clear and manageable.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/dashboard">Open dashboard</ButtonLink>
          <ButtonLink href="/auth/sign-in" variant="secondary">
            Sign in
          </ButtonLink>
        </div>
      </div>

      <div className="border-line bg-surface overflow-hidden rounded-[2rem] border shadow-[0_40px_110px_-60px_rgba(8,22,47,0.45)]">
        <div className="border-line bg-panel text-panel-foreground border-b px-6 py-5">
          <p className="text-panel-foreground/55 text-xs font-semibold tracking-[0.26em] uppercase">
            Weekly snapshot
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
            Your search at a glance
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3 lg:grid-cols-1">
          {homeHighlights.map((item) => (
            <div
              key={item.label}
              className="border-line bg-surface-alt rounded-[1.5rem] border p-5"
            >
              <p className="text-muted text-sm font-medium">{item.label}</p>
              <p className="text-foreground mt-6 text-4xl font-semibold tracking-[-0.06em]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
