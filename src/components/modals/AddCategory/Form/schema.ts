import * as z from "zod";
import { ECategoryType } from "../../../../constants";

export const categoryFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Category name must be a string",
    })
    .trim()
    .min(1, { message: "Category name is required" }),
  type: z.nativeEnum(ECategoryType),
});
