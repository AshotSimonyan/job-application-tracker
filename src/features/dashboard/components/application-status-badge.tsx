import {
  getApplicationStatusBadgeClassName,
  getApplicationStatusLabel,
} from "@/features/dashboard/utils";

import type { ApplicationStatusBadgeProps } from "@/features/dashboard/types";

export const ApplicationStatusBadge = ({
  status,
  label,
  className,
}: ApplicationStatusBadgeProps) => {
  return (
    <span className={getApplicationStatusBadgeClassName(status, className)}>
      {label ?? getApplicationStatusLabel(status)}
    </span>
  );
};
