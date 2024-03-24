import { Switch as SwitchLib } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import * as Styled from "./styles.ts";

type TSwitchProps = {
  label?: string | ReactNode;
  required?: boolean;
  error?: string;
  value?: boolean;
  onChange?: () => void;
};

export const Switch = forwardRef<HTMLInputElement, TSwitchProps>((props, reference) => {
  const { error, value, ...restProperties } = props;

  return (
    <Styled.Wrapper>
      <SwitchLib
        ref={reference}
        checked={value}
        error={error}
        onLabel="ON"
        offLabel="OFF"
        size="lg"
        {...restProperties}
      />
    </Styled.Wrapper>
  );
});
