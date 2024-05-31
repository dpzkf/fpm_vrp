import { FC } from "react";

import { Table } from "@mantine/core";

import { TRetrieveRoutingProblem } from "@app/modules";

import uniqueId from "lodash.uniqueid";

type TSolutionTable = {
  solution?: TRetrieveRoutingProblem;
};

export const SolutionTable: FC<TSolutionTable> = ({ solution }) => {
  const rows = solution?.routes.map(({ vehicle }) => (
    <Table.Tr key={uniqueId(`${vehicle}_`)}>
      <Table.Td>{vehicle}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Номер автомобіля</Table.Th>
          <Table.Th>Колір маршруту</Table.Th>
          <Table.Th>Кількість зупинок</Table.Th>
          <Table.Th>Початок руху</Table.Th>
          <Table.Th>Кінець руху</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
