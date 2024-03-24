import { TGetUsersResponse, TUser } from "../../app/modules/users/types.ts";
import { useDeleteUserMutation, useGetUsersQuery } from "../../app/modules/users/usersApi.ts";
import { AppRoute } from "../../constants/routes.ts";
import { ESearchCriteria } from "../../constants/searchCriteria.ts";
import { ERole } from "../../constants/userRoles.ts";

import { useFilterData } from "../../hooks/common/useFilterData";

import { ActionIcon, Flex, Group } from "@mantine/core";
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
import { Button } from "../../ui-kit/interactive/Button";
import { InputSearch } from "../../ui-kit/interactive/InputSearch";
import { SortButton } from "../../ui-kit/interactive/SortButton";
import { Table } from "../../ui-kit/interactive/Table";
import { timestampFormat } from "../../utils/timestampFormat.ts";
import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";
import { getUserRole } from "./utils.tsx";

type TRenderUsersListProps = {
  usersRes: TGetUsersResponse;
};

export const RenderUsersList: FC<TRenderUsersListProps> = ({ usersRes }) => {
  const { users } = usersRes;
  const [searchValue, setSearchValue] = useState<string>("");

  const [deleteUser] = useDeleteUserMutation();

  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<TUser>[]>(
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
        accessorKey: "fullName",
      },
      {
        header: "email",
        accessorKey: "email",
      },
      {
        header: "role",
        accessorKey: "permissionsTemplate",
        cell: (row) => <>{getUserRole((row.getValue() as ERole) || ERole.Admin)}</>,
      },
      {
        header: "date Of Joining",
        accessorKey: "createdAt",
        cell: (row) => <>{timestampFormat(row.getValue() as string)}</>,
      },
      {
        header: "actions",
        cell: ({ row }) => (
          <Group>
            <ActionIcon color="var(--grey-icon)" variant="transparent" onClick={() => openEditUser(row.getValue("id"))}>
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() =>
                openContextModal({
                  modal: "confirmDeleteModal",
                  innerProps: {
                    title: "Are you sure you want to delete this User?",
                    modalBody: "Deleting this user is permanent. Ensure it's no longer needed.",
                    onConfirm: () => {
                      deleteUser({ id: row.getValue("id") }).unwrap();
                    },
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

  const filteredData = useFilterData({ tableData: users, filterCriteria: ESearchCriteria.ByFullName, searchValue });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: filteredData ?? users,
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

  const onButtonClick = () => {
    navigate(AppRoute.App.Users.Add.path);
  };

  const openEditUser = (userId: string) => {
    navigate(AppRoute.App.Users.Edit.makePath(userId));
  };

  return (
    <Styled.Wrapper>
      <Flex justify="space-between" p={16} w="100%">
        <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />

        <Button w="15%" h="fit-content" miw={125} onClick={onButtonClick}>
          Add User
        </Button>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};

export const UsersList = () => {
  const { data } = useGetUsersQuery({ page: 1, limit: 10 });
  if (!data) return null;
  return <RenderUsersList usersRes={data} />;
};
