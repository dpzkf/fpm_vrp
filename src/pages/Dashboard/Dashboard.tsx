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
import { VIEW_STATE } from "@utils/constants";
import uniqueId from "lodash.uniqueid";

import { LocationType, TLocation } from "../../types";
import * as Styled from "./styles.ts";
import { adaptDirectionsData, adaptSubmitData, TViewState } from "./utils";

export const Dashboard = () => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState<TViewState>(VIEW_STATE);
  const { activeTab, addLocation, locations, updateLocation, shipments } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const [submitVrp, { data: submitVrpData, isLoading: submitVrpIsLoading }] = useSubmitVehicleRoutingProblemMutation();
  const [triggerResolvedVrp, { data: resolvedVrpData, isFetching: resolvedVrpDataIsLoading }] =
    useLazyGetResolvedVehicleRoutingProblemQuery();
  const [triggerReverseGeocoding] = useLazyGetReverseGeocodingQuery();

  const { data: directionsData } = useGetDirectionsQuery(
    { waypoints: adaptDirectionsData(resolvedVrpData?.routes[0]) },
    { skip: !resolvedVrpData || isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData) },
  );

  const handleGetResolvedVrp = useCallback(async () => {
    if (resolvedVrpData || !submitVrpData) return;
    await triggerResolvedVrp({ id: submitVrpData.id }).unwrap();
  }, [resolvedVrpData, submitVrpData, triggerResolvedVrp]);

  useEffect(() => {
    if (submitVrpIsLoading || resolvedVrpDataIsLoading || !submitVrpData) return;

    let timeoutId: NodeJS.Timeout;
    if (isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData)) {
      timeoutId = setTimeout(handleGetResolvedVrp, 3000);
    } else {
      handleGetResolvedVrp();
    }

    return () => clearTimeout(timeoutId);
  }, [submitVrpIsLoading, resolvedVrpDataIsLoading, submitVrpData, resolvedVrpData, handleGetResolvedVrp]);

  const generateLineString = useCallback(() => {
    if (directionsData) {
      return featureCollection([feature(polyline.toGeoJSON(directionsData.routes[0].geometry, 6))]);
    }

    if (!shipments) return;

    const coordinates = shipments.reduce((acc: number[][][], shipment) => {
      const fromCoord = locations.find((location) => location.name === shipment.from)?.coordinates;
      const toCoord = locations.find((location) => location.name === shipment.to)?.coordinates;
      if (fromCoord && toCoord) {
        acc.push([fromCoord, toCoord]);
      }
      return acc;
    }, []);

    const geometry = {
      type: "MultiLineString",
      coordinates,
    };

    return feature(geometry);
  }, [shipments, locations, directionsData, activeTab]);

  const handleClick = async (e: MapLayerMouseEvent) => {
    if (activeTab !== ActiveTabs.LOCATIONS_DROP_OFFS && activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES) return;

    const { lng, lat } = e.lngLat;
    const locationId = uniqueId("location_");
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();

    const newLocation: TLocation = {
      coordinates: [lng, lat],
      name: response?.properties?.name || locationId,
      id: locationId,
      type: activeTab === ActiveTabs.LOCATIONS_WAREHOUSES ? LocationType.WAREHOUSE : LocationType.DROP_OFF,
    };
    addLocation(newLocation);
  };

  const handleDrag = useCallback(
    async (e: MarkerDragEvent, locationId: string) => {
      const { lng, lat } = e.lngLat;
      const updatedLocation: Partial<TLocation> = { coordinates: [lng, lat] };
      updateLocation(locationId, updatedLocation);

      const {
        features: [response],
      } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();
      updateLocation(locationId, { name: response?.properties?.name || locationId });
    },
    [updateLocation, triggerReverseGeocoding],
  );

  const findSolution = async () => {
    await submitVrp(adaptSubmitData(locations)).unwrap();
  };

  return (
    <Styled.Wrapper>
      <Sidebar />
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
          onClick={handleClick}
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
