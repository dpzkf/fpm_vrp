import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;

  & input {
    border-radius: var(--rounded-xs);
    font: var(--font-l);
    font-weight: 400;
    padding: 6px 40px;
    box-sizing: border-box;
    height: unset;
    line-height: 29px;
    color: var(--text-inputs);
  }

  & .mantine-Input-wrapper {
    border-radius: var(--rounded-s);
    height: 42px;
  }

  & .mantine-Input-section > svg {
    color: var(--grey-icon);
  }
`;
