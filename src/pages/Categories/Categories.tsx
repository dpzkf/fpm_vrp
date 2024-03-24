import { ESearchCriteria } from "../../constants/searchCriteria.ts";
import { useFilterData } from "../../hooks/common/useFilterData";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Button, InputSearch, Table, Selectbox } from "../../ui-kit";
import { SortButton } from "../../ui-kit/interactive/SortButton";
import { getCategoryType } from "./components/CategoryType";

import { FC, useMemo, useState } from "react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../app/modules/categories/categoriesApi";
import { openContextModal } from "@mantine/modals";

import { ECategoryType, EPageType } from "../../constants";
import { TGetCategoriesResponse, TCategory } from "../../app/modules/categories/types";

import * as Styled from "./styles";

type TRenderCategoryProps = {
  categoriesRes: TGetCategoriesResponse;
};

export const RenderCategory: FC<TRenderCategoryProps> = (props) => {
  const {
    categoriesRes: { categories },
  } = props;
  const [deleteCategory] = useDeleteCategoryMutation();
  const [searchValue, setSearchValue] = useState<string>("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [typeFilter, setTypeFilter] = useState<string | null>(ECategoryType.AllType);

  const columns = useMemo<ColumnDef<TCategory>[]>(
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
        header: "type",
        accessorKey: "type",
        cell: (row) => <>{getCategoryType(row.getValue() as ECategoryType)}</>,
      },
      {
        header: "actions",
        cell: ({ row }) => {
          return (
            <Group>
              <ActionIcon
                color="var(--grey-icon)"
                variant="transparent"
                onClick={() =>
                  openContextModal({
                    modal: "addCategory",
                    innerProps: {
                      type: EPageType.Edit,
                      categoryId: row.getValue("id"),
                    },
                  })
                }
              >
                <IconEdit />
              </ActionIcon>
              <ActionIcon
                color="var(--grey-icon)"
                variant="transparent"
                onClick={() => {
                  openContextModal({
                    modal: "confirmDeleteModal",
                    innerProps: {
                      title: "Are you sure you want to delete this Category?",
                      modalBody: "Deleting this category is permanent. Ensure it's no longer needed.",
                      onConfirm: () => {
                        deleteCategory({ id: row.getValue("id") }).unwrap();
                      },
                    },
                  });
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          );
        },
      },
    ],
    [],
  );

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const filteredData = useFilterData({
    tableData: categories,
    filterCriteria: ESearchCriteria.ByName,
    searchValue,
  }).filter((category) => {
    if (typeFilter === ECategoryType.AllType) return true;
    return category.type === typeFilter;
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

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <Flex gap={16} w="100%">
          <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />
          <Selectbox
            w={260}
            onChange={setTypeFilter}
            value={typeFilter}
            defaultValue={ECategoryType.AllType}
            data={[ECategoryType.AllType, ECategoryType.Income, ECategoryType.Expense]}
          />
        </Flex>

        <Button
          style={{ flexShrink: 0 }}
          onClick={() => {
            openContextModal({
              modal: "addCategory",
              innerProps: {
                type: EPageType.New,
              },
            });
          }}
        >
          Add Category
        </Button>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};

export const Categories = () => {
  const { data: categories } = useGetCategoriesQuery({ limit: 10, page: 1 });
  if (!categories) return null;
  return <RenderCategory categoriesRes={categories} />;
};
