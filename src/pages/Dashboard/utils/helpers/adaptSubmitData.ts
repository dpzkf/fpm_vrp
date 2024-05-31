import { TLocations, TShipments, TSubmitRouting, TVehicles } from "@app/modules";

import { TLocation } from "types";

export const adaptSubmitData = (
  locationsData: TLocation[],
  shipmentsData: TShipments[],
  vehiclesData: TVehicles[],
): TSubmitRouting => {
  const locations: TLocations[] = locationsData.map(({ name, coordinates }) => ({
    name,
    coordinates,
  }));
  const shipments = shipmentsData.map(({ name, from, to, size, dropoff_times }) => ({
    name,
    from,
    to,
    size,
    dropoff_times,
  }));
  const vehicles = vehiclesData.map(({ name, capacities }) => ({
    name,
    capacities,
  }));
  return { version: 1, locations, shipments, vehicles };
};
