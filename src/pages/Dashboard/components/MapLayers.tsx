import { FC } from "react";
import { Layer, Source } from "react-map-gl";

import { Feature, FeatureCollection, Geometry } from "@turf/helpers";
import { TResolvedCoordinates } from "types";

type TMapLayers = {
  data: FeatureCollection<Geometry> | Feature<Geometry>;
  resolvedStops: TResolvedCoordinates[] | null;
};

export const MapLayers: FC<TMapLayers> = ({ data, resolvedStops }) => {
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((feature, index) => (
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
        ))}
        {resolvedStops?.map(({ stops, stopNumber }, index) => (
          <Source key={`stopsLayer-${index}`} id={`stopsLayer-${index}`} type="geojson" data={stops}>
            <Layer
              id={`circleLayer-${index}`}
              type="circle"
              paint={{
                "circle-radius": 20,
                "circle-color": "white",
                "circle-stroke-color": "#3887be",
                "circle-stroke-width": 3,
              }}
            />
            <Layer
              id={`symbolLayer-${index}`}
              type="symbol"
              layout={{
                "text-field": String(stopNumber),
                "text-size": 14,
              }}
              paint={{
                "text-color": "black",
              }}
            />
          </Source>
        ))}
      </>
    );
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
