import { usePrevious } from "@mantine/hooks";

import { TLocations, TShipments, TVehicles } from "@app/modules";

import isEqual from "lodash.isequal";

export const useHasDataChanged = (locations: TLocations[], vehicles: TVehicles[], shipments: TShipments[]): boolean => {
  const prevLocations = usePrevious(locations);
  const prevVehicles = usePrevious(vehicles);
  const prevShipments = usePrevious(shipments);

  if (!prevLocations || !prevVehicles || !prevShipments) return false;

  return !(isEqual(prevLocations, locations) && isEqual(prevVehicles, vehicles) && isEqual(prevShipments, shipments));
};
