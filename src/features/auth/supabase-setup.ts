export const supabaseSetupSteps = [
  "Create a .env.local file in the project root.",
  "Set NEXT_PUBLIC_SUPABASE_URL to your Supabase project URL.",
  "Set NEXT_PUBLIC_SUPABASE_ANON_KEY to your Supabase anon key.",
  "Restart the Next.js server after saving the file.",
] as const;
