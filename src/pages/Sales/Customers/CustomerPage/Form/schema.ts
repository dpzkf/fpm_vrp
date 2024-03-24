import * as z from "zod";
import { FULL_NAME_REGEX } from "../../../../../constants/regex";

export const newCustomerFormSchema = z
  .object({
    email: z.union([
      z.literal(""),
      z.string({ invalid_type_error: "Email must be a string" }).trim().email({
        message: "Please verify that you are entering the correct email.",
      }),
    ]),
    phone: z
      .string({
        invalid_type_error: "Phone must be a string",
      })
      .trim(),
    customerName: z
      .string({ invalid_type_error: "Customer name must be a string" })
      .trim()
      .min(1, { message: "Customer name is required" })
      .regex(FULL_NAME_REGEX, {
        message: "Please enter a valid customer name.",
      })
      .max(128, {
        message: "Customer name must be less than 128 characters.",
      }),
    businessNumber: z
      .string({
        invalid_type_error: "Business number must be a string",
      })
      .optional(),
    address: z
      .string({
        invalid_type_error: "Address must be a string",
      })
      .optional(),
    billingAddress: z
      .string({
        invalid_type_error: "Billing address must be a string",
      })
      .optional(),
    shippingAddress: z
      .string({
        invalid_type_error: "Shipping address must be a string",
      })
      .optional(),
    tax: z.string({ invalid_type_error: "Tax must be a string" }).optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"],
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["phone"],
  });
