import { Radio } from "@mantine/core";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  & label {
    color: var(--primary-text-color);
    font: var(--font-l);
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  & .mantine-Radio-radio {
    cursor: pointer;
  }
`;
