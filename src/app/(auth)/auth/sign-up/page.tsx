import { AuthFormPlaceholder } from "@/features/auth/components/auth-form-placeholder";
import { AuthShell } from "@/features/auth/components/auth-shell";

const SignUpPage = () => {
  return (
    <AuthShell
      eyebrow="Create account"
      title="Start a more organized job search."
      description="Set up a dedicated workspace for applications, interview prep, and every follow-up that matters."
    >
      <AuthFormPlaceholder mode="sign-up" />
    </AuthShell>
  );
};

export default SignUpPage;
