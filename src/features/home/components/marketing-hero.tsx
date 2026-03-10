import { ButtonLink } from "@/components/ui/button-link";
import { ApplicationStatusBadge } from "@/features/dashboard/components/application-status-badge";
import {
  homeHighlights,
  homeRecentRoles,
} from "@/features/home/content/home-content";
import type { MarketingHeroProps } from "@/features/home/types";

export const MarketingHero = ({ isSignedIn }: MarketingHeroProps) => {
  return (
    <section className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
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
          <ButtonLink href={isSignedIn ? "/dashboard" : "/auth/sign-up"}>
            {isSignedIn ? "Open dashboard" : "Get started"}
          </ButtonLink>
          {!isSignedIn ? (
            <ButtonLink href="/auth/sign-in" variant="secondary">
              Sign in
            </ButtonLink>
          ) : null}
        </div>
      </div>

      <div className="border-line bg-surface overflow-hidden rounded-[1.5rem] border shadow-[0_28px_72px_-60px_rgba(8,22,47,0.28)]">
        <div className="border-line bg-surface-alt border-b px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-muted text-[11px] font-semibold tracking-[0.24em] uppercase">
                Live preview
              </p>
              <p className="text-foreground mt-2 text-xl font-semibold tracking-[-0.03em]">
                Search workspace
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5 lg:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {homeHighlights.map((item) => (
              <div
                key={item.label}
                className="border-line bg-surface-alt rounded-xl border p-4"
              >
                <p className="text-muted text-sm font-medium">{item.label}</p>
                <p className="text-foreground mt-4 text-3xl font-semibold tracking-[-0.05em]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-line bg-surface-alt rounded-xl border p-4">
            <p className="text-muted text-xs font-semibold tracking-[0.22em] uppercase">
              Latest roles
            </p>

            <div className="mt-4 space-y-2">
              {homeRecentRoles.map((role) => (
                <div
                  key={`${role.company}-${role.title}`}
                  className="border-line bg-surface rounded-xl border px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-muted text-sm">{role.company}</p>
                      <p className="text-foreground mt-1 text-base font-semibold">
                        {role.title}
                      </p>
                    </div>
                    <ApplicationStatusBadge status={role.status} />
                  </div>
                  <p className="text-muted mt-3 text-sm">{role.updatedLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
