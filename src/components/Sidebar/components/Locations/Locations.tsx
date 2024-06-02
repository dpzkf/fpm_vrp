import { FC, useContext } from "react";

import { Group, Stack } from "@mantine/core";

import { Text } from "@ui/typography";

import { useToast } from "@hooks/common";

import { AddressAutofill } from "@components/AddressAutofill";
import { TVehicleRoutingContext, VehicleRoutingContext } from "@context/index.ts";
import { Feature } from "@turf/helpers";
import { MAX_DROP_OFFS, MAX_PICKUP } from "@utils/constants";
import uniqueId from "lodash.uniqueid";
import { LocationType } from "types";
import { v4 as uuidv4 } from "uuid";

import * as Styled from "../../styles.ts";
import { LocationsTable } from "./components";

type TLocations = {
  locationType: LocationType;
};

export const Locations: FC<TLocations> = ({ locationType }) => {
  const { locations, addLocation, getWarehouses, getDropOffs } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;
  const { toastError } = useToast();

  const isLocationWarehouse = locationType === LocationType.WAREHOUSE;

  const filteredLocations = locations.filter(({ type }) => type === locationType);

  const handleSetLocation = (res: Feature) => {
    if (getWarehouses().length >= MAX_PICKUP || getDropOffs().length >= MAX_DROP_OFFS) {
      return toastError("Досягнут ліміт");
    }
    addLocation({
      coordinates: res.geometry?.coordinates,
      name: res.properties?.name || uniqueId("location-"),
      id: uuidv4(),
      type: isLocationWarehouse ? LocationType.WAREHOUSE : LocationType.DROP_OFF,
    });
  };
  return (
    <Stack gap={16}>
      <Styled.HintWrapper>
        <Text c="var(--primary-color)">
          Виберіть місце на карті та натисніть або скористайтеся полем "Пошук"; Перетягуйте точку, щоб змінити її
          розташування; Примітка: Перетягувати точки можна лише на поточній вкладці.
        </Text>
      </Styled.HintWrapper>
      <Group justify="space-between">
        {isLocationWarehouse ? (
          <Text fw={500} textSize={18} bulletColor="var(--warehouse-color)">
            Склади
          </Text>
        ) : (
          <Text fw={500} textSize={18} bulletColor="var(--primary-color)">
            Доставка
          </Text>
        )}
      </Group>
      <AddressAutofill onRetrieve={handleSetLocation} />
      {!!filteredLocations?.length && <LocationsTable data={filteredLocations} />}
    </Stack>
  );
};
