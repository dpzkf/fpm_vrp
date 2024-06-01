import { TVehicles } from "@app/modules";

import { convertTimeToISOString } from "@utils/helpers";
import { z } from "zod";

import { vehiclesFormSchema } from "../Form";

export const formatData = (vehicle: z.infer<typeof vehiclesFormSchema>): Partial<TVehicles> => {
  const { capacity, earliest_start, latest_end } = vehicle;
  const capacityParam = capacity ? { boxes: Number(capacity) } : undefined;
  const earliestStartParam = earliest_start ? convertTimeToISOString(earliest_start) : undefined;
  const latestEndParam = latest_end ? convertTimeToISOString(latest_end) : undefined;
  return { capacities: capacityParam, earliest_start: earliestStartParam, latest_end: latestEndParam };
};
