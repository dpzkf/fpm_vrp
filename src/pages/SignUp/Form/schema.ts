import * as z from "zod";
import {
  CONTAIN_DIGIT_REGEX,
  CONTAIN_LETTER_REGEX,
  FULL_NAME_REGEX,
} from "../../../constants/regex";

export const signUpFormSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .trim()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Please verify that you are entering the correct email.",
      })
      .max(128, {
        message: "Email must be less than 128 characters.",
      }),
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
    fullName: z
      .string({ invalid_type_error: "Full name must be a string" })
      .trim()
      .min(1, { message: "Full name is required" })
      .regex(FULL_NAME_REGEX, { message: "Please enter a valid full name." })
      .max(128, {
        message: "Full name must be less than 128 characters.",
      }),
    termsAgree: z.boolean({
      invalid_type_error: "termsAgree must be a boolean",
    }),
  })
  .refine((data) => data.termsAgree == true, {
    message: "You must agree with the Terms of Service to continue.",
  });
