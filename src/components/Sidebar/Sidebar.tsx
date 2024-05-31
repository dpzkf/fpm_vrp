import { FC, useContext, useMemo } from "react";

import { Button, Stack, Tabs } from "@mantine/core";

import { Logo } from "@ui/index.ts";

import { useHasDataChanged } from "@hooks/common";

import { TRetrieveRoutingProblem } from "@app/modules";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { LocationType } from "types";

import { Locations, Shipments } from "./components";
import { Solution } from "./components/Solution";
import { Vehicles } from "./components/Vehicles";
import * as Styled from "./styles.ts";
import { ActiveTabs, handleNextStep, handlePreviousStep } from "./utils";

type TSidebar = {
  solution?: TRetrieveRoutingProblem;
  handleFindSolution: () => void;
};

export const Sidebar: FC<TSidebar> = ({ solution, handleFindSolution }) => {
  const { activeTab, changeActiveTab, shipments, vehicles, getWarehouses, getDropOffs, locations } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const hasDataChanged = useHasDataChanged(locations, vehicles, shipments);

  const warehouseLocationLength = getWarehouses().length;
  const dropOffLocationLength = getDropOffs().length;

  const isNextButtonDisabled = useMemo(
    () =>
      (activeTab === ActiveTabs.LOCATIONS_WAREHOUSES && !warehouseLocationLength) ||
      (activeTab === ActiveTabs.LOCATIONS_DROP_OFFS && !dropOffLocationLength) ||
      (activeTab === ActiveTabs.SHIPMENTS && !shipments.length) ||
      (activeTab === ActiveTabs.VEHICLES && !vehicles.length),
    [activeTab, warehouseLocationLength, dropOffLocationLength, shipments, vehicles],
  );

  return (
    <Tabs
      flex={2.2}
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
          <Tabs.Tab value={ActiveTabs.SHIPMENTS} disabled={!dropOffLocationLength || !warehouseLocationLength}>
            3. Відправлення
          </Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.VEHICLES} disabled={!shipments.length}>
            4. Автомобілі
          </Tabs.Tab>
          <Tabs.Tab value={ActiveTabs.SOLUTION} disabled={!solution}>
            5. Рішення
          </Tabs.Tab>
        </Tabs.List>
      </Stack>
      <Stack gap={24} flex={1} p={16} pt={0} style={{ overflow: "scroll" }}>
        <Tabs.Panel value={ActiveTabs.LOCATIONS_WAREHOUSES}>
          <Locations locationType={LocationType.WAREHOUSE} />
        </Tabs.Panel>
        <Tabs.Panel value={ActiveTabs.LOCATIONS_DROP_OFFS}>
          <Locations locationType={LocationType.DROP_OFF} />
        </Tabs.Panel>
        <Tabs.Panel value={ActiveTabs.SHIPMENTS}>
          <Shipments />
        </Tabs.Panel>
        <Tabs.Panel value={ActiveTabs.VEHICLES}>
          <Vehicles />
        </Tabs.Panel>
        <Tabs.Panel value={ActiveTabs.SOLUTION}>
          <Solution solution={solution} />
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
          <Button
            disabled={isNextButtonDisabled}
            variant="filled"
            color="teal"
            onClick={() => {
              if (!hasDataChanged) {
                return changeActiveTab(handleNextStep(activeTab));
              }
              handleFindSolution();
            }}
          >
            Знайти рішення
          </Button>
        )}
      </Styled.ButtonWrapper>
    </Tabs>
  );
};
