import * as yup from "yup";

import type {
  AuthFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/features/auth/types";

export const authFormSchema: yup.ObjectSchema<AuthFormValues> = yup
  .object({
    email: yup
      .string()
      .trim()
      .email("Enter a valid email address.")
      .required("Email is required."),
    password: yup
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  })
  .required();

export const forgotPasswordFormSchema: yup.ObjectSchema<ForgotPasswordFormValues> =
  yup
    .object({
      email: yup
        .string()
        .trim()
        .email("Enter a valid email address.")
        .required("Email is required."),
    })
    .required();

export const resetPasswordFormSchema: yup.ObjectSchema<ResetPasswordFormValues> =
  yup
    .object({
      password: yup
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
    })
    .required();
