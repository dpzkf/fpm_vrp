import { ETokens } from "../../../constants/tokens.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setToken } from "../../../utils/localStorage.ts";
import { TAuth, TRefreshSession, TUser } from "../../../types/model.ts";

export interface IUserState {
  user: TUser | null;
}

const initialState: IUserState = {
  user: null,
};

const meSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setTokens: (_state, action: PayloadAction<TAuth>) => {
      setToken(ETokens.AccessToken, action.payload.accessToken, action.payload.accessTokenExpiresAt);
      setToken(ETokens.RefreshToken, action.payload.refreshToken, action.payload.refreshTokenExpiresAt);
    },
    updateToken: (_state, action: PayloadAction<TRefreshSession>) => {
      setToken(ETokens.AccessToken, action.payload.accessToken, action.payload.accessTokenExpiresAt);
    },
  },
});

export default meSlice.reducer;

export const { logout, setUser, setTokens, updateToken } = meSlice.actions;
