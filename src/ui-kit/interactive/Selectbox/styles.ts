import { Select } from "@mantine/core";

import styled from "styled-components";

export const Selectbox = styled(Select)`
  display: flex;
  justify-content: space-between;
  padding-right: 2px;
  align-items: center;

  .mantine-Select-label {
    color: var(--primary-text-color);
    font: var(--font-l);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .mantine-Select-wrapper {
    flex-grow: 1;
    max-width: 360px;
  }

  .mantine-Select-input {
    width: 100%;
    font: var(--font-l);
    font-weight: 400;
    padding: 6px 14px;
    box-sizing: border-box;
    height: unset;
    line-height: 29px;
    color: var(--text-inputs);
  }
`;
