import { ButtonLink } from "@/components/ui/button-link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SupabaseSetupState } from "@/features/auth/components/supabase-setup-state";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const AuthIndexPage = () => {
  return (
    <AuthShell
      eyebrow="Account access"
      title="Pick up your search right where you left it."
      description="Sign in to review your progress or create an account to start tracking applications, interviews, and follow-ups in one place."
    >
      {isSupabaseConfigured() ? (
        <>
          <div className="space-y-4">
            <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
              Access your workspace
            </h2>
            <p className="text-muted max-w-2xl text-sm leading-7 sm:text-base">
              Use the sign-in and account creation screens as the entry point
              for your personal job search dashboard.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ButtonLink href="/auth/sign-in">Sign in</ButtonLink>
            <ButtonLink href="/auth/sign-up" variant="secondary">
              Create account
            </ButtonLink>
          </div>
        </>
      ) : (
        <SupabaseSetupState />
      )}
    </AuthShell>
  );
};

export default AuthIndexPage;
