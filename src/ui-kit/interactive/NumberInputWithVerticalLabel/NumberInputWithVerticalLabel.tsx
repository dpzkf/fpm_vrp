import { Grid, Input as InputLib, NumberInput, NumberInputProps } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import * as Styled from "./styles";

type TInputProps = NumberInputProps & {
  label?: string | ReactNode;
  required?: boolean;
  error?: string;
  value?: number;
  fullWidth?: boolean;
  defaultValue?: string | number;
};

export const NumberInputWithVerticalLabel = forwardRef<HTMLInputElement, TInputProps>((props, reference) => {
  const { label, required, fullWidth, error, ...restProperties } = props;

  return (
    <Grid align="center">
      <Grid.Col span={4}>
        <Styled.Wrapper>
          <InputLib.Label required={required}>{label}</InputLib.Label>
        </Styled.Wrapper>
      </Grid.Col>
      <Grid.Col span={8}>
        <Styled.Wrapper fullWidth={fullWidth}>
          <InputLib.Wrapper required={required} error={error}>
            <NumberInput ref={reference} hideControls {...restProperties} />
          </InputLib.Wrapper>
        </Styled.Wrapper>
      </Grid.Col>
    </Grid>
  );
});
