import { EAccess } from "../../../app/modules/users/types.ts";
import { ERole } from "../../../constants/userRoles.ts";
import * as z from "zod";

export const userFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please verify that you are entering the correct email.",
    })
    .max(128, {
      message: "Email must be less than 128 characters.",
    }),
  fullName: z
    .string({
      invalid_type_error: "User Name must be a string",
    })
    .trim()
    .min(1, {
      message: "User Name is required.",
    })
    .max(128, {
      message: "User Name must be less than 128 characters.",
    }),
  permissionsTemplate: z.nativeEnum(ERole),
  permissionsConfiguration: z.object({
    CUSTOMERS: z.nativeEnum(EAccess),
    PRODUCTS: z.nativeEnum(EAccess),
    ESTIMATES: z.nativeEnum(EAccess),
    INVOICES: z.nativeEnum(EAccess),
    EXPENSES: z.nativeEnum(EAccess),
    BILLS: z.nativeEnum(EAccess),
    REPORTS: z.nativeEnum(EAccess),
  }),
});
