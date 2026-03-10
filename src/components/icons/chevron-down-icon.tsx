import { cn } from "@/lib/utils/cn";

type ChevronDownIconProps = {
  className?: string;
};

export const ChevronDownIcon = ({ className }: ChevronDownIconProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
