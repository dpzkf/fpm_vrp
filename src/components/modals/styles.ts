import { Modal } from "@mantine/core";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  .mantine-Modal-content {
    min-width: 620px;
    border-radius: var(--rounded-s);
  }

  .modal-header {
    padding: 16px 20px;
    background-color: var(--modal-header-bg);
  }

  .modal-title {
    font-weight: 700;
    font-size: 22px;
    line-height: 110%;
  }

  .mantine-Modal-body {
    padding: 0;
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