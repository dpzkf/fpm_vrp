import { FC } from "react";

import type { TabsProps } from "@mantine/core";

import * as Styled from "./styles";

type TTabsProps = TabsProps;

export const Tabs: FC<TTabsProps> = (props) => {
  const { children } = props;
  return <Styled.Tabs>{children}</Styled.Tabs>;
};
