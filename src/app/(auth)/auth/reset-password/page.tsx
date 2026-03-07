import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { SupabaseSetupState } from "@/features/auth/components/supabase-setup-state";
import { updatePasswordAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage } from "@/features/auth/utils";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const ResetPasswordPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);

  return (
    <AuthShell
      eyebrow="Reset password"
      title="Create a new password and continue."
      description="Use the recovery link from your email to open this page, then save a new password for your account."
    >
      {isSupabaseConfigured() ? (
        <ResetPasswordForm action={updatePasswordAction} message={message} />
      ) : (
        <SupabaseSetupState />
      )}
    </AuthShell>
  );
};

export default ResetPasswordPage;
