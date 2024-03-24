import styled from "styled-components";
import { Checkbox as CheckboxLib } from "@mantine/core";

export const Checkbox = styled(CheckboxLib)`
  .mantine-Checkbox-input {
    border-radius: 0;
    cursor: pointer;
    border-radius: var(--rounded-xs);
  }

  & .mantine-Checkbox-body {
    align-items: center;
  }

  & .mantine-Checkbox-label {
    font-weight: 400;
    color: var(--primary-text-color);
    cursor: pointer;
  }

  & .mantine-Checkbox-input:checked {
    background-color: var(--gray-700);
    border-color: var(--gray-700);
  }

  & .mantine-Checkbox-input {
    cursor: pointer;
  }
`;
