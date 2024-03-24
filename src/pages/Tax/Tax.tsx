import { AppRoute } from "../../constants/routes.ts";

import { ActionIcon, Flex, Group } from "@mantine/core";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { useGetTaxesQuery, useDeleteTaxMutation } from "../../app/modules/taxes/taxesApi.ts";

import { useNavigate } from "react-router-dom";

import { InputSearch } from "../../ui-kit/interactive/InputSearch";
import { Button } from "../../ui-kit/interactive/Button";
import { SortButton } from "../../ui-kit/interactive/SortButton";
import { Table } from "../../ui-kit/interactive/Table";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { TGetTaxesResponse, TTax } from "../../app/modules/taxes/types.ts";

import * as Styled from "./styles.ts";
import { openContextModal } from "@mantine/modals";
import { ESearchCriteria } from "../../constants/searchCriteria.ts";
import { useFilterData } from "../../hooks/common/useFilterData";

type TRenderTaxProps = {
  categoriesRes: TGetTaxesResponse;
};

export const RenderTax: React.FC<TRenderTaxProps> = ({ categoriesRes }) => {
  const { taxes } = categoriesRes;
  const [deleteTax] = useDeleteTaxMutation();
  const [searchValue, setSearchValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();

  const openEditTax = (taxId: string) => {
    navigate(AppRoute.App.Tax.EditTax.makePath(taxId));
  };

  const columns = useMemo<ColumnDef<TTax>[]>(
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
        header: "rate",
        accessorKey: "rate",
      },
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
                openContextModal({
                  modal: "confirmDeleteModal",
                  innerProps: {
                    title: "Are you sure you want to delete this Tax?",
                    modalBody: "Deleting this tax is permanent. Ensure it's no longer needed.",
                    onConfirm: () => {
                      deleteTax({ id: row.getValue("id") }).unwrap();
                    },
                  },
                });
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

  const filteredData = useFilterData({
    tableData: taxes,
    filterCriteria: ESearchCriteria.ByName,
    searchValue,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: filteredData,
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

  const onButtonClick = () => {
    navigate(AppRoute.App.Tax.NewTax.path);
  };

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />

        <Button w="15%" h="fit-content" miw={125} onClick={onButtonClick}>
          Add Tax
        </Button>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};

export const Tax = () => {
  const { data } = useGetTaxesQuery({ page: 1, limit: 10 });
  if (!data) return null;
  return <RenderTax categoriesRes={data} />;
};
