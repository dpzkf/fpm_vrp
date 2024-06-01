import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { Feature, FeatureCollection, Geometry } from "@turf/helpers";

type TMapLayers = {
  data: FeatureCollection<Geometry> | Feature<Geometry>;
};

export const MapLayers: FC<TMapLayers> = ({ data }) => {
  if (Array.isArray(data)) {
    return data.map((feature, index) => (
      <Source key={`polylineLayer-${index}`} id={`polylineLayer-${index}`} type="geojson" data={feature}>
        <Layer
          id={`lineLayer-${index}`}
          type="line"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": feature.properties?.color,
            "line-opacity": 1,
            "line-width": feature.properties?.width,
          }}
        />
        <Layer
          id={`routearrows-${index}`}
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
    ));
  }
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
          "line-width": 3,
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
