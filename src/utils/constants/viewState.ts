import { ViewState } from "react-map-gl";

const LNG = 35.039749;
const LAT = 48.432777;

const PITCH = 0;
const ZOOM = 14;

export const VIEW_STATE: Partial<ViewState> = {
  latitude: LAT,
  longitude: LNG,
  zoom: ZOOM,
  pitch: PITCH,
};
