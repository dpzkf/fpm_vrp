import { Tabs as TabsLib } from "@mantine/core";

import { styled } from "styled-components";

export const Tabs = styled(TabsLib)`
  .mantine-Tabs-tabLabel {
    color: var(--text-secondary);
    font: var(--font-m);
    font-weight: 700;
  }

  .mantine-Tabs-tab[data-active] .mantine-Tabs-tabLabel {
    color: var(--primary-color);
  }

  .mantine-Tabs-tab[data-active] {
    border-bottom: 2px solid var(--primary-color);

    .mantine-Tabs-tabSection {
      .tab-counter {
        background-color: var(--primary-color);
      }
    }
  }

  .mantine-Tabs-tabSection {
    .tab-counter {
      background-color: var(--text-secondary);
      color: var(--white);
    }
  }
`;
