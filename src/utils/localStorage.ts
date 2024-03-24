import { ETokens } from "../constants/tokens.ts";

export const setToken = (tokenType: ETokens, token: string, expiresAt: number) => {
  if (tokenType === ETokens.AccessToken) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("accessTokenExpiresAt", String(expiresAt));
  } else {
    localStorage.setItem("refreshToken", token);
    localStorage.setItem("refreshTokenExpiresAt", String(expiresAt));
  }
};

export const getToken = (key: ETokens) => {
  const token = localStorage.getItem(key);
  if (!token) {
    return;
  }
  const expiresAt = Number(localStorage.getItem(`${key}ExpiresAt`));

  const now = new Date();

  if (now.getTime() > expiresAt) {
    localStorage.removeItem(key);
    return;
  }
  return token;
};
