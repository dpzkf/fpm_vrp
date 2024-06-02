import { TDirection, TShipments, TVehicles } from "@app/modules";

import { ActiveTabs } from "@components/Sidebar";
import { LineString } from "@turf/helpers";

import { TLocation } from "../types";

export type TContextLocations = TLocation[];
export type TContextShipments = TShipments[];
export type TContextVehicles = TVehicles[];
export type TContextDirections = (Omit<TDirection, "routes"> & { isActive: boolean; routes: LineString })[];

export type TVehicleRoutingContext = {
  activeTab: ActiveTabs;
  locations: TContextLocations;
  shipments: TContextShipments;
  vehicles: TContextVehicles;
  directions: TContextDirections;
  changeActiveTab: (value: ActiveTabs) => void;
  addLocation: (location: TLocation | TLocation[]) => void;
  updateLocation: (id: string, location: Partial<TLocation>) => void;
  deleteLocation: (id: string) => void;
  addShipment: (shipment: TShipments | TShipments[]) => void;
  updateShipment: (id: string, shipment: Partial<TShipments>) => void;
  deleteShipment: (id: string) => void;
  addVehicle: (vehicle: TVehicles | TVehicles[]) => void;
  updateVehicle: (id: string, vehicle: Partial<TVehicles>) => void;
  deleteVehicle: (id: string) => void;
  addDirection: (direction: TDirection[]) => void;
  updateDirection: (activeDirectionIndex: number) => void;
  getWarehouses: () => string[];
  getDropOffs: () => string[];
};
