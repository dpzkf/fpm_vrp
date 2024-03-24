import { FC } from "react";
import * as Styled from "./styles";

import type { TabsProps } from "@mantine/core";

type TTabsProps = TabsProps;

export const Tabs: FC<TTabsProps> = (props) => {
  const { children } = props;
  return <Styled.Tabs>{children}</Styled.Tabs>;
};
