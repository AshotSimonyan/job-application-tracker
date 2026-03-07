import type { SupabaseEnv } from "@/lib/supabase/types";

const missingEnvMessage =
  "Supabase environment variables are missing. Fill out .env.local before using Supabase.";

export const getSupabaseEnv = (): SupabaseEnv => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(missingEnvMessage);
  }

  return { url, anonKey };
};
