import mapBoxGl from "mapbox-gl";

import { LNG_LAT, PITCH, ZOOM } from "./constants.ts";

// Define the type for the map reference
export type MapRef = mapBoxGl.Map | null;

type TMapBoxGl = {
  mapHTMLElement: HTMLElement;
};

mapBoxGl.accessToken = import.meta.env.VITE_BASE_MAPBOX_TOKEN || "";

export const mapBoxGlInit = ({ mapHTMLElement }: TMapBoxGl) => {
  return new mapBoxGl.Map({
    container: mapHTMLElement,
    style: import.meta.env.VITE_BASE_MAPBOX_STYLE || "",
    center: LNG_LAT,
    pitch: PITCH,
    zoom: ZOOM,
  });
};
