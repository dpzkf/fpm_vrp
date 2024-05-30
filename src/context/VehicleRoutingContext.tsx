import * as React from "react";
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";

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
import { updateState } from "./utiils";

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

  const changeActiveTab = useCallback((tab: ActiveTabs) => {
    setActiveTab(tab);
  }, []);

  const addLocation = useCallback((location: TLocation) => {
    setLocations((prevState) => [...prevState, location]);
  }, []);

  const updateLocation = useCallback((id: string, location: Partial<TLocation>) => {
    setLocations((prevState) => updateState(prevState, id, location));
  }, []);

  const deleteLocation = useCallback((id: string) => {
    setLocations((prevState) => prevState.filter((el) => el.id !== id));
  }, []);

  const addShipment = useCallback((shipment: TShipments) => {
    setShipments((prevState) => [...prevState, shipment]);
  }, []);

  const updateShipment = useCallback((id: string, shipment: Partial<TShipments>) => {
    setShipments((prevState) => updateState(prevState, id, shipment));
  }, []);

  const deleteShipment = useCallback((id: string) => {
    setShipments((prevState) => prevState.filter((el) => el.id !== id));
  }, []);

  const addVehicle = useCallback((vehicle: TVehicles) => {
    setVehicles((prevState) => [...prevState, vehicle]);
  }, []);

  const addSolution = useCallback((solution: TDirection) => {
    setSolution(solution);
  }, []);

  const getWarehouses = useCallback(() => {
    return locations.filter(({ type }) => type === LocationType.WAREHOUSE).map(({ name }) => name);
  }, [locations]);

  const getDropOffs = useCallback(() => {
    return locations.filter(({ type }) => type === LocationType.DROP_OFF).map(({ name }) => name);
  }, [locations]);

  const contextValue = useMemo(
    () => ({
      activeTab,
      locations,
      shipments,
      vehicles,
      solution,
      changeActiveTab,
      addLocation,
      updateLocation,
      deleteLocation,
      addShipment,
      updateShipment,
      deleteShipment,
      addVehicle,
      addSolution,
      getDropOffs,
      getWarehouses,
    }),
    [
      activeTab,
      locations,
      shipments,
      vehicles,
      solution,
      changeActiveTab,
      addLocation,
      updateLocation,
      deleteLocation,
      addShipment,
      updateShipment,
      deleteShipment,
      addVehicle,
      addSolution,
      getDropOffs,
      getWarehouses,
    ],
  );

  return <VehicleRoutingContext.Provider value={contextValue}>{children}</VehicleRoutingContext.Provider>;
};
