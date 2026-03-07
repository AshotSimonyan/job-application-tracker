import { redirect } from "next/navigation";

import type { AppLayoutProps } from "@/app/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const DashboardLayout = async ({ children }: AppLayoutProps) => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in?next=/dashboard");
  }

  return children;
};

export default DashboardLayout;
