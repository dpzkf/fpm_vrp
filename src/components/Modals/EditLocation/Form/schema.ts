import * as z from "zod";

export const locationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Назва вулиці обов'язкове поле" })
    .max(128, { message: "Назва вулиці повинна бути менш за 128 символів" }),
});
