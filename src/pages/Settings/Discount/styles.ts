import { Flex } from "@mantine/core";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 90dvh;
  border-radius: var(--rounded-s);

  background-color: var(--white);

  flex-direction: column;
`;

export const TaxRightSection = styled.div`
  background-color: var(--gray-400);
  color: #ededed;
  font: var(--font-l);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 22px;
`;
