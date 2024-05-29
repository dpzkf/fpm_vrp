import { TLocations, TShipments, TSubmitRouting, TVehicles } from "@app/modules";

import { TLocation } from "types";

export const adaptSubmitData = (data: TLocation[]): TSubmitRouting => {
  const locations: TLocations[] = data.map(({ name, coordinates }) => ({
    name,
    coordinates,
  }));
  const vehicles: TVehicles[] = [{ name: "0" }];
  const shipments: TShipments[] = data
    .slice(1)
    .map(({ name }, index) => ({ name: String(index), from: data[0].name, to: name }));

  return { version: 1, locations, vehicles, shipments };
};
