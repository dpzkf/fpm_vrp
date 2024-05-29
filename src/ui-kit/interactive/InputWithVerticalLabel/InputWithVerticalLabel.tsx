import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import { Grid, Input as InputLib, InputProps } from "@mantine/core";

import * as Styled from "./styles";

type TInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    label?: string | ReactNode;
    required?: boolean;
    error?: string;
    value?: string | number;
    fullWidth?: boolean;
    disabled?: boolean;
  };

export const InputWithVerticalLabel = forwardRef<HTMLInputElement, TInputProps>((props, reference) => {
  const { label, required, fullWidth, error, disabled = false, ...restProperties } = props;
  return (
    <Grid align="center" w="100%">
      <Grid.Col span={4}>
        <Styled.Wrapper>
          <InputLib.Label required={required}>{label}</InputLib.Label>
        </Styled.Wrapper>
      </Grid.Col>
      <Grid.Col span={8}>
        <Styled.Wrapper $fullWidth={fullWidth}>
          <InputLib.Wrapper required={required} error={error}>
            <InputLib ref={reference} error={error} disabled={disabled} {...restProperties} />
          </InputLib.Wrapper>
        </Styled.Wrapper>
      </Grid.Col>
    </Grid>
  );
});
