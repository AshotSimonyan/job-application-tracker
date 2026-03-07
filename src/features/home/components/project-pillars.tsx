import { SectionHeading } from "@/components/ui/section-heading";
import { homePillars } from "@/features/home/content/home-content";

export const ProjectPillars = () => {
  return (
    <section className="border-line bg-surface space-y-10 rounded-[2rem] border p-8 shadow-[0_28px_90px_-60px_rgba(8,22,47,0.32)] sm:p-10">
      <SectionHeading
        eyebrow="Everything in one workflow"
        title="Built around the way a real search actually moves"
        description="From first application to final interview, the structure is ready for the screens and data you would expect in a polished job search product."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {homePillars.map((pillar) => (
          <article
            key={pillar.title}
            className="border-line bg-surface-alt rounded-[1.5rem] border p-6"
          >
            <h3 className="text-foreground text-2xl font-semibold tracking-[-0.04em]">
              {pillar.title}
            </h3>
            <p className="text-muted mt-3 text-sm leading-7">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
