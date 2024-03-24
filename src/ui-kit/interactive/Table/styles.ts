import { Flex, Table } from "@mantine/core";
import styled from "styled-components";

export const TableWrapper = styled(Table)`
  .mantine-Table-th:first-child,
  .mantine-Table-td:first-child {
    padding-left: 24px;
  }

  .mantine-Table-th:last-child,
  .mantine-Table-td:last-child {
    padding-right: 24px;
  }

  .mantine-Table-th,
  .mantine-Table-td {
    padding-block: 10px;
    padding-inline: 8px;
  }

  .mantine-Table-th {
    color: var(--primary-text-color);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .mantine-Table-td {
    color: var(--gray-700);
    font-size: 14px;
    font-weight: 600;

    vertical-align: middle;
  }

  .mantine-Table-thead {
    background-color: var(--table-header-bg);

    & .mantine-Table-tr {
      border-bottom: 1px solid var(--table-header-border);
    }
  }
`;

export const TableFooter = styled(Flex)`
  border-top: 1px solid var(--table-header-border);

  background-color: var(--table-footer-bg);

  border-radius: 0 0 var(--rounded-s) var(--rounded-s);

  padding: 4px 24px;
`;

export const PaginationWrapper = styled.div`
  .mantine-Pagination-control {
    border: none;
    background-color: transparent;
  }
`;

export const SelectWrapper = styled.div`
  max-width: 70px;

  .mantine-Select-input {
    background-color: transparent;
  }

  .mantine-Select-section > svg {
    width: 16px;
    height: 16px;
  }
`;
