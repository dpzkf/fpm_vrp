import styled from "styled-components";

export const ButtonWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  border-top: 1px solid #ddd;

  @media (width < 1024px) {
    padding: 8px 0;
  }
`;

export const HintWrapper = styled.div`
  border-radius: 8px;
  padding: 4px 8px;
  background-color: color-mix(in srgb, var(--primary-color) 25%, var(--bg-sidebar));
`;
