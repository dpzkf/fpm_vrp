import styled from "styled-components";
import { Flex } from "@mantine/core";
import { Link as LinkLib } from "react-router-dom";

export const Wrapper = styled(Flex)`
  max-width: 487px;
  width: 100%;
  border: 1px solid var(--gray-400);
  border-radius: var(--rounded-s);
  padding: 32px;
  background-color: var(--white);
`;

export const Link = styled(LinkLib)`
  font: var(--font-l);
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
`;
