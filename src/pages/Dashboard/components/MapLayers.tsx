import { FC } from "react";
import { Layer, Source } from "react-map-gl";

type TMapLayers = {
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry> | GeoJSON.Feature<GeoJSON.Geometry>;
};

export const MapLayers: FC<TMapLayers> = ({ data }) => {
  return (
    <Source id="polylineLayer" type="geojson" data={data}>
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
  );
};
