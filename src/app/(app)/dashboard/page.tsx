import { SetupNotice } from "@/components/ui/setup-notice";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { supabaseSetupSteps } from "@/features/auth/supabase-setup";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const DashboardPage = () => {
  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-81px)] w-full max-w-4xl items-center px-6 py-12 lg:px-10">
        <SetupNotice
          title="Supabase is not configured yet"
          description="The dashboard is protected by Supabase auth, so local environment variables need to be configured before this area can be used."
          steps={[...supabaseSetupSteps]}
        />
      </div>
    );
  }

  return <DashboardShell />;
};

export default DashboardPage;
