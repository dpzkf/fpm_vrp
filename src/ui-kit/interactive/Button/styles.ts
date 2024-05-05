import { ReactNode } from "react";

import { Button as ButtonLib } from "@mantine/core";

import styled, { css } from "styled-components";

import { variant } from "./Button.tsx";

export type stylesProps = {
  size?: "md" | "xl";
  $fullWidth?: boolean;
  variant?: variant;
  children: ReactNode;
};

export const Button = styled(ButtonLib)<stylesProps>`
  padding: ${({ size }) => (size === "xl" ? "12px 22px" : "7px 16px")};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "unset")};
  font-size: var(--font-size-l);
  font-weight: 600;
  line-height: 18.5px;
  color: var(--white);
  background-color: var(--primary-color);
  border-radius: var(--rounded-xs);
  height: unset;
  transition: 0.4s ease-in-out;
  box-sizing: border-box;

  &:hover {
    background-color: var(--blue-600);
  }

  &:disabled {
    background-color: var(--disabled-button-bg);
  }

  &[data-loading]::before {
    background-color: transparent;
  }

  &[data-loading] {
    background-color: var(--disabled-button-bg);
  }

  ${({ variant }) =>
    variant === "text" &&
    css`
      padding: 4px 6px;
      color: var(--primary-color);
      background-color: transparent;
      border: none;

      &:hover {
        background-color: var(--blue-300);
      }

      &:disabled {
        background-color: transparent;
        color: var(--disabled-button-bg);
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    css`
      padding: 12px 22px;
      color: var(--primary-color);
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: var(--rounded-xs);

      &:hover {
        background-color: var(--blue-300);
        border: 1px solid var(--button-outlined-border-color);
      }

      &:disabled {
        background-color: transparent;
        color: var(--disabled-button-bg);
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      padding: 12px 22px;
      color: var(--gray-700);
      background-color: transparent;
      border: 1px solid var(--text-secondary);
      border-radius: var(--rounded-xs);

      &:hover {
        background-color: transparent;
        border: 1px solid var(--text-secondary);
      }
    `}
`;
