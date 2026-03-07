import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { signInAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage, getSafeRedirectPath } from "@/features/auth/utils";

const SignInPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);
  const next = getSafeRedirectPath(params.next);

  return (
    <AuthShell
      eyebrow="Sign in"
      title="Return to your application pipeline."
      description="Check progress across active roles, review upcoming conversations, and keep the next move clear."
    >
      <AuthForm
        mode="sign-in"
        action={signInAction}
        message={message}
        next={next}
      />
    </AuthShell>
  );
};

export default SignInPage;
