import { MarketingHero } from "@/features/home/components/marketing-hero";
import { ProjectPillars } from "@/features/home/components/project-pillars";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const HomePage = async () => {
  let isSignedIn = false;

  if (isSupabaseConfigured()) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isSignedIn = Boolean(user);
  }

  return (
    <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-12 px-6 py-10 lg:px-10 lg:py-16">
      <MarketingHero isSignedIn={isSignedIn} />
      <ProjectPillars />
    </div>
  );
};

export default HomePage;
