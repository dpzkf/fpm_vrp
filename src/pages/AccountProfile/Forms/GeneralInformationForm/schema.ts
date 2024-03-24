import * as z from "zod";
import { FULL_NAME_REGEX } from "../../../../constants/regex";

export const generalInformationSchema = z.object({
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
  fullName: z
    .string({ invalid_type_error: "Full name must be a string" })
    .trim()
    .min(1, { message: "Full name is required" })
    .regex(FULL_NAME_REGEX, { message: "Please enter a valid full name." })
    .max(128, {
      message: "Full name must be less than 128 characters.",
    }),
  address: z.string({ invalid_type_error: "Address must be a string" }).trim().max(128, {
    message: "Address must be less than 128 characters.",
  }),
  city: z.string({ invalid_type_error: "City must be a string" }).trim().max(128, {
    message: "City must be less than 128 characters.",
  }),
  state: z.string({ invalid_type_error: "State must be a string" }).trim().max(128, {
    message: "State must be less than 128 characters.",
  }),
  postcode: z.string({ invalid_type_error: "Postcode must be a string" }).trim().max(128, {
    message: "Postcode must be less than 10 characters.",
  }),
});
