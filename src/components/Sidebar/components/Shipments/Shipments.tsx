import { useContext } from "react";

import { Button, Group, Stack } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { Text } from "@ui/typography";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";

import { ShipmentsTable } from "./components";

export const Shipments = () => {
  const { getWarehouses, getDropOffs, addShipment, shipments } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;
  return (
    <Stack gap={16}>
      <Group justify="space-between">
        <Text fw={500}>Відправлення</Text>
        <Button
          variant="white"
          onClick={() => {
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
      <ShipmentsTable />
    </Stack>
  );
};
