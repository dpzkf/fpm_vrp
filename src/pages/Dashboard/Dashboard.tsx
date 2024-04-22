import { useEffect, useRef, useState } from "react";

import mapboxgl from "mapbox-gl";

import * as Styled from "./styles.ts";

// Define the type for the map reference
type MapRef = mapboxgl.Map | null;

mapboxgl.accessToken = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";

export const Dashboard = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapRef>(null); // Set the type of map ref
  const [lng, setLng] = useState<number>(35.03904499491742);
  const [lat, setLat] = useState<number>(48.434484157775294);
  const [zoom, setZoom] = useState<number>(14);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      if (map.current) {
        setLng(Number(map.current.getCenter().lng.toFixed(4)));
        setLat(Number(map.current.getCenter().lat.toFixed(4)));
        setZoom(Number(map.current.getZoom().toFixed(2)));
      }
    });

    // Clean up function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lng, lat, zoom]);

  return (
    <Styled.MapWrapper>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </Styled.MapWrapper>
  );
};
