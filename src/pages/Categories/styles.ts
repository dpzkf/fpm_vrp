import { Flex } from "@mantine/core";
import styled from "styled-components";

type TTypeWrapper = {
  color: string;
};

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s) var(--rounded-s);

  flex-direction: column;

  background-color: var(--white);
`;

export const TypeWrapper = styled(Flex)<TTypeWrapper>`
  align-items: center;
  color: ${({ color }) => color};

  & svg > circle {
    fill: ${({ color }) => color};
  }
`;
