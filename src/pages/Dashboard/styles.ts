import styled from "styled-components";

export const Wrapper = styled.main`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
`;

export const SideBarWrapper = styled.aside`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-shadow: 3px 0 10px -8px #000;
  background-color: var(--bg-sidebar);

  min-width: 500px;
  flex: 2.2;
`;

export const MapWrapper = styled.section`
  flex: 4 1;
  position: relative;

  .mapboxgl-popup-content {
    padding: 10px 20px;
  }
`;
