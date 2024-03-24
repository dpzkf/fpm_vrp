import { Flex } from "@mantine/core";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s) var(--rounded-s);

  flex-direction: column;

  background-color: var(--white);
`;

export const TabCounter = styled.div`
  display: flex;
  width: 30px;
  height: 22px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
`;
