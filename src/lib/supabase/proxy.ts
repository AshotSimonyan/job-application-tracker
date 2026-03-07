import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

const AUTH_PATH = "/auth";
const DASHBOARD_PATH = "/dashboard";
const SIGN_IN_PATH = "/auth/sign-in";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({ request });
  const { url, anonKey } = getSupabaseEnv();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith(DASHBOARD_PATH)) {
    const redirectUrl = new URL(SIGN_IN_PATH, request.url);
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    redirectUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(redirectUrl);
  }

  if (user && request.nextUrl.pathname.startsWith(AUTH_PATH)) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  return response;
};
