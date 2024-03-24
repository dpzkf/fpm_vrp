import { Flex, Select, Table as TableLib } from "@mantine/core";
import { useState } from "react";
import { TTable } from "../../../types";
import { Pagination } from "./Pagintation.tsx";
import * as Styled from "./styles.ts";
import { IconChevronDown } from "@tabler/icons-react";
import { flexRender } from "@tanstack/react-table";
import { Text } from "../../typography/Text/styles.ts";

export const Table = <T,>(props: TTable<T>) => {
  const { table } = props;

  const [selectRowPerPage, setSelectRowPerPage] = useState<string | null>("");

  return (
    <>
      <Styled.TableWrapper highlightOnHover>
        <TableLib.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableLib.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableLib.Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                    )}
                  </TableLib.Th>
                );
              })}
            </TableLib.Tr>
          ))}
        </TableLib.Thead>
        <TableLib.Tbody>
          {table.getSortedRowModel().rows.map((row) => {
            return (
              <TableLib.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableLib.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableLib.Td>
                ))}
              </TableLib.Tr>
            );
          })}
        </TableLib.Tbody>
      </Styled.TableWrapper>
      <Styled.TableFooter w="100%" justify="space-between" align="center">
        <Text size="14px" c="var(--gray-footer-text-color)" fw="bold">
          count
        </Text>
        <Flex align="center" gap={32}>
          <Flex gap={16} align="center">
            <Text size="14px" c="var(--gray-footer-text-color)" fw="bold">
              Row per page
            </Text>

            <Styled.SelectWrapper>
              <Select
                data={[]}
                value={selectRowPerPage}
                onChange={setSelectRowPerPage}
                rightSection={<IconChevronDown />}
              />
            </Styled.SelectWrapper>
          </Flex>

          <Pagination table={table} />
        </Flex>
      </Styled.TableFooter>
    </>
  );
};
