import { FC, PropsWithChildren } from "react";

import { Text as TextLib, TextProps } from "@mantine/core";

type TTextProps = TextProps & PropsWithChildren;

export const Text: FC<TTextProps> = (props) => {
  const { children, size = "1rem", ...restProps } = props;
  return (
    <TextLib size={size} ff="var(-font-family-main)" lh="135%" {...restProps}>
      {children}
    </TextLib>
  );
};
