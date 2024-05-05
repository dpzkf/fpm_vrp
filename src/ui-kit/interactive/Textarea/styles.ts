import { Textarea as TextareaLib } from "@mantine/core";

import styled from "styled-components";

export const Textarea = styled(TextareaLib)`
  display: flex;
  justify-content: space-between;
  padding-right: 2px;

  .mantine-Textarea-label {
    color: var(--primary-text-color);
    font: var(--font-l);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .mantine-Textarea-input {
    width: 360px;
    height: 72px;

    font: var(--font-l);
    font-weight: 400;
    padding: 6px 14px;
    box-sizing: border-box;
    height: unset;
    line-height: 29px;
    color: var(--text-inputs);
  }

  & .mantine-Textarea-input[data-invalid] {
    color: var(--primary-color);
    border: 1px solid #eda2a2;
  }
`;
