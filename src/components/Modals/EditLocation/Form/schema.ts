import * as z from "zod";

export const locationFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Category name must be a string",
    })
    .trim()
    .min(1, { message: "Location name is required" })
    .max(128, { message: "Location name must be less than 128 characters." }),
});
