import { redirect } from "next/navigation";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { SupabaseSetupState } from "@/features/auth/components/supabase-setup-state";
import { requestPasswordResetAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage } from "@/features/auth/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const ForgotPasswordPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);

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
      eyebrow="Password recovery"
      title="Recover access to your workspace."
      description="Request a reset link and we will send you back into the app so you can set a new password."
      variant="compact"
    >
      {isSupabaseConfigured() ? (
        <ForgotPasswordForm
          action={requestPasswordResetAction}
          message={message}
        />
      ) : (
        <SupabaseSetupState />
      )}
    </AuthShell>
  );
};

export default ForgotPasswordPage;
