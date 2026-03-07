import type {
  AuthMessage,
  AuthRedirectOptions,
  AuthSearchParams,
} from "@/features/auth/types";

export const readSearchParam = (value?: string | string[] | null) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export const getSafeRedirectPath = (
  value?: string | string[] | null,
  fallback = "/dashboard",
) => {
  const next = readSearchParam(value);

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }

  return next;
};

export const buildAuthPath = (
  pathname: string,
  options: AuthRedirectOptions = {},
) => {
  const searchParams = new URLSearchParams();

  if (options.error) {
    searchParams.set("error", options.error);
  }

  if (options.success) {
    searchParams.set("success", options.success);
  }

  if (options.next) {
    searchParams.set("next", options.next);
  }

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

export const getAuthMessage = (
  searchParams: AuthSearchParams,
): AuthMessage | null => {
  const error = readSearchParam(searchParams.error);

  if (error) {
    return { type: "error", text: error };
  }

  const success = readSearchParam(searchParams.success);

  if (success) {
    return { type: "success", text: success };
  }

  return null;
};
