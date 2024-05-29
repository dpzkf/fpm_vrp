import { useContext, useMemo } from "react";

import { Button, Stack, Tabs } from "@mantine/core";

import { Logo } from "@ui/index.ts";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";

import { LocationType } from "../../types";
import { Locations } from "./components/Locations";
import * as Styled from "./styles.ts";
import { ActiveTabs, handleNextStep, handlePreviousStep } from "./utils";

export const Sidebar = () => {
  const { activeTab, changeActiveTab, shipments, vehicles, locations } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const warehouseLocationLength = locations.filter(({ type }) => type === LocationType.WAREHOUSE).length;
  const dropOffLocationLength = locations.filter(({ type }) => type === LocationType.DROP_OFF).length;

  const isNextButtonDisabled = useMemo(
    () =>
      (activeTab === ActiveTabs.LOCATIONS_WAREHOUSES && !warehouseLocationLength) ||
      (activeTab === ActiveTabs.LOCATIONS_DROP_OFFS && !dropOffLocationLength) ||
      (activeTab === ActiveTabs.SHIPMENTS && !shipments.length) ||
      (activeTab === ActiveTabs.VEHICLES && !vehicles.length),
    [activeTab],
  );
  return (
    <Tabs
      miw={500}
      h="100dvh"
      value={activeTab}
      onChange={(value) => changeActiveTab(value as ActiveTabs)}
      display="flex"
      style={{ flexDirection: "column", zIndex: 10, boxShadow: "3px 0 10px -8px #000" }}
    >
      <Stack p={16}>
        <Logo />
        <Tabs.List grow>
          <Tabs.Tab value={ActiveTabs.LOCATIONS_WAREHOUSES}>1. Склади</Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.LOCATIONS_DROP_OFFS} disabled={!warehouseLocationLength}>
            2. Доставка
          </Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.SHIPMENTS} disabled={!dropOffLocationLength}>
            3. Відправлення
          </Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.VEHICLES} disabled={!shipments.length}>
            4. Автомобілі
          </Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.SOLUTION} disabled={!shipments.length}>
            5. Рішення
          </Tabs.Tab>
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
        {activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES && (
          <Button variant="outline" onClick={() => changeActiveTab(handlePreviousStep(activeTab))}>
            Назад
          </Button>
        )}
        {activeTab !== ActiveTabs.SOLUTION && activeTab !== ActiveTabs.VEHICLES && (
          <Button
            disabled={isNextButtonDisabled}
            variant="filled"
            onClick={() => changeActiveTab(handleNextStep(activeTab))}
          >
            Далі
          </Button>
        )}
        {activeTab === ActiveTabs.VEHICLES && (
          <Button disabled={isNextButtonDisabled} variant="filled" bg="var(--primary-color)">
            Далі
          </Button>
        )}
      </Styled.ButtonWrapper>
    </Tabs>
  );
};
