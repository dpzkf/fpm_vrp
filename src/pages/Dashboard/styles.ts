import styled from "styled-components";

export const MapWrapper = styled.div`
  .map-container {
    height: 100dvh;
  }

  .mapboxgl-marker {
    cursor: pointer;
  }

  .mapboxgl-popup {
    max-width: 400px;
  }
`;

export const LogoWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 12px;
`;
