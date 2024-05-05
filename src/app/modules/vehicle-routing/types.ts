import { LngLatLike } from "mapbox-gl";

enum EStopsType {
  PICK_UP = "pickup",
  DROP_OFF = "dropoff",
  START = "start",
  END = "end",
}

type TMetaData = {
  supplied_coordinate: LngLatLike;
  snapped_coordinate: LngLatLike;
};

type TStops = {
  location: string;
  location_metadata: TMetaData;
  eta: string;
  type: EStopsType;
  odometer: number;
  wait: number;
};

type TRoutes = {
  vehicle: string;
  stops: TStops[];
};

type TLocations = {
  name: string;
  coordinates: LngLatLike;
};

type TVehicles = {
  name: string;
  start_location: string;
  end_location: string;
  capacities: {
    boxes: number;
  };
  earliest_start: string;
  latest_end: string;
};

type TShipments = {
  name: string;
  from: string;
  to: string;
  size: {
    boxes: number;
  };
  pickup_duration: number;
  dropoff_duration: number;
};

type TTimes = {
  earliest: string;
  latest: string;
};

export type TSubmitRoutingProblemResponse = {
  id: string;
  status: string;
  status_date: string;
};

export type TSubmitRoutingProblemBody = {
  version: number;
  locations: TLocations[];
  vehicles: TVehicles[];
  shipments: TShipments[];
  pickup_times?: TTimes[];
  dropoff_times?: TTimes[];
};

export type TRetrieveRoutingProblemResponse = {
  dropped: Record<string, unknown>;
  routes: TRoutes[];
  version: number;
};
