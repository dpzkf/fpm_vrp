import * as z from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .max(128, {
      message: "Email must be less than 128 characters.",
    }),
});
