import { FC } from "react";
import { TextProps } from "@mantine/core";
import * as Styled from "./styles";

type TTextProps = React.HTMLAttributes<HTMLParagraphElement> &
  TextProps & {
    size?: string;
  };

export const Text: FC<TTextProps> = (props) => {
  const { children, size = "16px", ...restProps } = props;
  return (
    <Styled.Text size={size} {...restProps}>
      {children}
    </Styled.Text>
  );
};
