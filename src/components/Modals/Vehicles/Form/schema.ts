import * as z from "zod";

export const vehiclesFormSchema = z.object({
  capacity: z.number({ invalid_type_error: "Обов'язкове поле" }).min(0),
});
