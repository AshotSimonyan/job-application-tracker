import { MarketingHero } from "@/features/home/components/marketing-hero";
import { ProjectPillars } from "@/features/home/components/project-pillars";

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 lg:px-10 lg:py-16">
      <MarketingHero />
      <ProjectPillars />
    </div>
  );
};

export default HomePage;
