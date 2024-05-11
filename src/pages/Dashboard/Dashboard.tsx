import { useState } from "react";
import InteractiveMap, { Layer, MapLayerMouseEvent, Marker, MarkerDragEvent, Source, ViewState } from "react-map-gl";

import { TITLE_LOGO_ICO } from "@assets/icons";

import { Feature, feature } from "@turf/helpers";
import { VIEW_STATE } from "@utils/constants.ts";

import * as Styled from "./styles.ts";

type TViewState = Partial<ViewState>;

type TMarkers = {
  longitude: number;
  latitude: number;
  isWareHouse: boolean;
};

export const Dashboard = () => {
  const [viewState, setViewState] = useState<TViewState>(VIEW_STATE);
  const [markers, setMarkers] = useState<TMarkers[]>([]);
  const [isWareHouse, setIsWareHouse] = useState<boolean>(true);

  const generateLineString = (): Feature => {
    if (markers.length < 2) {
      return null;
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

  const handleClick = (e: MapLayerMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setMarkers((markers) => [...markers, { longitude: lng, latitude: lat, isWareHouse }]);

    if (isWareHouse) {
      setIsWareHouse(false);
    }
  };

  const handleDrag = (e: MarkerDragEvent, index: number) => {
    const { lng, lat } = e.lngLat;
    const updatedMarkers = [...markers];
    updatedMarkers[index] = { ...markers[index], longitude: lng, latitude: lat };
    setMarkers(updatedMarkers);
  };

  return (
    <>
      <Styled.MapWrapper>
        <InteractiveMap
          reuseMaps
          mapLib={import("mapbox-gl")}
          style={{ width: "100dvw", height: "100dvh" }}
          mapStyle={import.meta.env.VITE_BASE_MAPBOX_STYLE || ""}
          mapboxAccessToken={import.meta.env.VITE_BASE_MAPBOX_TOKEN || ""}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleClick}
          {...viewState}
        >
          {markers.map((marker, index) => (
            <Marker
              {...marker}
              draggable
              onDragEnd={(e) => handleDrag(e, index)}
              color={marker.isWareHouse ? "var(--warehouse-color)" : undefined}
              key={`marker-${index}`}
            />
          ))}
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
                "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
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
        </InteractiveMap>
        <Styled.LogoWrapper>
          <TITLE_LOGO_ICO />
        </Styled.LogoWrapper>
      </Styled.MapWrapper>
    </>
  );
};
