import { FC, ReactNode } from "react";

import { Center, Group, UnstyledButton } from "@mantine/core";
import { SortDirection } from "@tanstack/react-table";
import * as Styled from "./styles";

import { getSortIcon } from "./utils.tsx";

type TSortButton = {
  children: ReactNode;
  order: SortDirection | false;
  handleSort: () => void;
};

export const SortButton: FC<TSortButton> = ({ handleSort, order = false, children }) => {
  return (
    <UnstyledButton onClick={handleSort}>
      <Group gap={8}>
        {children}
        <Styled.IconWrapper>
          <Center>{getSortIcon(order)}</Center>
        </Styled.IconWrapper>
      </Group>
    </UnstyledButton>
  );
};
