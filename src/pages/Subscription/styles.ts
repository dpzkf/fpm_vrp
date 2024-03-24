import styled from "styled-components";
import { Tabs as TabsLib } from "@mantine/core";

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
    transition: background-color 0.3s, transform 0.3s; /* Add transition */

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
