import { TShipments, TVehicles } from "@app/modules";
import { TDirection } from "@app/modules/directions";

import { ActiveTabs } from "@components/Sidebar";

import { TLocation } from "../types";

export type TContextLocations = TLocation[];
export type TContextShipments = TShipments[];
export type TContextVehicles = TVehicles[];
export type TContextSolution = TDirection | null;

export type TVehicleRoutingContext = {
  activeTab: ActiveTabs;
  locations: TContextLocations;
  shipments: TContextShipments;
  vehicles: TContextVehicles;
  solution: TContextSolution;
  changeActiveTab: (value: ActiveTabs) => void;
  addLocation: (location: TLocation) => void;
  updateLocation: (id: string, location: Partial<TLocation>) => void;
  deleteLocation: (id: string) => void;
  addShipment: (shipment: TShipments) => void;
  updateShipment: (id: string, shipment: Partial<TShipments>) => void;
  deleteShipment: (id: string) => void;
  addVehicle: (vehicle: TVehicles) => void;
  addSolution: (solution: TDirection) => void;
  getWarehouses: () => string[];
  getDropOffs: () => string[];
};
