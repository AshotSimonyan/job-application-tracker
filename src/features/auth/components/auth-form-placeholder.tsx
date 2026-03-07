import Link from "next/link";

import { authFormContent } from "@/features/auth/content/auth-content";
import type { AuthFormPlaceholderProps } from "@/features/auth/types";

export const AuthFormPlaceholder = ({ mode }: AuthFormPlaceholderProps) => {
  const content = authFormContent[mode];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
          {content.title}
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          {content.subtitle}
        </p>
      </div>

      <div className="grid gap-4">
        <label className="text-foreground grid gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            placeholder="name@example.com"
            disabled
            className="border-line bg-surface-alt text-muted h-12 rounded-2xl border px-4 text-sm outline-none"
          />
        </label>

        <label className="text-foreground grid gap-2 text-sm font-medium">
          Password
          <input
            type="password"
            placeholder="••••••••"
            disabled
            className="border-line bg-surface-alt text-muted h-12 rounded-2xl border px-4 text-sm outline-none"
          />
        </label>
      </div>

      <div className="border-line bg-surface-alt text-muted rounded-[1.5rem] border p-4 text-sm leading-7">
        {content.note}
      </div>

      <button
        type="button"
        disabled
        className="bg-panel text-panel-foreground inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold opacity-85"
      >
        {content.cta}
      </button>

      <p className="text-muted text-sm">
        {content.alternateLabel}{" "}
        <Link href={content.alternateHref} className="text-brand font-semibold">
          {content.alternateAction}
        </Link>
      </p>
    </div>
  );
};
