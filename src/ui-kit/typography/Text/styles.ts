import { Text as TextLib } from "@mantine/core";

import styled, { css } from "styled-components";

export type TText = {
  $textSize: number;
  $bulletColor: string;
};

export const Text = styled(TextLib)<TText>`
  font-family: var(--font-family-main);
  font-size: ${({ $textSize }) => `${$textSize / 16}rem`};
  line-height: 135%;

  color: var(--primary-text-color);

  ${({ $bulletColor }) =>
    $bulletColor &&
    css`
      &::before {
        content: "⏺";
        padding-right: 4px;
        color: ${$bulletColor};
      }
    `}
`;
