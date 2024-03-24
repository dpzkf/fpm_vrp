import { ButtonProps } from "@mantine/core";
import { forwardRef } from "react";
import * as Styled from "./styles";

export type variant = "primary" | "secondary" | "text" | "outlined";

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    /**
     * The variant to use.
     *
     * @default 'primary'
     */
    variant?: variant;
    /**
     * The size of the button.
     *
     * @default 'xl'
     */
    size?: "md" | "xl";
    /**
     * If `true`, the button will take up the full width of its container.
     *
     * @default false
     */
    fullWidth?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, TButtonProps>((props, reference) => {
  const { onClick, children, size = "xl", fullWidth, variant = "primary", ...restProps } = props;
  return (
    <>
      <Styled.Button
        ref={reference}
        onClick={onClick}
        size={size}
        fullWidth={fullWidth}
        variant={variant}
        {...restProps}
      >
        {children}
      </Styled.Button>
    </>
  );
});
