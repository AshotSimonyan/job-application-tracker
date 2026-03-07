import { signOutAction } from "@/features/auth/actions";

export const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-panel-foreground inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/12"
      >
        Sign out
      </button>
    </form>
  );
};
