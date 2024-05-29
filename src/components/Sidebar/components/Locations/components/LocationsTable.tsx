import { FC, useContext } from "react";

import { ActionIcon, Group, Table } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { IconEdit, IconTrashX } from "@tabler/icons-react";
import { TLocation } from "types";

type TLocationsTable = {
  data: TLocation[];
};
export const LocationsTable: FC<TLocationsTable> = ({ data }) => {
  const { deleteLocation, locations, updateLocation } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;

  const rows = data.map(({ id, name }) => (
    <Table.Tr key={id}>
      <Table.Td>{name}</Table.Td>
      <Table.Td style={{ textAlign: "right" }}>
        <Group gap={8} justify="flex-end">
          <ActionIcon
            variant="subtle"
            onClick={() => {
              openContextModal({
                modal: "editLocation",
                innerProps: {
                  locations,
                  locationId: id,
                  updateLocation,
                },
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={() => deleteLocation(id)}>
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
          <Table.Th>Назва Вулиці</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
