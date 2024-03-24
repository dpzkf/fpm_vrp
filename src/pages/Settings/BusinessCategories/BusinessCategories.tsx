import { AddBusinessCategory } from "../../../components/modals";
import { EPageType } from "../../../constants";
import { ESearchCriteria } from "../../../constants/searchCriteria.ts";

import { useFilterData } from "../../../hooks/common/useFilterData";

import { ActionIcon, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";

import { IconEdit, IconTrash } from "@tabler/icons-react";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button, InputSearch, SortButton, Table } from "../../../ui-kit";
import { useMemo, useState } from "react";

import * as Styled from "./styles";

type TTable = {
  id: string;
  name: string;
};

const tableData: TTable[] = [
  {
    id: "1",
    name: "Vehicles",
  },
  {
    id: "2",
    name: "Travel",
  },
  {
    id: "3",
    name: "Sport",
  },
  {
    id: "4",
    name: "Pets",
  },
  {
    id: "5",
    name: "Nonprofit",
  },
  {
    id: "6",
    name: "Religion",
  },
  {
    id: "7",
    name: "Retail",
  },
];

export const BusinessCategories = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [isOpenedAddCategoryModal, { toggle, close }] = useDisclosure(false);

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
            Business category name
          </SortButton>
        ),
        accessorKey: "name",
      },
      {
        header: "actions",
        cell: () => (
          <Group>
            <ActionIcon color="var(--grey-icon)" variant="transparent" onClick={toggle}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() =>
                openContextModal({
                  modal: "confirmDeleteModal",
                  innerProps: {
                    title: "Are you sure you want to delete this Category?",
                    modalBody: "Deleting this category is permanent. Ensure it's no longer needed.",
                  },
                })
              }
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
    pageSize: 10,
  });

  const filteredData = useFilterData({ tableData, filterCriteria: ESearchCriteria.ByName, searchValue });

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

        <Button w="15%" h="fit-content" miw={125} onClick={toggle}>
          Add Category
        </Button>
      </Flex>

      <Table table={table} />

      <AddBusinessCategory opened={isOpenedAddCategoryModal} close={close} type={EPageType.New} />
    </Styled.Wrapper>
  );
};
