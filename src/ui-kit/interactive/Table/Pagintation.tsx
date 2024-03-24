import { Group, Pagination as PaginationLib } from "@mantine/core";
import { Table } from "@tanstack/react-table";
import * as Styled from "./styles.ts";

type TPagination<T> = {
  table: Table<T>;
};

export const Pagination = <T,>(props: TPagination<T>) => {
  const { table } = props;

  return (
    <Styled.PaginationWrapper>
      <PaginationLib.Root total={10}>
        <Group gap={5} justify="center">
          <PaginationLib.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} />
          <PaginationLib.Previous onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
          <PaginationLib.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
          <PaginationLib.Last
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
        </Group>
      </PaginationLib.Root>
    </Styled.PaginationWrapper>
  );
};
