import * as React from "react";
import { createContext, PropsWithChildren, useState } from "react";

import { TShipments, TVehicles } from "@app/modules";
import { TDirection } from "@app/modules/directions";

import { ActiveTabs } from "@components/Sidebar";

import { TLocation } from "../types";
import {
  TContextLocations,
  TContextShipments,
  TContextSolution,
  TContextVehicles,
  TVehicleRoutingContext,
} from "./types.ts";

export const VehicleRoutingContext = createContext<TVehicleRoutingContext | null>(null);

export const VehicleRoutingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.LOCATIONS_WAREHOUSES);
  const [locations, setLocations] = useState<TContextLocations>([]);
  const [shipments, setShipments] = useState<TContextShipments>([]);
  const [vehicles, setVehicles] = useState<TContextVehicles>([]);
  const [solution, setSolution] = useState<TContextSolution>(null);

  const addLocation = (location: TLocation) => {
    setLocations((prevState) => [...prevState, { ...location }]);
  };
  const updateLocation = (id: string, location: Partial<TLocation>) => {
    setLocations((prevState) => prevState.map((el) => (el.id === id ? { ...el, ...location } : el)));
  };
  const addShipments = (shipment: TShipments) => {
    setShipments((prevState) => [...prevState, shipment]);
  };
  const addVehicle = (vehicle: TVehicles) => {
    setVehicles((prevState) => [...prevState, vehicle]);
  };
  const addSolution = (solution: TDirection) => {
    setSolution(solution);
  };
  return (
    <VehicleRoutingContext.Provider
      value={{
        activeTab,
        locations,
        shipments,
        vehicles,
        solution,
        changeActiveTab: setActiveTab,
        addLocation,
        updateLocation,
        addShipments,
        addVehicle,
        addSolution,
      }}
    >
      {children}
    </VehicleRoutingContext.Provider>
  );
};
