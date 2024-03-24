import { forwardRef } from "react";

import type { SelectProps } from "@mantine/core";

import * as Styled from "./styles";
import "./selectbox.css";

type TSelectBoxProps = SelectProps;

export const Selectbox = forwardRef<HTMLInputElement, TSelectBoxProps>((props, reference) => {
  return <Styled.Selectbox {...props} withCheckIcon={false} ref={reference}></Styled.Selectbox>;
});
