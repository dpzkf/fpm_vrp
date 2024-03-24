import * as z from "zod";

export const paymentSettingsSchema = z.object({
  isStripeEnabled: z.boolean(),
  publishKey: z
    .string({
      invalid_type_error: "Publish key must be a string",
    })
    .trim()
    .min(1, { message: "Publish key is required" }),
  secretKey: z
    .string({
      invalid_type_error: "Secret key must be a string",
    })
    .trim()
    .min(1, { message: "Secret key is required" }),
  isPaypalEnabled: z.boolean(),
  paypalMode: z
    .string({
      invalid_type_error: "Publish key must be a string",
    })
    .trim()
    .min(1, { message: "Publish key is required" }),
  paypalAccount: z
    .string({
      invalid_type_error: "Secret key must be a string",
    })
    .trim()
    .min(1, { message: "Secret key is required" }),
});
