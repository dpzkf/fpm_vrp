import { createSelector } from "@reduxjs/toolkit";
import { IUserState } from "./meSlice.ts";
import { RootState } from "../../store.ts";

export const getMySelector = createSelector(
  (state: RootState) => state.userState,
  ({ user }: IUserState) => user,
);

export const isAuthorized = createSelector(
  (state: RootState) => state.userState,
  ({ user }: IUserState) => !!user,
);
