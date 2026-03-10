import type { ComponentPropsWithoutRef } from "react";

export const EditIcon = ({
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
      <path d="M4 20h4.5L19 9.5a2.12 2.12 0 0 0-3-3L5.5 17H4v3Z" />
      <path d="m14.5 7.5 3 3" />
    </svg>
  );
};
