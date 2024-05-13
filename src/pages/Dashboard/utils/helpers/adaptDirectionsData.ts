import { TRoutes } from "@app/modules";

export const adaptDirectionsData = (data?: TRoutes) => {
  if (!data) return "";
  return data.stops.map(({ location_metadata }) => location_metadata.snapped_coordinate.join(",")).join(";");
};
