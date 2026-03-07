import type { ReactNode } from "react";

export type AuthMode = "sign-in" | "sign-up";

export type AuthMessage = {
  type: "error" | "success";
  text: string;
};

export type AuthRedirectOptions = {
  error?: string;
  success?: string;
  next?: string;
};

export type AuthSearchParams = {
  error?: string | string[];
  success?: string | string[];
  next?: string | string[];
};

export type AuthPageProps = {
  searchParams: Promise<AuthSearchParams>;
};

export type AuthFormAction = (formData: FormData) => void | Promise<void>;

export type AuthFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type ResetPasswordFormValues = {
  password: string;
};

export type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: ReactNode;
};

export type AuthFormProps = {
  mode: AuthMode;
  action: AuthFormAction;
  message?: AuthMessage | null;
  next?: string;
};

export type ForgotPasswordFormProps = {
  action: AuthFormAction;
  message?: AuthMessage | null;
};

export type ResetPasswordFormProps = {
  action: AuthFormAction;
  message?: AuthMessage | null;
};
