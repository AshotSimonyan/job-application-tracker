import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};
