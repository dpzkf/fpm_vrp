import { AppRoute } from "../../constants/routes.ts";
import { ESearchCriteria } from "../../constants/searchCriteria.ts";
import { useFilterData } from "../../hooks/common/useFilterData";
import { ActionIcon, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Button, InputSearch, Table, Selectbox, TabsContainer, Tabs } from "../../ui-kit";
import { SortButton } from "../../ui-kit/interactive/SortButton";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";

type TTable = {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: string;
  details: string;
};

const elements: TTable[] = [
  {
    id: "1",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "2",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "3",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "4",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "6",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "7",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "8",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
  {
    id: "9",
    name: "Courtney Henry",
    category: "+1(972) 365- 9285",
    price: "Ntwisner@gmail.com",
    details: "8th Avenue, New York, NY, USA",
    quantity: "50",
  },
];

export const ProductsAndServices = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const [tableData] = useState<TTable[]>(elements);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [, { toggle }] = useDisclosure(false);

  const navigate = useNavigate();

  const openEditProduct = (productId: string) => {
    navigate(AppRoute.App.ProductsAndServices.EditProduct.makePath(productId));
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
        header: "category",
        accessorKey: "category",
      },
      { header: "price", accessorKey: "price" },
      { header: "quantity", accessorKey: "quantity" },
      { header: "details", accessorKey: "details" },
      {
        header: "actions",
        cell: ({ row }) => (
          <Group>
            <ActionIcon
              color="var(--grey-icon)"
              variant="transparent"
              onClick={() => openEditProduct(row.getValue("id"))}
            >
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
    navigate(AppRoute.App.ProductsAndServices.NewProduct.path);
  };

  const [activeTab, setActiveTab] = useState<string | null>("all");

  return (
    <Styled.Wrapper>
      <Flex pt={16} px={16} w="100%" style={{ borderBottom: "1px solid var(--gray-400)" }}>
        <TabsContainer value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="all" rightSection={<Styled.TabCounter className="tab-counter">128</Styled.TabCounter>}>
              All
            </Tabs.Tab>
            <Tabs.Tab value="sales" rightSection={<Styled.TabCounter className="tab-counter">54</Styled.TabCounter>}>
              Sales
            </Tabs.Tab>
            <Tabs.Tab
              value="purchases"
              rightSection={<Styled.TabCounter className="tab-counter">34</Styled.TabCounter>}
            >
              Purchases
            </Tabs.Tab>
          </Tabs.List>
        </TabsContainer>
      </Flex>
      <Flex justify="space-between" p={16} w="100%">
        <Flex gap={16} w="100%">
          <InputSearch value={searchValue} handleChange={(event) => setSearchValue(event.currentTarget.value)} />
          <Selectbox
            w={260}
            defaultValue="All category"
            data={["All category", "Category 1", "Category 2", "Category 3"]}
          />
        </Flex>

        <Button style={{ flexShrink: 0 }} onClick={onButtonClick}>
          Add Product
        </Button>
      </Flex>

      <Table table={table} />
    </Styled.Wrapper>
  );
};
