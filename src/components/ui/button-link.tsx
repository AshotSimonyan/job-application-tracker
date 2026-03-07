import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "bg-brand text-white shadow-[0_22px_44px_-24px_rgba(29,78,216,0.6)] hover:bg-brand-strong",
  secondary:
    "border border-line bg-surface text-foreground hover:border-brand/30 hover:bg-surface-alt",
  ghost: "text-foreground hover:bg-foreground/5",
} satisfies Record<NonNullable<ButtonLinkProps["variant"]>, string>;

export const ButtonLink = ({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-tight transition-colors",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
};
