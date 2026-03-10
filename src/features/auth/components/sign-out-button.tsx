import { signOutAction } from "@/features/auth/actions";

export const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-muted hover:text-foreground inline-flex h-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors"
      >
        Sign out
      </button>
    </form>
  );
};
