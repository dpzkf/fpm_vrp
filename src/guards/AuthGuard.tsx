import { AppRoute } from "../constants/routes.ts";
import { useAuth } from "../hooks/common/useAuth";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (!isLoggedIn && !isLoading) {
    return <Navigate to={AppRoute.Auth.SignIn.Root.path} />;
  }

  return children;
};
