import { FC, useContext } from "react";

import { Stack } from "@mantine/core";

import { Text } from "@ui/typography";

import { TVehicleRoutingContext, VehicleRoutingContext } from "@context/index.ts";
import { LocationType } from "types";

import { LocationsTable } from "./components";

type TLocations = {
  locationType: LocationType;
};

export const Locations: FC<TLocations> = ({ locationType }) => {
  const { locations } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;
  const filteredLocations = locations.filter(({ type }) => type === locationType);
  return (
    <Stack gap={16}>
      {locationType === LocationType.WAREHOUSE ? (
        <Text fw={500} bulletColor="var(--warehouse-color)">
          Склади
        </Text>
      ) : (
        <Text fw={500} bulletColor="var(--primary-color)">
          Доставка
        </Text>
      )}
      <LocationsTable data={filteredLocations} />
    </Stack>
  );
};
