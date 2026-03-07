import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { signUpAction } from "@/features/auth/actions";
import type { AuthPageProps } from "@/features/auth/types";
import { getAuthMessage, getSafeRedirectPath } from "@/features/auth/utils";

const SignUpPage = async ({ searchParams }: AuthPageProps) => {
  const params = await searchParams;
  const message = getAuthMessage(params);
  const next = getSafeRedirectPath(params.next);

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start a more organized job search."
      description="Set up a dedicated workspace for applications, interview prep, and every follow-up that matters."
    >
      <AuthForm
        mode="sign-up"
        action={signUpAction}
        message={message}
        next={next}
      />
    </AuthShell>
  );
};

export default SignUpPage;
