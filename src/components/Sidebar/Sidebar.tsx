import { FC, useContext, useMemo } from "react";

import { Button, Stack, Tabs } from "@mantine/core";

import { DisabledNextButtonTooltip, Logo } from "@ui/index.ts";

import { useIsDesktop } from "@hooks/common";

import { isRetrieveRoutingProblemUnsolvable, TRetrieveRoutingProblem } from "@app/modules";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import isEqual from "lodash.isequal";
import { LocationType } from "types";

import { Locations, Shipments } from "./components";
import { Solution } from "./components/Solution";
import { Vehicles } from "./components/Vehicles";
import * as Styled from "./styles.ts";
import { ActiveTabs, handleNextStep, handlePreviousStep } from "./utils";

type TSidebar = {
  solution?: TRetrieveRoutingProblem;
  submittedData: Record<string, unknown> | null;
  handleFindSolution: () => void;
};

export const Sidebar: FC<TSidebar> = ({ solution, handleFindSolution, submittedData }) => {
  const isDesktop = useIsDesktop();
  const { activeTab, changeActiveTab, shipments, vehicles, getWarehouses, getDropOffs, locations } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const warehouseLocationLength = getWarehouses().length;
  const dropOffLocationLength = getDropOffs().length;

  const isNextButtonDisabled = useMemo(
    () =>
      (activeTab === ActiveTabs.LOCATIONS_WAREHOUSES && !warehouseLocationLength) ||
      (activeTab === ActiveTabs.LOCATIONS_DROP_OFFS && !dropOffLocationLength) ||
      (activeTab === ActiveTabs.SHIPMENTS && !shipments.length) ||
      (activeTab === ActiveTabs.VEHICLES && !vehicles.length),
    [activeTab, locations, shipments, vehicles],
  );

  const hasDataChanged = useMemo(
    () => isEqual(submittedData, { shipments, vehicles, locations }),
    [locations, shipments, vehicles, submittedData],
  );
  return (
    <Tabs
      display="flex"
      h="100%"
      style={{ flexDirection: "column" }}
      value={activeTab}
      onChange={(value) => changeActiveTab(value as ActiveTabs)}
    >
      <Stack p={isDesktop ? 16 : 0}>
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
          <Tabs.Tab value={ActiveTabs.SOLUTION} disabled={!solution || isRetrieveRoutingProblemUnsolvable(solution)}>
            5. Рішення
          </Tabs.Tab>
        </Tabs.List>
      </Stack>
      <Stack gap={24} flex={1} p={isDesktop ? 16 : 0} pt={isDesktop ? 0 : 16} style={{ overflowY: "scroll" }}>
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
          <DisabledNextButtonTooltip disabled={!isNextButtonDisabled}>
            <Button
              disabled={isNextButtonDisabled}
              variant="filled"
              onClick={() => changeActiveTab(handleNextStep(activeTab))}
            >
              Далі
            </Button>
          </DisabledNextButtonTooltip>
        )}
        {activeTab === ActiveTabs.VEHICLES && (
          <DisabledNextButtonTooltip disabled={!isNextButtonDisabled}>
            <Button
              disabled={isNextButtonDisabled}
              variant="filled"
              color="teal"
              onClick={() => {
                if (!hasDataChanged) {
                  handleFindSolution();
                  return;
                }
                changeActiveTab(handleNextStep(activeTab));
              }}
            >
              Знайти рішення
            </Button>
          </DisabledNextButtonTooltip>
        )}
      </Styled.ButtonWrapper>
    </Tabs>
  );
};
