import { Flex } from "@mantine/core";
import styled from "styled-components";

interface IRoleWrapper {
  color: string;
}

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s) var(--rounded-s);

  flex-direction: column;

  background-color: var(--white);
  padding-top: 24px;
`;

export const FormWrapper = styled(Flex)`
  width: 100%;
  height: 85dvh;
  border-radius: var(--rounded-s);

  background-color: var(--white);

  flex-direction: column;
`;

export const RoleWrapper = styled(Flex)<IRoleWrapper>`
  align-items: center;
  color: ${({ color }) => color};

  & svg > circle {
    fill: ${({ color }) => color};
  }
`;
