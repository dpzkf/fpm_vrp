import * as z from "zod";
import { CONTAIN_DIGIT_REGEX, CONTAIN_LETTER_REGEX } from "../../../constants/regex";

export const passwordResetSchema = z
  .object({
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .trim()
      .min(1, {
        message: "Password is required.",
      })
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(128, {
        message: "Password must be less than 128 characters.",
      })
      .regex(CONTAIN_DIGIT_REGEX, {
        message: "Password must contain at least one number.",
      })
      .regex(CONTAIN_LETTER_REGEX, {
        message: "Password must contain at least one letter.",
      }),
    confirmPassword: z
      .string({
        invalid_type_error: "Confirm Password must be a string",
      })
      .trim()
      .min(1, {
        message: "Confirm Password is required",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
