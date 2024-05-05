import { forwardRef } from "react";

import { ButtonProps, createPolymorphicComponent } from "@mantine/core";

import { stylesProps } from "./styles";
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

const StyledButton = createPolymorphicComponent<"button", ButtonProps & stylesProps>(Styled.Button);

export const Button = forwardRef<HTMLButtonElement, TButtonProps>((props, reference) => {
  const { onClick, children, size = "xl", fullWidth, variant = "primary", ...restProps } = props;
  return (
    <StyledButton ref={reference} onClick={onClick} size={size} $fullWidth={fullWidth} variant={variant} {...restProps}>
      {children}
    </StyledButton>
  );
});
