import { LngLatLike } from "mapbox-gl";

enum EStopsType {
  PICK_UP = "pickup",
  DROP_OFF = "dropoff",
  START = "start",
  END = "end",
}

type TMetaData = {
  supplied_coordinate: [number, number];
  snapped_coordinate: [number, number];
};

type TStops = {
  location: string;
  location_metadata: TMetaData;
  eta: string;
  type: EStopsType;
  odometer: number;
  wait: number;
};

export type TRoutes = {
  vehicle: string;
  stops: TStops[];
};

export type TLocations = {
  name: string;
  coordinates: LngLatLike;
};

export type TVehicles = {
  id: string;
  name: string;
  start_location?: string;
  end_location?: string;
  capacities?: {
    boxes: number;
  };
  earliest_start?: string;
  latest_end?: string;
};

export type TTimes = {
  earliest: string;
  latest: string;
};

export type TShipments = {
  id: string;
  name: string;
  from: string;
  to: string;
  size?: {
    boxes: number;
  };
  pickup_duration?: number;
  dropoff_duration?: number;
  pickup_times?: [TTimes];
  dropoff_times?: [TTimes];
};

export enum ESubmitRoutingProblemStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETE = "ok",
  UNSOLVABLE = "unsolvable",
}

export type TSubmitRoutingProblem = {
  id: string;
  status: ESubmitRoutingProblemStatus;
  status_date: string;
  code?: ESubmitRoutingProblemStatus.UNSOLVABLE;
};

export type TSubmitRoutingProblemResponse = TSubmitRoutingProblem;

export type TSubmitRoutingProblemBody = {
  version: 1;
  locations: TLocations[];
  vehicles: Omit<TVehicles, "id">[];
  shipments: Omit<TShipments, "id">[];
};

export type TSubmitRouting = TSubmitRoutingProblemBody;

export type TRetrieveRoutingProblem = {
  dropped: Record<string, unknown>;
  routes: TRoutes[];
  version: number;
};

export type TRetrieveRoutingProblemResponse = TRetrieveRoutingProblem;