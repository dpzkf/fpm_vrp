import * as React from "react";
import { createContext, PropsWithChildren, useState } from "react";

import { TShipments, TVehicles } from "@app/modules";
import { TDirection } from "@app/modules/directions";

import { ActiveTabs } from "@components/Sidebar";
import uniqueId from "lodash.uniqueid";

import { LocationType, TLocation } from "../types";
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
  const [locations, setLocations] = useState<TContextLocations>([
    {
      name: "Перша Дачна Вулиця 80",
      coordinates: [35.0369429788974, 48.428788936916646],
      id: uniqueId("location-warehouse_"),
      type: LocationType.WAREHOUSE,
    },
    {
      name: "Сєрова Вулиця 2",
      coordinates: [35.03710623364512, 48.46818956311154],
      type: LocationType.DROP_OFF,
      id: uniqueId("location-drop-off_"),
    },
  ]);
  const [shipments, setShipments] = useState<TContextShipments>([]);
  const [vehicles, setVehicles] = useState<TContextVehicles>([]);
  const [solution, setSolution] = useState<TContextSolution>(null);

  const addLocation = (location: TLocation) => {
    setLocations((prevState) => [...prevState, { ...location }]);
  };
  const updateLocation = (id: string, location: Partial<TLocation>) => {
    const locationIndex = locations.findIndex((location) => location.id === id);

    if (locationIndex !== -1) {
      const updatedLocations = [...locations];
      updatedLocations[locationIndex] = { ...updatedLocations[locationIndex], ...location };
      setLocations(updatedLocations);
    }
  };
  const deleteLocation = (id: string) => {
    setLocations((prevState) => prevState.filter((el) => el.id !== id));
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
        deleteLocation,
        addShipments,
        addVehicle,
        addSolution,
      }}
    >
      {children}
    </VehicleRoutingContext.Provider>
  );
};
