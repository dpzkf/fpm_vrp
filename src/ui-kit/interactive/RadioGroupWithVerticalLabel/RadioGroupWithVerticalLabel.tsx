import { Grid, Group, Input as InputLib, RadioGroupProps } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import * as Styled from "./styles";

type TInputProps = RadioGroupProps & {
  label?: string | ReactNode;
  error?: string;
  children: ReactNode;
  required?: boolean;
};

export const RadioGroupWithVerticalLabel = forwardRef<HTMLDivElement, TInputProps>((props, ref) => {
  const { label, value, children, required, error, ...rest } = props;

  return (
    <Grid align="center">
      <Grid.Col span={4}>
        <Styled.Wrapper>
          <InputLib.Label required={required}>{label}</InputLib.Label>
        </Styled.Wrapper>
      </Grid.Col>
      <Grid.Col span={8}>
        <Styled.RadioGroup ref={ref} value={value} required={required} error={error} {...rest}>
          <Group gap={24}>{children}</Group>
        </Styled.RadioGroup>
      </Grid.Col>
    </Grid>
  );
});
