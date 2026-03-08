import { redirect } from "next/navigation";

import type { AppLayoutProps } from "@/app/types";
import { SetupNotice } from "@/components/ui/setup-notice";
import { supabaseSetupSteps } from "@/features/auth/supabase-setup";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const DashboardLayout = async ({ children }: AppLayoutProps) => {
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

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?next=/dashboard");
  }

  const dashboardData = await getDashboardData();

  return <DashboardShell data={dashboardData}>{children}</DashboardShell>;
};

export default DashboardLayout;
