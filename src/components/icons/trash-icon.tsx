import type { ComponentPropsWithoutRef } from "react";

export const TrashIcon = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      {...props}
    >
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M7.5 7 8 20h8l.5-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
};
