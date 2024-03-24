import * as z from "zod";
// import { ONLY_DIGIT_REGEX } from "@constants/regex";

export const taxFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Tax name must be a string",
    })
    .trim()
    .min(1, { message: "Tax name is required" }),
  rate: z
    .number({
      invalid_type_error: "Phone must be a number",
    })
    .min(1, { message: "Tax rate is required" }),
  taxNumber: z.string({ invalid_type_error: "Tax ID must be a string" }).trim().max(64, {
    message: "Tax ID name must be less than 64 characters.",
  }),
  details: z
    .string({
      invalid_type_error: "Tax details must be a string",
    })
    .trim(),
  isNameShownInInvoice: z.boolean({
    invalid_type_error: "Show name must be a boolean",
  }),
});
