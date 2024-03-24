import { EChoice } from "../../../constants/Choice.ts";
import * as z from "zod";

export const packageSchema = z.object({
  packageName: z
    .string({
      invalid_type_error: "Package name must be a string",
    })
    .trim()
    .min(1, {
      message: "Package name is required",
    })
    .max(128, {
      message: "Package name must be less than 128 characters.",
    }),
  monthlyPrice: z
    .number({
      invalid_type_error: "Monthly price must be a number",
    })
    .min(1, {
      message: "Monthly price is required.",
    }),
  yearlyPrice: z
    .number({
      invalid_type_error: "Yearly price must be a number",
    })
    .min(1, {
      message: "Yearly price is required.",
    }),
  description: z
    .string({
      invalid_type_error: "Package name must be a string",
    })
    .trim()
    .min(1, {
      message: "Package name is required",
    })
    .max(128, {
      message: "Package name must be less than 128 characters.",
    }),
  firstFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  firstFeatureMonthlyLimit: z.number().min(1, {
    message: "Monthly limit is required.",
  }),
  firstFeatureYearlyLimit: z.number().min(1, {
    message: "Yearly limit is required.",
  }),
  secondFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  secondFeatureMonthlyLimit: z.number().min(1, {
    message: "Monthly limit is required.",
  }),
  secondFeatureYearlyLimit: z.number().min(1, {
    message: "Yearly limit is required.",
  }),
  thirdFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  thirdFeatureMonthlyLimit: z.number().min(1, {
    message: "Monthly limit is required.",
  }),
  thirdFeatureYearlyLimit: z.number().min(1, {
    message: "Yearly limit is required.",
  }),
  fourthFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  fourthFeatureMonthlyLimit: z.number().min(1, {
    message: "Monthly limit is required.",
  }),
  fourthFeatureYearlyLimit: z.number().min(1, {
    message: "Yearly limit is required.",
  }),
  fourthIsFeatureMonthlyLimit: z.boolean(),
  fourthIsFeatureYearlyLimit: z.boolean(),
  fifthFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  fifthIsFeatureMonthlyLimit: z.nativeEnum(EChoice),
  fifthIsFeatureYearlyLimit: z.nativeEnum(EChoice),
  sixthFeatureName: z
    .string({
      invalid_type_error: "Feature name must be a string",
    })
    .trim()
    .min(1, {
      message: "Feature name is required",
    })
    .max(128, {
      message: "Feature name must be less than 128 characters.",
    }),
  sixthFeatureMonthlyLimit: z.number().min(1, {
    message: "Monthly limit is required.",
  }),
  sixthFeatureYearlyLimit: z.number().min(1, {
    message: "Yearly limit is required.",
  }),
});
