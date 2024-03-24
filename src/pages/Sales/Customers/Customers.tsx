import { AppRoute } from "../../../constants/routes.ts";

import { useFilterData } from "../../../hooks/common/useFilterData";

import { ESearchCriteria } from "../../../constants/searchCriteria.ts";

import { ActionIcon, Flex, Group } from "@mantine/core";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useDisclosure } from "@mantine/hooks";

import { Button } from "../../../ui-kit/interactive/Button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { InputSearch } from "../../../ui-kit/interactive/InputSearch";
import { SortButton } from "../../../ui-kit/interactive/SortButton";
import { Table } from "../../../ui-kit/interactive/Table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";

type TTable = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

const elements: TTable[] = [
  {
    id: "1",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "2",
    name: "Dianne Russell",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "3",
    name: "Esther Howard",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "4",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "6",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "7",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "8",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
  {
    id: "9",
    name: "Courtney Henry",
    phone: "+1(972) 365- 9285",
    email: "Ntwisner@gmail.com",
    address: "8th Avenue, New York, NY, USA",
  },
];

export const Customers = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [tableData] = useState<TTable[]>(elements);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [, { toggle }] = useDisclosure(false);

  const navigate = useNavigate();

  const openEditTax = (customerId: string) => {
    navigate(AppRoute.App.Sales.EditCustomer.makePath(customerId));
  };

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
            Name
          </SortButton>
        ),
        accessorKey: "name",
      },
      {
        header: "phone",
        accessorKey: "phone",
      },
      { header: "email", accessorKey: "email" },
      { header: "address", accessorKey: "address" },
      {
        header: "actions",
        cell: ({ row }) => (
          <Group>
            <ActionIcon color="var(--grey-icon)" variant="transparent" onClick={() => openEditTax(row.getValue("id"))}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() => {
                toggle();
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        ),
      },
    ],
    [],
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
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
    data: filteredData ?? tableData,
    columns,
    pageCount: 3,
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

  console.log("sorting", sorting);

  const onButtonClick = () => {
    navigate(AppRoute.App.Sales.NewCustomer.path);
  };

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />

        <Button w="15%" h="fit-content" miw={125} onClick={onButtonClick}>
          Add Customer
        </Button>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};
