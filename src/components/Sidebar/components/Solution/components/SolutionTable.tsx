import { FC, useState } from "react";

import { Radio, Table } from "@mantine/core";

import { routeColorMapper } from "@pages/Dashboard/utils";

import { TRetrieveRoutingProblem } from "@app/modules";

import { formatISOStringToTime } from "@utils/helpers";
import uniqueId from "lodash.uniqueid";

type TSolutionTable = {
  solution?: TRetrieveRoutingProblem;
};

export const SolutionTable: FC<TSolutionTable> = ({ solution }) => {
  const [selectedRow, setSelectedRow] = useState<number>(0);

  const rows = solution?.routes.map(({ vehicle, stops }, index) => (
    <Table.Tr key={uniqueId(`${vehicle}_`)}>
      <Table.Td style={{ verticalAlign: "middle" }}>
        <Radio size="xs" checked={selectedRow === index} variant="outline" onChange={() => setSelectedRow(index)} />
      </Table.Td>
      <Table.Td>{vehicle}</Table.Td>
      <Table.Td style={{ verticalAlign: "middle" }}>
        <div
          style={{
            height: "10px",
            width: "60px",
            backgroundColor: routeColorMapper(index),
          }}
        />
      </Table.Td>
      <Table.Td>{stops.length}</Table.Td>
      <Table.Td>{formatISOStringToTime(stops[0].eta)}</Table.Td>
      <Table.Td>{formatISOStringToTime(stops[stops.length - 1].eta)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>#</Table.Th>
          <Table.Th>Номер автомобіля</Table.Th>
          <Table.Th>Колір маршруту</Table.Th>
          <Table.Th>Кількість зупинок</Table.Th>
          <Table.Th>Початок руху</Table.Th>
          <Table.Th>Кінець руху</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
