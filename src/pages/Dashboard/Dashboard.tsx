import { useEffect, useRef, useState } from "react";

import { mapBoxGlInit, MapRef } from "../../mapbox";
import * as Styled from "./styles.ts";

export const Dashboard = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapRef>(null); // Set the type of map ref
  const [zoom, setZoom] = useState<number>(16.38);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once
    map.current = mapBoxGlInit({ zoom, mapHTMLElement: mapContainer.current! });

    map.current.on("move", () => {
      if (map.current) {
        setZoom(Number(map.current.getZoom().toFixed(2)));
      }
    });
  }, [zoom]);

  return (
    <Styled.MapWrapper>
      <div className="sidebar">Zoom: {zoom}</div>
      <div ref={mapContainer} className="map-container" />
    </Styled.MapWrapper>
  );
};
