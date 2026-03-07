import { redirect } from "next/navigation";

import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { SupabaseSetupState } from "@/features/auth/components/supabase-setup-state";
import { signInAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage, getSafeRedirectPath } from "@/features/auth/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const SignInPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);
  const next = getSafeRedirectPath(params.next);

  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Return to your application pipeline."
      description="Check progress across active roles, review upcoming conversations, and keep the next move clear."
    >
      {isSupabaseConfigured() ? (
        <AuthForm
          mode="sign-in"
          action={signInAction}
          message={message}
          next={next}
        />
      ) : (
        <SupabaseSetupState />
      )}
    </AuthShell>
  );
};

export default SignInPage;
