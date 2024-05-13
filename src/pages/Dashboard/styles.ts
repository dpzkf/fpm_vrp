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
  margin-left: 48px;

  ${IS_MOBILE} {
    margin-left: unset;
    left: unset;
    right: 0;
  }
`;
export const ButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 50%;

  transform: translateX(-50%);
  margin-bottom: 12px;
`;
