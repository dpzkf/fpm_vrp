import { TLocations, TShipments, TSubmitRouting, TVehicles } from "@app/modules";

import { TMarkers } from "../index.ts";

export const adaptSubmitData = (data: TMarkers[]): TSubmitRouting => {
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
