import { forwardRef } from "react";

import type { TextareaProps } from "@mantine/core";

import * as Styled from "./styles";

type TTextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & TextareaProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>((props, reference) => {
  return <Styled.Textarea ref={reference} {...props} />;
});
