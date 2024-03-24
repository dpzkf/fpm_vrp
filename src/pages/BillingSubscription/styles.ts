import { Group } from "@mantine/core";
import { Tabs as TabsLib } from "@mantine/core";
import { Link as LinkLib } from "react-router-dom";
import styled from "styled-components";

interface IVerified {
  isVerified: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s);

  background-color: var(--white);
  padding: 24px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: var(--rounded-s);

  background-color: var(--white);
`;

export const Link = styled(LinkLib)`
  font: var(--font-l);
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
`;

export const PaymentStatus = styled(Group)<IVerified>`
  max-width: 103px;
  justify-content: center;
  gap: 4px;
  padding: 5px 14px 4px 12px;
  align-items: center;
  border-radius: var(--rounded-xl);
  color: ${({ isVerified }) => (isVerified ? "var(--role-green)" : "var(--text-secondary)")};
  background-color: ${({ isVerified }) =>
    isVerified ? "var(--payment-status-paid)" : "var(--payment-status-not-paid)"};
`;

export const Tabs = styled(TabsLib)`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .mantine-Tabs-tabsList {
    color: red;
    background-color: var(--white);
    border-radius: var(--rounded-s);
    padding: 2px 2px 2px 2px;
  }

  & .mantine-Tabs-tab:first-child {
    border-radius: 8px 0px 0px 8px;
  }

  & .mantine-Tabs-tab:last-child {
    border-radius: 0px 8px 8px 0px;
  }

  & .mantine-Tabs-tab {
    font: var(--font-l);
    color: var(--gray-text-color);
    font-weight: 600;
    border-radius: var(--rounded-s);
    background-color: transparent;
    padding: 8px 32px;
    border: 1px solid var(--gray-400);
    outline: none;
    margin: 0;
    transition:
      background-color 0.3s,
      transform 0.3s; /* Add transition */

    :hover {
      border: none;
    }
  }

  & .mantine-Tabs-tab[data-active] {
    color: var(---primary-text-color);
    border: 1px solid var(--primary-color);
    background-color: var(--blue-100);
  }
`;
