import mapBoxGl from "mapbox-gl";

type TMapBoxGlMarker = {
  text?: string;
};

export const mapBoxGLPopUp = ({ text }: TMapBoxGlMarker) => {
  if (!text) return;
  return new mapBoxGl.Popup({ offset: 25 }).setText(text);
};
