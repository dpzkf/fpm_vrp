import * as z from "zod";
import { ONLY_DIGIT_REGEX } from "../../../../constants/regex";

export const productFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Product name must be a string",
    })
    .trim()
    .min(1, { message: "Product name is required" }),
  price: z
    .string({
      invalid_type_error: "Price must be a string",
    })
    .trim()
    .min(1, { message: "Price is required" })
    .regex(ONLY_DIGIT_REGEX, { message: "Please enter correct price" }),
  quantity: z
    .string({ invalid_type_error: "Quantity must be a string" })
    .trim()
    .regex(ONLY_DIGIT_REGEX, {
      message: "Please enter a valid quantity",
    })
    .max(64, {
      message: "Quantity must be less than 64 characters.",
    }),
  category: z
    .string({
      invalid_type_error: "Category must be a string",
    })
    .trim(),
  productDetails: z.string({
    invalid_type_error: "Products details must be a string",
  }),
  isAddForSales: z.boolean({
    invalid_type_error: "Add for sales must be a boolean",
  }),
  isAddForPurchases: z.boolean({
    invalid_type_error: "Add for purchases must be a boolean",
  }),
});
