import styled from "styled-components";

export const StyledModal = styled.div`
  min-width: 620px;

  .modal-header {
    padding: 16px 20px;
    background-color: var(--modal-header-bg);
  }

  .modal-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 110%;
  }

  .modal-body {
    padding: 20px;
  }

  .close > svg {
    color: var(--black);
  }

  .modal-footer {
    padding: 16px;
  }
`;
