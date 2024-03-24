import type { CheckboxProps } from "@mantine/core";
import { forwardRef } from "react";
import * as Styled from "./styles";

type TCheckboxProps = CheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, TCheckboxProps>((props, reference) => {
  const { error, checked, size = "xs" } = props;
  return <Styled.Checkbox checked={checked} size={size} error={error} ref={reference} {...props} />;
});
