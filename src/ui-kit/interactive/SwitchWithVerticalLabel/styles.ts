import styled from "styled-components";

export const Wrapper = styled.div`
  .mantine-Switch-track {
    border-radius: var(--rounded-s);
    max-width: 58px;
    cursor: pointer;
  }

  .mantine-Switch-trackLabel {
    color: var(--white);
    font-family: Inter;
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;

    padding: 0 7px 0 6px;
  }

  .mantine-Switch-thumb {
    width: 22px;
    height: 22px;
    border-radius: var(--rounded-s);
  }

  .mantine-InputWrapper-label {
    font-family: Inter;
    font-size: 16px;
    color: var(--input-label);
    font-weight: 600;
    line-height: 18px;
  }

  .mantine-InputWrapper-description {
    font-family: Inter;
    font-size: 14px;
    color: var(--gray-700);
    font-weight: 500;
    line-height: 16px;
  }
`;
