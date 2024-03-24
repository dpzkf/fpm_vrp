import { AppRoute } from "../../../constants/routes.ts";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { ESearchCriteria } from "../../../constants/searchCriteria.ts";

import { useMemo, useState } from "react";
import { useFilterData } from "../../../hooks/common/useFilterData";
import { useNavigate } from "react-router-dom";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../../ui-kit/interactive/Button";
import { InputSearch } from "../../../ui-kit/interactive/InputSearch";
import { SortButton } from "../../../ui-kit/interactive/SortButton";
import { Table } from "../../../ui-kit/interactive/Table";
import { EmptyState } from "./components";
import * as Styled from "./styles";

type TTable = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const elements: TTable[] = [
  {
    name: "Ilya",
    email: "ilya@mail.com",
    phone: "+1(972) 365- 9285",
    address: "111 8th Avenue, New York, NY, USA",
  },
  {
    name: "Ilya",
    email: "ilya@mail.com",
    phone: "+1(972) 365- 9285",
    address: "101 9th Avenue, New York, NY, USA",
  },
];

export const VendorsList = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<TTable>[]>(
    () => [
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
      {
        header: "email",
        accessorKey: "email",
      },
      {
        header: "address",
        accessorKey: "address",
      },
      {
        header: "actions",
        cell: ({ row }) => (
          <Group>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() => openEditVendor(row.getValue("name"))}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() =>
                openContextModal({
                  modal: "confirmDeleteModal",
                  innerProps: {
                    title: "Are you sure you want to delete this Vendor?",
                    modalBody: "Deleting this vendor is permanent. Ensure it's no longer needed.",
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

  const handleButtonClick = () => {
    navigate(AppRoute.App.Purchases.VendorsAdd.path);
  };

  const openEditVendor = (vendorId: string) => {
    navigate(AppRoute.App.Purchases.VendorsEdit.makePath(vendorId));
  };

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />

        <Button w="15%" h="fit-content" miw={125} onClick={handleButtonClick}>
          Add Vendor
        </Button>
      </Flex>

      {elements.length ? <Table table={table} /> : <EmptyState handleButtonClick={handleButtonClick} />}
    </Styled.Wrapper>
  );
};
