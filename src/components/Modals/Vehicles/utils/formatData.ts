import { TVehicles } from "@app/modules";

import { z } from "zod";

import { vehiclesFormSchema } from "../Form";

export const formatData = (vehicle: z.infer<typeof vehiclesFormSchema>): Partial<TVehicles> => {
  const { capacity } = vehicle;
  const capacityParam = capacity ? { boxes: Number(capacity) } : undefined;
  return { capacities: capacityParam };
};
