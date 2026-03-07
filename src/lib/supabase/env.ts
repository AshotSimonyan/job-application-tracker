const missingEnvMessage =
  "Supabase environment variables are missing. Fill out .env.local before enabling auth, database, or storage flows.";

export const getSupabaseBrowserEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(missingEnvMessage);
  }

  return { url, publishableKey };
};

export const getSupabaseServiceRoleKey = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(missingEnvMessage);
  }

  return serviceRoleKey;
};
