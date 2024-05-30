import { TShipments, TTimes } from "@app/modules";

import { convertTimeToISOString } from "@utils/helpers";
import { z } from "zod";

import { shipmentsFormSchema } from "../Form";

export const formatData = (shipment: z.infer<typeof shipmentsFormSchema>): Partial<TShipments> => {
  const { earliest, latest, size, ...restShipmentData } = shipment;
  const sizeParam = size ? { boxes: shipment.size as number } : undefined;
  const dropoff_times: [TTimes] | undefined =
    latest && earliest
      ? [
          {
            earliest: convertTimeToISOString(earliest as string),
            latest: convertTimeToISOString(latest as string),
          },
        ]
      : undefined;
  return { ...restShipmentData, size: sizeParam, dropoff_times };
};
