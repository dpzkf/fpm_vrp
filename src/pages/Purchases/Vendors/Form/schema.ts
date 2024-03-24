import { PHONE_NUMBER_REGEX } from "../../../../constants/regex.ts";
import * as z from "zod";

export const vendorFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "User Name must be a string",
    })
    .trim()
    .min(1, {
      message: "User Name is required.",
    })
    .max(128, {
      message: "User Name must be less than 128 characters.",
    }),
  phone: z
    .string({
      invalid_type_error: "Phone must be a string",
    })
    .trim()
    .regex(PHONE_NUMBER_REGEX)
    .max(20, {
      message: "Phone number must be less than 20 characters.",
    }),
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
  address: z
    .string({
      invalid_type_error: "Address must be a string",
    })
    .trim()
    .max(128, {
      message: "Address must be less than 128 characters.",
    }),
});
