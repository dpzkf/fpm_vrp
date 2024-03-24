import * as z from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, {
      message: "Email is required",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(1, {
      message: "Password is required.",
    }),
});
