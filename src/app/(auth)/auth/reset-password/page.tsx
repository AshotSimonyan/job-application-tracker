import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetSessionState } from "@/features/auth/components/reset-session-state";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { SupabaseSetupState } from "@/features/auth/components/supabase-setup-state";
import { updatePasswordAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage } from "@/features/auth/utils";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const ResetPasswordPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);
  let hasRecoverySession = false;

  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    hasRecoverySession = Boolean(user);
  }

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Create a new password and continue."
      description="Use the recovery link from your email to open this page, then save a new password for your account."
      variant="compact"
    >
      {isSupabaseConfigured() ? (
        hasRecoverySession ? (
          <ResetPasswordForm action={updatePasswordAction} message={message} />
        ) : (
          <ResetSessionState />
        )
      ) : (
        <SupabaseSetupState />
      )}
    </AuthShell>
  );
};

export default ResetPasswordPage;
