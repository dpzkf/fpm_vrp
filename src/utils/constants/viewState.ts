import { ViewState } from "react-map-gl";

const LNG = 35.039749;
const LAT = 48.432777;

const PITCH = 55.5;
const ZOOM = 16.38;

export const VIEW_STATE: Partial<ViewState> = {
  latitude: LAT,
  longitude: LNG,
  zoom: ZOOM,
  pitch: PITCH,
};
