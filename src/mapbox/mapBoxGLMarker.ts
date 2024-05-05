import mapBoxGl, { LngLatLike, Popup } from "mapbox-gl";

import { MapRef } from "./mapBoxGL.ts";

type TMapBoxGlMarker = {
  location: LngLatLike;
  map: MapRef;
  isDraggable?: boolean;
  popUp?: Popup;
};

export const mapBoxGLMarker = ({ location, map, isDraggable = false, popUp }: TMapBoxGlMarker) => {
  if (!map) return;
  return new mapBoxGl.Marker({ draggable: isDraggable, color: "var(--primary-color)" })
    .setLngLat(location)
    .setPopup(popUp)
    .addTo(map);
};
