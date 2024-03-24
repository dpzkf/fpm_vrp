import * as z from "zod";

export const businessCategoryFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Category name must be a string",
    })
    .trim()
    .min(1, { message: "Category name is required" }),
});
