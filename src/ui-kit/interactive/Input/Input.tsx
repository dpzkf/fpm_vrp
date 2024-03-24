import { ReactNode, forwardRef } from "react";
import { Input as InputLib, InputProps } from "@mantine/core";
import * as Styled from "./styles";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    label?: string | ReactNode;
    required?: boolean;
    error?: string;
    component?: any;
    value?: string;
    fullWidth?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (props, reference) => {
    const { label, required, fullWidth, error, ...restProperties } = props;

    return (
      <Styled.Wrapper fullWidth={fullWidth}>
        <InputLib.Wrapper error={error} label={label} required={required}>
          <InputLib ref={reference} error={error} {...restProperties} />
        </InputLib.Wrapper>
      </Styled.Wrapper>
    );
  }
);
