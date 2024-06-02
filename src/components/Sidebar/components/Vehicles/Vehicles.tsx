import { useContext } from "react";

import { Button, Group, Stack } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { Text } from "@ui/typography";

import { useToast } from "@hooks/common/useToast";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { MAX_VEHICLES } from "@utils/constants";

import * as Styled from "../../styles.ts";
import { VehiclesTable } from "./components";

export const Vehicles = () => {
  const { vehicles, addVehicle } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;

  const { toastError } = useToast();
  return (
    <Stack gap={16}>
      <Styled.HintWrapper>
        <Text c="var(--primary-color)">Виберіть необхідну кількість транспортних засобів</Text>
      </Styled.HintWrapper>
      <Group justify="space-between">
        <Text fw={500}>Автомобілі</Text>
        <Button
          variant="white"
          onClick={() => {
            if (vehicles.length >= MAX_VEHICLES) {
              return toastError("Ліміт автомобілей");
            }
            openContextModal({
              modal: "vehiclesModal",
              innerProps: {
                vehicles: vehicles,
                create: addVehicle,
              },
            });
          }}
        >
          Додати автомобіль
        </Button>
      </Group>
      <VehiclesTable />
    </Stack>
  );
};
