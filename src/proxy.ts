import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

export const proxy = async (request: NextRequest) => {
  return updateSession(request);
};

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
