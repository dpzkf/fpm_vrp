import { useContext } from "react";

import { Button, Stack, Tabs } from "@mantine/core";

import { Logo } from "@ui/index.ts";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";

import { LocationType } from "../../types";
import { Locations } from "./components/Locations";
import * as Styled from "./styles.ts";
import { ActiveTabs } from "./utils";

export const Sidebar = () => {
  const { activeTab, changeActiveTab } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;
  return (
    <Tabs
      miw={500}
      h="100dvh"
      flex={1}
      value={activeTab}
      onChange={(value) => changeActiveTab(value as ActiveTabs)}
      display="flex"
      style={{ flexDirection: "column", zIndex: 10, boxShadow: "3px 0 10px -8px #000" }}
    >
      <Stack p={16}>
        <Logo />
        <Tabs.List grow>
          <Tabs.Tab value={ActiveTabs.LOCATIONS_WAREHOUSES}>Склади</Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.LOCATIONS_DROP_OFFS}>Доставка</Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.SHIPMENTS}>Відправлення</Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.VEHICLES}>Автомобілі</Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.SOLUTION}>Рішення</Tabs.Tab>
        </Tabs.List>
      </Stack>
      <Stack gap={24} flex={1} p={16} pt={0} style={{ overflow: "auto" }}>
        <Tabs.Panel value={ActiveTabs.LOCATIONS_WAREHOUSES}>
          <Locations locationType={LocationType.WAREHOUSE} />
        </Tabs.Panel>
        <Tabs.Panel value={ActiveTabs.LOCATIONS_DROP_OFFS}>
          <Locations locationType={LocationType.DROP_OFF} />
        </Tabs.Panel>
      </Stack>
      <Styled.ButtonWrapper>
        <Button variant="filled">Далі</Button>
      </Styled.ButtonWrapper>
    </Tabs>
  );
};
