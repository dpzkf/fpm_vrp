import styled from "styled-components";

interface InputWrapperProps {
  error?: string;
  $fullWidth?: boolean;
}

export const Wrapper = styled.div<InputWrapperProps>`
  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? "unset" : "300px")};

  & input {
    border-radius: var(--rounded-xs);
    font: var(--font-l);
    font-weight: 400;
    padding: 6px 14px;
    box-sizing: border-box;
    height: unset;
    line-height: 29px;
    color: var(--text-inputs);
  }

  & .mantine-gszoqu[data-invalid] {
    color: var(--primary-color);
    border: 1px solid #eda2a2;
  }

  & .mantine-Input-input[data-disabled] {
    border: 1px solid var(--gray-400);
    color: var(--gray-500);
    -webkit-text-fill-color: var(--gray-500);
    opacity: 1;
  }

  & label {
    color: var(--primary-text-color);
    font: var(--font-l);
    font-weight: 600;
    margin-bottom: 4px;
  }

  & .mantine-PasswordInput-rightSection {
    padding-right: 14px;
  }

  & .mantine-PasswordInput-input,
  & .mantine-Input-wrapper {
    border-radius: var(--rounded-s);
    height: 42px;
    max-width: 360px;
  }

  & .mantine-InputWrapper-error {
    font: var(--font-m);
    margin-bottom: -26.5px;
  }

  &:has(input:disabled) .mantine-Input-rightSection {
    display: flex;
  }

  .mantine-Input-section[data-position="right"] {
    bottom: 0;
    top: 0;
    right: 0;
    border-radius: 0px 4px 4px 0px;
    overflow: hidden;
    width: fit-content;
  }
`;
