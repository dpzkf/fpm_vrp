import { useContext } from "react";

import { ActionIcon, Group, Table } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import { formatISOStringToTime } from "@utils/helpers";

export const ShipmentsTable = () => {
  const { shipments, getWarehouses, getDropOffs, updateShipment, deleteShipment } = useContext(
    VehicleRoutingContext,
  ) as TVehicleRoutingContext;

  const rows = shipments.map(({ id, from, to, size, dropoff_times }) => (
    <Table.Tr key={id}>
      <Table.Td>{from}</Table.Td>
      <Table.Td>{to}</Table.Td>
      <Table.Td>{size?.boxes}</Table.Td>
      <Table.Td>
        {dropoff_times?.[0]
          ? `${formatISOStringToTime(dropoff_times?.[0].earliest)} - ${formatISOStringToTime(dropoff_times?.[0].latest)}`
          : ""}
      </Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Group gap={8} justify="flex-end">
          <ActionIcon
            variant="subtle"
            onClick={() => {
              openContextModal({
                modal: "shipmentsModal",
                innerProps: {
                  shipmentId: id,
                  shipments: shipments,
                  warehouseLocations: getWarehouses(),
                  dropOffLocations: getDropOffs(),
                  update: updateShipment,
                },
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={() => deleteShipment(id)}>
            <IconTrashX />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Звідки</Table.Th>
          <Table.Th>Куди</Table.Th>
          <Table.Th>Кількість</Table.Th>
          <Table.Th>Час</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
