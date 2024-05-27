import { useEffect, useRef, useState } from "react";
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

import { Flex } from "@mantine/core";

import { Button } from "@ui/interactive/Button";

import { TITLE_LOGO_ICO } from "@assets/icons";

import {
  useLazyGetResolvedVehicleRoutingProblemQuery,
  useLazyGetReverseGeocodingQuery,
  useSubmitVehicleRoutingProblemMutation,
} from "@app/modules";
import { useGetDirectionsQuery } from "@app/modules/directions";
import { isRetrieveRoutingProblemResponseWithStatus } from "@app/modules/optimization/utils";

import polyline from "@mapbox/polyline";
import { feature, featureCollection } from "@turf/helpers";
import { VIEW_STATE } from "@utils/constants.ts";
import uniqueId from "lodash.uniqueid";

import * as Styled from "./styles.ts";
import { adaptDirectionsData, adaptSubmitData, TMarkers, TViewState } from "./utils";

export const Dashboard = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [viewState, setViewState] = useState<TViewState>(VIEW_STATE);
  const [markers, setMarkers] = useState<TMarkers[]>([]);

  const [submitVrp, { data: submitVrpData, isLoading: submitVrpIsLoading }] = useSubmitVehicleRoutingProblemMutation();
  const [triggerResolvedVrp, { data: resolvedVrpData, isFetching: resolvedVrpDataIsLoading }] =
    useLazyGetResolvedVehicleRoutingProblemQuery();
  const [triggerReverseGeocoding] = useLazyGetReverseGeocodingQuery();

  const { data: directionsData } = useGetDirectionsQuery(
    { waypoints: adaptDirectionsData(resolvedVrpData?.routes[0]) },
    { skip: !resolvedVrpData || isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData) },
  );

  const handleGetResolvedVrp = async () => {
    if (resolvedVrpData || !submitVrpData) return;
    await triggerResolvedVrp({ id: submitVrpData.id }).unwrap();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (submitVrpIsLoading || resolvedVrpDataIsLoading) return;

    if (!submitVrpData) return;

    if (isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData)) {
      timeoutId = setTimeout(handleGetResolvedVrp, 3000);
    } else {
      handleGetResolvedVrp();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [submitVrpIsLoading, resolvedVrpDataIsLoading]);

  const generateLineString = () => {
    if (directionsData) {
      return featureCollection([feature(polyline.toGeoJSON(directionsData.routes[0].geometry, 6))]);
    }
    const coordinates = markers.slice(1).reduce((acc: number[][][], marker) => {
      acc.push([
        [markers[0].longitude, markers[0].latitude],
        [marker.longitude, marker.latitude],
      ]);
      return acc;
    }, []);

    const geometry = {
      type: "MultiLineString",
      coordinates,
    };
    return feature(geometry);
  };

  const handleClick = async (e: MapLayerMouseEvent) => {
    if (markers.length > 7) return;

    if (resolvedVrpData) return;

    const { lng, lat } = e.lngLat;
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();
    setMarkers((markers) => [
      ...markers,
      { longitude: lng, latitude: lat, name: response?.properties?.name || uniqueId("location_") },
    ]);
  };

  const handleDrag = (e: MarkerDragEvent, index: number) => {
    const { lng, lat } = e.lngLat;
    const updatedMarkers = [...markers];
    updatedMarkers[index] = { ...markers[index], longitude: lng, latitude: lat };
    setMarkers(updatedMarkers);
  };

  const findSolution = async () => {
    await submitVrp(adaptSubmitData(markers)).unwrap();
  };

  return (
    <>
      <Styled.MapWrapper>
        <InteractiveMap
          reuseMaps
          ref={mapRef}
          mapLib={import("mapbox-gl")}
          style={{ width: "100dvw", height: "100dvh" }}
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
          {markers.map((marker, index) => (
            <Marker
              {...marker}
              draggable={!resolvedVrpData}
              onDragEnd={(e) => handleDrag(e, index)}
              color={!index ? "var(--warehouse-color)" : undefined}
              key={`marker-${index}`}
            />
          ))}
          {markers.length > 1 && (
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
        <Styled.LogoWrapper>
          <TITLE_LOGO_ICO />
        </Styled.LogoWrapper>
        <Styled.ButtonWrapper>
          <Flex gap={16} align="center" justify="center" display="flex">
            {markers.length > 1 && (
              <div>
                <Button disabled={!!resolvedVrpData || resolvedVrpDataIsLoading} onClick={findSolution}>
                  Знайти рішення
                </Button>
              </div>
            )}
            {!!markers.length && (
              <div>
                <Button
                  disabled={!!resolvedVrpData || resolvedVrpDataIsLoading}
                  onClick={() => {
                    setMarkers([]);
                  }}
                >
                  Видалити маркери
                </Button>
              </div>
            )}
          </Flex>
        </Styled.ButtonWrapper>
      </Styled.MapWrapper>
    </>
  );
};
