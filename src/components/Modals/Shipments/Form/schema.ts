import * as z from "zod";

export const shipmentsFormSchema = z.object({
  from: z.string().min(1, {
    message: "Обов'язкове поле",
  }),
  to: z.string().min(1, {
    message: "Обов'язкове поле",
  }),
  size: z.union([z.number().min(1, { message: "Amount is required" }), z.string()]),
  earliest: z.string({ invalid_type_error: "Payment due date must be a date" }).optional(),
  latest: z.string({ invalid_type_error: "Payment due date must be a date" }).optional(),
});
