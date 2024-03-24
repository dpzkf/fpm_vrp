import { FC } from "react";
import { Outlet } from "react-router";

import * as Styled from "./styles";

export const AuthLayout: FC = () => {
  return (
    <Styled.Wrapper>
      <Outlet />
    </Styled.Wrapper>
  );
};
