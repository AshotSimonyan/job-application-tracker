import Link from "next/link";

export const ResetSessionState = () => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
          Open the reset link from your email
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          This page only works from an active password reset link. Request a new
          link if the previous one expired or was already used.
        </p>
      </div>

      <div className="border-line bg-surface-alt text-muted rounded-xl border p-4 text-sm leading-7">
        Password reset links are single-use and time-sensitive.
      </div>

      <Link
        href="/auth/forgot-password"
        className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90"
      >
        Request a new link
      </Link>
    </div>
  );
};
