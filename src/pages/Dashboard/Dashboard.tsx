import { useCallback, useContext, useEffect, useRef, useState } from "react";
import InteractiveMap, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl";

import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useToast } from "@hooks/common/useToast";

import {
  useLazyGetResolvedVehicleRoutingProblemQuery,
  useLazyGetReverseGeocodingQuery,
  useSubmitVehicleRoutingProblemMutation,
} from "@app/modules";
import { useGetDirectionsQuery } from "@app/modules/directions";
import { isRetrieveRoutingProblemResponseWithStatus } from "@app/modules/optimization/utils";

import { ActiveTabs, Sidebar } from "@components/Sidebar";
import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import polyline from "@mapbox/polyline";
import { feature, featureCollection } from "@turf/helpers";
import { MAX_DROP_OFFS, MAX_PICKUP, VIEW_STATE } from "@utils/constants";
import uniqueId from "lodash.uniqueid";
import { v4 as uuidv4 } from "uuid";

import { LocationType, TLocation } from "../../types";
import * as Styled from "./styles.ts";
import { adaptDirectionsData, adaptSubmitData, TViewState } from "./utils";

export const Dashboard = () => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState<TViewState>(VIEW_STATE);
  const [shouldRetry, setShouldRetry] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [isLoadingOverlayVisible, { toggle: toggleLoadingOverlay }] = useDisclosure(false);
  const {
    activeTab,
    addLocation,
    locations,
    updateLocation,
    shipments,
    getDropOffs,
    getWarehouses,
    vehicles,
    changeActiveTab,
  } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;

  const [submitVrp, { data: submitVrpData }] = useSubmitVehicleRoutingProblemMutation();
  const [triggerResolvedVrp, { data: resolvedVrpData }] = useLazyGetResolvedVehicleRoutingProblemQuery();
  const [triggerReverseGeocoding] = useLazyGetReverseGeocodingQuery();

  const { data: directionsData } = useGetDirectionsQuery(
    { waypoints: adaptDirectionsData(resolvedVrpData?.routes?.[0]) },
    { skip: !resolvedVrpData || isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData) },
  );

  const { toastError } = useToast();

  const handleGetResolvedVrp = async () => {
    if (!submitVrpData) return;
    const res = await triggerResolvedVrp({ id: submitVrpData.id }).unwrap();
    if (isRetrieveRoutingProblemResponseWithStatus(res)) {
      return setShouldRetry((prevState) => !prevState);
    }
    changeActiveTab(ActiveTabs.SOLUTION);
    toggleLoadingOverlay();
    setSubmittedData({ locations, vehicles, shipments });
  };

  useEffect(() => {
    if (!submitVrpData) return;
    const timeoutId = setTimeout(handleGetResolvedVrp, 3000);
    return () => clearTimeout(timeoutId);
  }, [submitVrpData?.id, shouldRetry]);

  const generateLineString = useCallback(() => {
    if (directionsData && activeTab === ActiveTabs.SOLUTION) {
      return featureCollection([feature(polyline.toGeoJSON(directionsData.routes[0].geometry, 6))]);
    }

    if (!shipments) return;

    const coordinates = shipments.reduce((acc: number[][][], shipment) => {
      const fromCoordinates = locations.find((location) => location.name === shipment.from)?.coordinates;
      const toCoordinates = locations.find((location) => location.name === shipment.to)?.coordinates;
      if (fromCoordinates && toCoordinates) {
        acc.push([fromCoordinates, toCoordinates]);
      }
      return acc;
    }, []);

    const geometry = {
      type: "MultiLineString",
      coordinates,
    };

    return feature(geometry);
  }, [shipments, locations, directionsData, activeTab]);

  const handleSetMarker = async (e: MapLayerMouseEvent) => {
    if (activeTab !== ActiveTabs.LOCATIONS_DROP_OFFS && activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES) return;

    if (
      (getWarehouses().length >= MAX_PICKUP && activeTab === ActiveTabs.LOCATIONS_WAREHOUSES) ||
      (getDropOffs().length >= MAX_DROP_OFFS && activeTab === ActiveTabs.LOCATIONS_DROP_OFFS)
    ) {
      return toastError("Досягнут ліміт");
    }

    const { lng, lat } = e.lngLat;
    const locationName = uniqueId("location-");
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();

    const newLocation: TLocation = {
      coordinates: [lng, lat],
      name: response?.properties?.name || locationName,
      id: uuidv4(),
      type: activeTab === ActiveTabs.LOCATIONS_WAREHOUSES ? LocationType.WAREHOUSE : LocationType.DROP_OFF,
    };
    addLocation(newLocation);
  };

  const handleDrag = async (e: MarkerDragEvent, locationId: string) => {
    const { lng, lat } = e.lngLat;
    const updatedLocation: Partial<TLocation> = { coordinates: [lng, lat] };
    updateLocation(locationId, updatedLocation);

    const locationName = uniqueId("location-");
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();
    updateLocation(locationId, { name: response?.properties?.name || locationName });
  };

  const handleFindSolution = async () => {
    toggleLoadingOverlay();
    await submitVrp(adaptSubmitData(locations, shipments, vehicles)).unwrap();
  };

  return (
    <Styled.Wrapper>
      <LoadingOverlay visible={isLoadingOverlayVisible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Sidebar handleFindSolution={handleFindSolution} solution={resolvedVrpData} submittedData={submittedData} />
      <Styled.MapWrapper>
        <InteractiveMap
          reuseMaps
          ref={mapRef}
          mapLib={import("mapbox-gl")}
          style={{ width: "100%", height: "100dvh" }}
          mapStyle={import.meta.env.VITE_BASE_MAPBOX_STYLE || ""}
          projection={{ name: "globe" }}
          mapboxAccessToken={import.meta.env.VITE_BASE_MAPBOX_TOKEN || ""}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleSetMarker}
          {...viewState}
        >
          <GeolocateControl position="top-right" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" showCompass={false} />
          <ScaleControl />
          {locations.map(({ coordinates, id, type }) => (
            <Marker
              key={id}
              longitude={coordinates[0]}
              latitude={coordinates[1]}
              draggable={activeTab === ActiveTabs.LOCATIONS_WAREHOUSES || activeTab === ActiveTabs.LOCATIONS_DROP_OFFS}
              onDragEnd={(e) => handleDrag(e, id)}
              color={type === LocationType.WAREHOUSE ? "var(--warehouse-color)" : "var(--primary-color)"}
            />
          ))}
          {activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES && activeTab !== ActiveTabs.LOCATIONS_DROP_OFFS && (
            <Source id="polylineLayer" type="geojson" data={generateLineString()}>
              <Layer
                id="lineLayer"
                type="line"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "rgba(3, 170, 238, 0.5)",
                  "line-width": 5,
                }}
              />
              <Layer
                id="routearrows"
                type="symbol"
                layout={{
                  "symbol-placement": "line",
                  "text-field": "▶",
                  "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 28],
                  "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 12, 30, 22, 160],
                  "text-keep-upright": false,
                }}
                paint={{
                  "text-color": "#3887be",
                  "text-halo-color": "hsl(55, 11%, 96%)",
                  "text-halo-width": 3,
                }}
              />
            </Source>
          )}
        </InteractiveMap>
      </Styled.MapWrapper>
    </Styled.Wrapper>
  );
};
