import { useContext } from "react";

import { ActionIcon, Group, Table } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import { formatISOStringToTime } from "@utils/helpers";

export const VehiclesTable = () => {
  const { vehicles, updateVehicle, deleteVehicle } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;

  const rows = vehicles.map(({ id, capacities, name, earliest_start, latest_end }) => (
    <Table.Tr key={id}>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{capacities?.boxes}</Table.Td>
      <Table.Td>{earliest_start ? formatISOStringToTime(earliest_start) : ""}</Table.Td>
      <Table.Td>{latest_end ? formatISOStringToTime(latest_end) : ""}</Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Group gap={8} justify="flex-end">
          <ActionIcon
            variant="subtle"
            onClick={() => {
              openContextModal({
                modal: "vehiclesModal",
                innerProps: {
                  vehicleId: id,
                  vehicles: vehicles,
                  update: updateVehicle,
                },
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={() => deleteVehicle(id)}>
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
          <Table.Th>Номер автомобіля</Table.Th>
          <Table.Th>Місткість</Table.Th>
          <Table.Th>Початок роботи</Table.Th>
          <Table.Th>Кінець роботи</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
