import type { ComponentPropsWithoutRef } from "react";

export const SortIcon = ({
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
      <path d="m8 7 4-4 4 4" />
      <path d="m16 17-4 4-4-4" />
      <path d="M12 4v16" />
    </svg>
  );
};
