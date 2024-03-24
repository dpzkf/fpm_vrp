import { ESearchCriteria } from "../../constants/searchCriteria.ts";
import { useFilterData } from "../../hooks/common/useFilterData";
import { ActionIcon, Avatar, Flex, Select, Stack } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { InputSearch, SortButton, Switch, Table, Text } from "../../ui-kit";
import { useMemo, useState } from "react";
import * as Styled from "./styles";

import { getPaymentStatus } from "./utils.tsx";

type TTable = {
  id: string;
  name: string;
  email: string;
  businessName: string;
  paymentStatus: boolean;
  join: string;
  expire: string;
  isActive: boolean;
  package: string;
};

const elements: TTable[] = [
  {
    id: "1",
    name: "Ilya",
    email: "ilya@mail.com",
    businessName: "ilya",
    join: "11 month ago",
    expire: "40 days left",
    isActive: true,
    paymentStatus: false,
    package: "Premium",
  },
  {
    id: "2",
    name: "Andrei",
    email: "ilya@mail.com",
    businessName: "ilya",
    join: "11 month ago",
    expire: "40 days left",
    isActive: false,
    paymentStatus: true,
    package: "Premium",
  },
];

export const UsersAdmin = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<TTable>[]>(
    () => [
      {
        header: "#",
        accessorKey: "id",
      },
      {
        header: ({ header }) => (
          <SortButton
            handleSort={() => {
              header.column.toggleSorting();
            }}
            order={header.column.getIsSorted()}
          >
            User Name & Email
          </SortButton>
        ),
        accessorKey: "name",
        cell: (row) => (
          <Flex gap={8} align="center">
            <Avatar />
            <Stack gap={0}>
              <Text size="14px" fw={600}>
                {row.row.original.name}
              </Text>
              <Text size="12px" c="var(--text-secondary)">
                {row.row.original.email}
              </Text>
            </Stack>
          </Flex>
        ),
      },
      {
        header: "Business Name",
        accessorKey: "businessName",
      },
      {
        header: "Package",
        accessorKey: "package",
      },
      {
        header: () => (
          <Stack justify="center" align="center">
            Payment Status
          </Stack>
        ),
        accessorKey: "paymentStatus",
        cell: (row) => (
          <Stack justify="center" align="center">
            {getPaymentStatus(row.getValue() as boolean)}
          </Stack>
        ),
      },
      {
        header: ({ header }) => (
          <SortButton
            handleSort={() => {
              header.column.toggleSorting();
            }}
            order={header.column.getIsSorted()}
          >
            Join
          </SortButton>
        ),
        accessorKey: "join",
      },
      {
        header: ({ header }) => (
          <SortButton
            handleSort={() => {
              header.column.toggleSorting();
            }}
            order={header.column.getIsSorted()}
          >
            Expire
          </SortButton>
        ),
        accessorKey: "expire",
      },
      {
        header: "Active",
        accessorKey: "isActive",
        cell: () => <Switch />,
      },
      {
        header: () => (
          <Stack justify="center" align="center">
            Actions
          </Stack>
        ),
        accessorKey: "actions",
        cell: () => (
          <Flex align="center" justify="center">
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() =>
                openContextModal({
                  modal: "confirmDeleteModal",
                  innerProps: {
                    title: "Are you sure you want to delete this User?",
                    modalBody: "Deleting this user is permanent. Ensure it's no longer needed.",
                  },
                })
              }
            >
              <IconTrash />
            </ActionIcon>
          </Flex>
        ),
      },
    ],
    [],
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = useFilterData({ tableData: elements, filterCriteria: ESearchCriteria.ByName, searchValue });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: filteredData ?? elements,
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

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />

        <Styled.SelectWrapper>
          <Select placeholder="All packages" data={[]} rightSection={<IconChevronDown />} />
        </Styled.SelectWrapper>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};
