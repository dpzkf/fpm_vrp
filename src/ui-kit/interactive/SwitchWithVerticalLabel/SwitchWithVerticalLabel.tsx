import { forwardRef, ReactNode } from "react";

import { Flex, Input as InputLib, Switch as SwitchLib } from "@mantine/core";

import * as Styled from "./styles.ts";

type TSwitchProps = {
  label?: string | ReactNode;
  description?: string | ReactNode;
  required?: boolean;
  error?: string;
  value?: boolean;
  onChange?: () => void;
};

export const SwitchWithVerticalLabel = forwardRef<HTMLInputElement, TSwitchProps>((props, reference) => {
  const { error, value, required, label, description, ...restProperties } = props;

  return (
    <Flex w="100%" align="center" justify="space-between">
      <Styled.Wrapper>
        <InputLib.Label required={required}>{label}</InputLib.Label>
        <InputLib.Description>{description}</InputLib.Description>
      </Styled.Wrapper>

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
    </Flex>
  );
});
