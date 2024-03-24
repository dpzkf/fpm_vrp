import { FC } from "react";
import { TLayout } from "../../types";
import * as Styled from "./styles";

import { Logo, Text } from "../../ui-kit";
import { MenuItem } from "./components/MenuItem";
import { Flex } from "@mantine/core";

import {
  MENU_ITEMS_MAIN,
  MENU_ITEMS_OTHERS,
  MENU_ITEMS_ADMIN,
  MENU_ITEMS_OTHERS_ADMIN,
} from "../../constants/sidebar-items";

export const Sidebar: FC<TLayout> = ({ isAdmin }) => {
  return (
    <Styled.SidebarWrapper>
      <Logo />
      <Flex direction="column" justify="space-between" h="100%" mt={32}>
        <Flex direction="column" gap={8} w="100%">
          <Text pl={12} size="10px" fw="700" color="var(--gray-text-color)">
            MAIN
          </Text>
          {isAdmin
            ? MENU_ITEMS_ADMIN.map((item) => (
                <MenuItem
                  name={item.name}
                  url={item.url}
                  key={item.url}
                  internalLinks={item?.internalLinks}
                  icon={item?.icon}
                />
              ))
            : MENU_ITEMS_MAIN.map((item) => (
                <MenuItem
                  name={item.name}
                  url={item.url}
                  key={item.url}
                  internalLinks={item?.internalLinks}
                  icon={item?.icon}
                />
              ))}
        </Flex>
        <Flex direction="column" gap={8} w="100%">
          <Text pl={12} size="10px" fw="700" color="var(--gray-text-color)">
            OTHERS
          </Text>
          {isAdmin
            ? MENU_ITEMS_OTHERS_ADMIN.map((item) => (
                <MenuItem
                  name={item.name}
                  url={item.url}
                  key={item.url}
                  internalLinks={item?.internalLinks}
                  icon={item?.icon}
                />
              ))
            : MENU_ITEMS_OTHERS.map((item) => (
                <MenuItem name={item.name} url={item.url} key={item.url} icon={item?.icon} />
              ))}
        </Flex>
      </Flex>
    </Styled.SidebarWrapper>
  );
};
