import { createContext, FC, PropsWithChildren, useCallback, useMemo, useState } from "react";

import { TDirection, TShipments, TVehicles } from "@app/modules";

import { ActiveTabs } from "@components/Sidebar";
import polyline from "@mapbox/polyline";
import { v4 as uuidv4 } from "uuid";

import { LocationType, TLocation } from "../types";
import {
  TContextDirections,
  TContextLocations,
  TContextShipments,
  TContextVehicles,
  TVehicleRoutingContext,
} from "./types.ts";
import { updateState } from "./utiils";

export const VehicleRoutingContext = createContext<TVehicleRoutingContext | null>(null);

export const VehicleRoutingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTabs>(ActiveTabs.LOCATIONS_WAREHOUSES);
  const [locations, setLocations] = useState<TContextLocations>([
    {
      name: "Перша Дачна Вулиця 80",
      coordinates: [35.0369429788974, 48.428788936916646],
      id: uuidv4(),
      type: LocationType.WAREHOUSE,
    },
    {
      name: "Сєрова Вулиця 2",
      coordinates: [35.03710623364512, 48.46818956311154],
      type: LocationType.DROP_OFF,
      id: uuidv4(),
    },
    {
      name: "location_1",
      coordinates: [35.0702, 48.452277],
      type: LocationType.DROP_OFF,
      id: uuidv4(),
    },
  ]);
  const [shipments, setShipments] = useState<TContextShipments>([
    {
      id: uuidv4(),
      name: "0",
      from: "Перша Дачна Вулиця 80",
      to: "Сєрова Вулиця 2",
      size: { boxes: 1 },
    },
    {
      id: uuidv4(),
      name: "1",
      from: "Перша Дачна Вулиця 80",
      to: "location_1",
      size: { boxes: 1 },
    },
  ]);
  const [vehicles, setVehicles] = useState<TContextVehicles>([
    {
      id: uuidv4(),
      name: "0",
      capacities: { boxes: 1 },
    },
    { id: uuidv4(), name: "1", capacities: { boxes: 1 } },
  ]);
  const [directions, setDirections] = useState<TContextDirections>([]);

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

  const updateVehicle = useCallback((id: string, vehicle: Partial<TVehicles>) => {
    setVehicles((prevState) => updateState(prevState, id, vehicle));
  }, []);

  const deleteVehicle = useCallback((id: string) => {
    setVehicles((prevState) => prevState.filter((el) => el.id !== id));
  }, []);

  const addDirection = useCallback((direction: TDirection[]) => {
    setDirections(
      direction.map((el, index) => ({
        ...el,
        routes: polyline.toGeoJSON(el.routes[0].geometry, 6),
        isActive: !index,
      })),
    );
  }, []);

  const updateDirection = useCallback((activeDirectionIndex: number) => {
    setDirections((prevState) =>
      prevState.map((item, index) => ({
        ...item,
        isActive: index === activeDirectionIndex,
      })),
    );
  }, []);

  const getWarehouses = useCallback(() => {
    return [...new Set(locations.filter(({ type }) => type === LocationType.WAREHOUSE).map(({ name }) => name))];
  }, [locations]);

  const getDropOffs = useCallback(() => {
    return [...new Set(locations.filter(({ type }) => type === LocationType.DROP_OFF).map(({ name }) => name))];
  }, [locations]);

  const contextValue = useMemo(
    () => ({
      activeTab,
      locations,
      shipments,
      vehicles,
      directions,
      changeActiveTab,
      addLocation,
      updateLocation,
      deleteLocation,
      addShipment,
      updateShipment,
      deleteShipment,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      addDirection,
      updateDirection,
      getDropOffs,
      getWarehouses,
    }),
    [
      activeTab,
      locations,
      shipments,
      vehicles,
      directions,
      changeActiveTab,
      addLocation,
      updateLocation,
      deleteLocation,
      addShipment,
      updateShipment,
      deleteShipment,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      addDirection,
      updateDirection,
      getDropOffs,
      getWarehouses,
    ],
  );

  return <VehicleRoutingContext.Provider value={contextValue}>{children}</VehicleRoutingContext.Provider>;
};
