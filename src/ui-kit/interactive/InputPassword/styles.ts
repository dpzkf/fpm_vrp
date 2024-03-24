import styled from "styled-components";

interface InputWrapperProps {
  error?: string;
  fullWidth?: boolean;
}

export const Wrapper = styled.div<InputWrapperProps>`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? "unset" : "300px")};

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

  & .mantine-PasswordInput-label {
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
    border-radius: var(--rounded-xs);
    height: 42px;
  }

  & .mantine-InputWrapper-error {
    font: var(--font-m);
    margin-bottom: -26.5px;
  }

  &:has(input:disabled) .mantine-Input-rightSection {
    display: flex;
  }
  .mantine-Input-rightSection {
    right: 14px;
    width: fit-content;
  }

  & .mantine-PasswordInput-visibilityToggle {
    width: 24px;
    height: 24px;
    right: 14px;
  }
`;
