import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapBoxGl from "mapbox-gl";

export const mapBoxGLGeocoder = () => {
  return new MapboxGeocoder({
    accessToken: mapBoxGl.accessToken,
    marker: false,
    mapboxgl: mapBoxGl,
  });
};
