import { forwardRef, ReactNode } from "react";

import { PasswordInput as InputLib, PasswordInputProps } from "@mantine/core";

import { IconEye, IconEyeOff } from "@tabler/icons-react";

import * as Styled from "./styles";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  PasswordInputProps & {
    label?: string | ReactNode;
    required?: boolean;
    error?: string;
    component?: any;
    value?: string;
    fullWidth?: boolean;
  };

export const InputPassword = forwardRef<HTMLInputElement, TInputProps>((props, reference) => {
  const { label, required, fullWidth, error, ...restProperties } = props;

  return (
    <Styled.Wrapper fullWidth={fullWidth}>
      <InputLib
        ref={reference}
        error={error}
        label={label}
        required={required}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? (
            <IconEyeOff
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          ) : (
            <IconEye
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          )
        }
        {...restProperties}
      />
    </Styled.Wrapper>
  );
});
