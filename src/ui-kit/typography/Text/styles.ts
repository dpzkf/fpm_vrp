import styled from "styled-components";
import { Text as TextLib } from "@mantine/core";

export const Text = styled(TextLib)<{ size?: string }>`
  font-family: var(-font-family-main);
  font-size: ${({ size }) => size};
  line-height: ${({ size }) => `${Number(size?.replace(/\D/g, "")) * 1.2}px`};
`;
