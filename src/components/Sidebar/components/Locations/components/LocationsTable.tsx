import { FC } from "react";

import { Table } from "@mantine/core";

import { TLocation } from "types";

type TLocationsTable = {
  data: TLocation[];
};
export const LocationsTable: FC<TLocationsTable> = ({ data }) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.coordinates.toString()}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Назва Вулиці</Table.Th>
          <Table.Th>Координати</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
