import { FC, PropsWithChildren } from "react";

import { createPolymorphicComponent, TextProps } from "@mantine/core";

import * as Styled from "./styles.ts";
import { TText } from "./styles.ts";

type TTextProps = TextProps &
  PropsWithChildren & {
    //size in px
    textSize?: number;
    bulletColor?: string;
  };

const StyledText = createPolymorphicComponent<"p", TextProps & TText>(Styled.Text);

export const Text: FC<TTextProps> = (props) => {
  const { children, textSize = 16, bulletColor = "", ...restProps } = props;
  return (
    <StyledText {...restProps} $textSize={textSize} $bulletColor={bulletColor}>
      {children}
    </StyledText>
  );
};
