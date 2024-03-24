import * as z from "zod";

export const discountFormSchema = z.object({
  isStandardOnSale: z.boolean(),
  standardMonthly: z
    .number({
      invalid_type_error: "Monthly discount must be a number",
    })
    .min(1, {
      message: "Monthly discount is required",
    }),
  standardYearly: z
    .number({
      invalid_type_error: "Yearly discount must be a number",
    })
    .min(1, {
      message: "Yearly discount is required",
    }),
  isPremiumOnSale: z.boolean(),
  premiumMonthly: z
    .number({
      invalid_type_error: "Monthly discount must be a number",
    })
    .min(1, {
      message: "Monthly discount is required",
    }),
  premiumYearly: z
    .number({
      invalid_type_error: "Yearly discount must be a number",
    })
    .min(1, {
      message: "Yearly discount is required",
    }),
  isGoldOnSale: z.boolean(),
  goldMonthly: z
    .number({
      invalid_type_error: "Monthly discount must be a number",
    })
    .min(1, {
      message: "Monthly discount is required",
    }),
  goldYearly: z
    .number({
      invalid_type_error: "Yearly discount must be a number",
    })
    .min(1, {
      message: "Yearly discount is required",
    }),
});
