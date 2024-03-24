import { Flex } from "@mantine/core";
import { ReactNode } from "react";
import styled from "styled-components";

interface IStatusWrapper {
  isPaid: boolean;
  children: ReactNode;
}

export const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s) var(--rounded-s);

  flex-direction: column;

  background-color: var(--white);
  padding-top: 24px;
`;

export const PaymentStatusWrapper = styled(Flex)<IStatusWrapper>`
  width: 100%;
  max-width: 74px;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;
  border-radius: var(--rounded-xl);
  color: ${({ isPaid }) => (isPaid ? "var(--role-green)" : "var(--text-secondary)")};
  background-color: ${({ isPaid }) => (isPaid ? "var(--payment-status-paid)" : "var(--payment-status-not-paid)")};
`;

export const SelectWrapper = styled.div`
  min-width: 260px;

  & input {
    border-radius: var(--rounded-xs);
    font: var(--font-l);
    font-weight: 400;
    padding: 6px 14px;
    box-sizing: border-box;
    height: unset;
    line-height: 29px;
    color: var(--text-inputs);
  }

  .mantine-Select-input {
    min-height: 43px;
  }

  .mantine-Select-section > svg {
    width: 24px;
    height: 24px;
  }
`;
