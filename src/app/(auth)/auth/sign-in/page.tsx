import { AuthFormPlaceholder } from "@/features/auth/components/auth-form-placeholder";
import { AuthShell } from "@/features/auth/components/auth-shell";

const SignInPage = () => {
  return (
    <AuthShell
      eyebrow="Sign in"
      title="Return to your application pipeline."
      description="Check progress across active roles, review upcoming conversations, and keep the next move clear."
    >
      <AuthFormPlaceholder mode="sign-in" />
    </AuthShell>
  );
};

export default SignInPage;
