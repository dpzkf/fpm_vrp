import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";
import { SortDirection } from "@tanstack/react-table";

import { ESortDirections } from "../../../constants/sortDirections.ts";

export const getSortIcon = (order: SortDirection | false) => {
  if (!order) {
    return <IconSelector />;
  }

  return order === ESortDirections.Ascending ? <IconChevronUp /> : <IconChevronDown />;
};
