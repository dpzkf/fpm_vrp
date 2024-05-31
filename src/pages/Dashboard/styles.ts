import styled from "styled-components";

export const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
`;

export const MapWrapper = styled.section`
  flex: 4 1;
  position: relative;

  .mapboxgl-popup {
    max-width: 400px;
  }
`;
