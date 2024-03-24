import { ESortDirections } from "../../../constants/sortDirections.ts";

import { SortDirection } from "@tanstack/react-table";

import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

export const getSortIcon = (order: SortDirection | false) => {
  if (!order) {
    return <IconSelector />;
  }

  return order === ESortDirections.Ascending ? <IconChevronUp /> : <IconChevronDown />;
};
