import { IS_MOBILE } from "@assets/styles/layout.ts";

import styled from "styled-components";

export const MapWrapper = styled.div`
  height: 100%;

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

  ${IS_MOBILE} {
    top: unset;
    bottom: 0;
    margin-bottom: 28px;
  }
`;
export const ContentWrapper = styled.div``;
