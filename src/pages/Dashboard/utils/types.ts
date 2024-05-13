import { ViewState } from "react-map-gl";

export type TViewState = Partial<ViewState>;

export type TMarkers = {
  longitude: number;
  latitude: number;
  name: string;
};
