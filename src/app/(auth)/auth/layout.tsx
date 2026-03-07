import { redirect } from "next/navigation";

import type { AppLayoutProps } from "@/app/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const AuthLayout = async ({ children }: AppLayoutProps) => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return children;
};

export default AuthLayout;
