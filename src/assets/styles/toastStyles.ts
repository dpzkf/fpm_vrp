import { ToastContainer } from "react-toastify";

import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-theme--colored {
    display: flex;
    align-items: center;
  }
  .Toastify__toast-theme--colored {
    color: var(--white);
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
    background: var(--role-green);
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
    background: var(--red);
  }
`;
