import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn("max-w-2xl space-y-3", className)}>
      <p className="text-brand text-xs font-semibold tracking-[0.28em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
        {title}
      </h2>
      <p className="text-muted text-base leading-7 sm:text-lg">{description}</p>
    </div>
  );
};
