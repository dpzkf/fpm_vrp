import { useEffect, useRef } from "react";

import { TITLE_LOGO_ICO } from "@assets/icons";

import { mapBoxGLGeocoder, mapBoxGlInit, MapRef } from "../../mapbox";
import * as Styled from "./styles.ts";

export const Dashboard = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapRef>(null); // Set the type of map ref

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // initialize map only once
    map.current = mapBoxGlInit({ mapHTMLElement: mapContainer.current });

    map.current.on("load", async () => {
      if (!map.current) return;

      const geocoder = mapBoxGLGeocoder();

      map.current.addControl(geocoder);
    });
  }, []);

  return (
    <Styled.MapWrapper>
      <div ref={mapContainer} className="map-container" />
      <Styled.LogoWrapper>
        <TITLE_LOGO_ICO />
      </Styled.LogoWrapper>
    </Styled.MapWrapper>
  );
};
