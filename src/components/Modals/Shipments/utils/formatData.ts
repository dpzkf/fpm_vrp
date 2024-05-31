import { TShipments, TTimes } from "@app/modules";

import { convertTimeToISOString } from "@utils/helpers";
import { z } from "zod";

import { shipmentsFormSchema } from "../Form";

export const formatData = (shipment: z.infer<typeof shipmentsFormSchema>): Partial<TShipments> => {
  const { earliest, latest, size, ...restShipmentData } = shipment;
  const sizeParam = size ? { boxes: Number(size) } : undefined;
  const dropoff_times: [TTimes] | undefined =
    latest && earliest
      ? [
          {
            earliest: convertTimeToISOString(earliest),
            latest: convertTimeToISOString(latest),
          },
        ]
      : undefined;
  return { ...restShipmentData, size: sizeParam, dropoff_times };
};
