import * as z from "zod";

export const shipmentsFormSchema = z
  .object({
    from: z.string().min(1, {
      message: "Обов'язкове поле",
    }),
    to: z.string().min(1, {
      message: "Обов'язкове поле",
    }),
    size: z.union([z.number().min(1, { message: "Кількість товарів повинна бути більша за одиницю" }), z.string()]),
    earliest: z.string().optional(),
    latest: z.string().optional(),
  })
  .refine((data) => !((!!data.earliest && !data.latest) || (!!data.latest && !data.earliest)), {
    message: "Треба заповнити два поля",
    path: ["earliest"],
  })
  .refine((data) => !((!!data.earliest && !data.latest) || (!!data.latest && !data.earliest)), {
    message: "Треба заповнити два поля",
    path: ["latest"],
  });
