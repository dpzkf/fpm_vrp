import { CHEVRON_LEFT } from "../../../assets/icons";
import { AppRoute } from "../../../constants/routes.ts";
import { Box, Flex } from "@mantine/core";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { SortButton, Table, Text } from "../../../ui-kit";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "../styles.ts";

type TTable = {
  id: string;
  date: string;
  plan: string;
  billing: string;
  amount: number;
};

const tableData: TTable[] = [
  {
    id: "1",
    date: "17 Jan 2023",
    amount: 35,
    billing: "Monthly",
    plan: "Standard",
  },
  {
    id: "2",
    date: "12 Jan 2023",
    amount: 25,
    billing: "Monthly",
    plan: "Standard",
  },
];

export const PaymentInvoices = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<TTable>[]>(
    () => [
      {
        header: "#",
        accessorKey: "id",
      },
      {
        header: "date",
        accessorKey: "date",
      },
      {
        header: "plan",
        accessorKey: "plan",
      },
      {
        header: "billing frequency",
        accessorKey: "billing",
      },
      {
        header: ({ header }) => (
          <SortButton
            handleSort={() => {
              header.column.toggleSorting();
            }}
            order={header.column.getIsSorted()}
          >
            Amount
          </SortButton>
        ),
        accessorKey: "amount",
      },
      {
        header: "actions",
        cell: () => <Styled.Link to="">Download</Styled.Link>,
      },
    ],
    [],
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: tableData ?? defaultData,
    columns,
    pageCount: 0,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const goBack = () => {
    navigate(AppRoute.App.BillingAndSubscriptions.Root.path);
  };

  return (
    <>
      <Box pl={24} pb={24}>
        <Flex gap={10} align="center" style={{ cursor: "pointer" }} onClick={goBack}>
          <CHEVRON_LEFT />
          <Text fw="700" size="18px">
            Payment Invoices
          </Text>
        </Flex>
      </Box>
      <Styled.TableWrapper>
        <Table table={table} />
      </Styled.TableWrapper>
    </>
  );
};
