import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { TLayout } from "../../types";

import * as Styled from "./styles";

export const AppLayout: FC<TLayout> = ({ isAdmin = false }) => {
  return (
    <Styled.Wrapper>
      <Sidebar isAdmin={isAdmin} />
      <Styled.ContentContainer>
        <Header />
        <Styled.ContentWrapper>
          <Outlet />
        </Styled.ContentWrapper>
      </Styled.ContentContainer>
    </Styled.Wrapper>
  );
};
