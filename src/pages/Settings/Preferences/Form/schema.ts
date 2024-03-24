import * as z from "zod";

export const preferencesFormSchema = z.object({
  registrationSystem: z.boolean(),
  emailVerification: z.boolean(),
  enablePayment: z.boolean(),
  deleteInvoice: z.boolean(),
  discount: z.boolean(),
});
