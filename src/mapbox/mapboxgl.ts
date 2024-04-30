import mapboxgl from "mapbox-gl";

import { LAT, LNG, PITCH } from "./constants.ts";

// Define the type for the map reference
export type MapRef = mapboxgl.Map | null;

type TMapBoxGl = {
  mapHTMLElement: HTMLElement;
  zoom: number;
};

mapboxgl.accessToken = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";

export const mapBoxGlInit = ({ mapHTMLElement, zoom }: TMapBoxGl) => {
  return new mapboxgl.Map({
    container: mapHTMLElement,
    style: import.meta.env.VITE_BASE_MAPBOX_STYLE || "",
    center: [LNG, LAT],
    pitch: PITCH,
    zoom: zoom,
  });
};
