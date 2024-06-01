import * as z from "zod";

export const vehiclesFormSchema = z.object({
  capacity: z.union([z.number().min(1, { message: "Кількість товарів повинна бути більша за одиницю" }), z.string()]),
  earliest_start: z.string().optional(),
  latest_end: z.string().optional(),
});
