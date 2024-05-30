import { TShipments, TTimes } from "@app/modules";

import { convertTimeToISOString } from "@utils/helpers";
import { z } from "zod";

import { shipmentsFormSchema } from "../Form";

export const formatData = (shipment: z.infer<typeof shipmentsFormSchema>): Partial<TShipments> => {
  const size = shipment?.size ? { boxes: shipment.size as number } : undefined;
  const dropoff_times: [TTimes] | undefined =
    shipment?.latest && shipment?.earliest
      ? [
          {
            earliest: convertTimeToISOString(shipment.earliest as string),
            latest: convertTimeToISOString(shipment.latest as string),
          },
        ]
      : undefined;
  return { ...shipment, size, dropoff_times };
};
