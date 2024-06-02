import { useContext } from "react";

import { Button, Group, Stack } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { Text } from "@ui/typography";

import { useToast } from "@hooks/common/useToast";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";

import * as Styled from "../../styles.ts";
import { ShipmentsTable } from "./components";

export const Shipments = () => {
  const { getWarehouses, getDropOffs, addShipment, shipments } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const { toastError } = useToast();
  return (
    <Stack gap={16}>
      <Styled.HintWrapper>
        <Text c="var(--primary-color)">Виберіть кількість відправлень, необхідних для отримання</Text>
      </Styled.HintWrapper>
      <Group justify="space-between">
        <Text fw={500} textSize={18}>
          Відправлення
        </Text>
        <Button
          variant="white"
          onClick={() => {
            if (shipments.length >= getDropOffs().length) {
              return toastError("Відправки не може бути більше, ніж точок доставок");
            }
            openContextModal({
              modal: "shipmentsModal",
              innerProps: {
                shipments: shipments,
                warehouseLocations: getWarehouses(),
                dropOffLocations: getDropOffs(),
                create: addShipment,
              },
            });
          }}
        >
          Додати відправлення
        </Button>
      </Group>
      {!!shipments?.length && <ShipmentsTable />}
    </Stack>
  );
};
