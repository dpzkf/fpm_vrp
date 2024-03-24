import { Flex } from "@mantine/core";
import styled from "styled-components";

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 90dvh;

  padding: 24px;

  border-radius: var(--rounded-s);

  flex-direction: column;

  background-color: var(--white);
  padding-top: 24px;
`;

export const FormWrapper = styled(Flex)`
  width: 100%;
  border-radius: var(--rounded-s);

  background-color: var(--white);

  flex-direction: column;
`;

export const CardContainer = styled.li`
  max-width: 344px;
  list-style: none;
  padding: 24px 16px;
  border-radius: var(--rounded-s);
  background-color: var(--white);
  border: 2px solid var(--gray-400);
  cursor: pointer;
  position: relative;

  transition: border 0.5s ease-in-out;

  &:hover {
    border: 2px solid var(--blue-700);
  }
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
