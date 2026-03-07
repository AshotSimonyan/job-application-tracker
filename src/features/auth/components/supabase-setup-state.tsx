import { SetupNotice } from "@/components/ui/setup-notice";
import { supabaseSetupSteps } from "@/features/auth/supabase-setup";

export const SupabaseSetupState = () => {
  return (
    <SetupNotice
      title="Supabase setup is still missing"
      description="Authentication is wired into the app, but your local environment variables are not configured yet. Add them locally and restart the server."
      steps={[...supabaseSetupSteps]}
    />
  );
};
