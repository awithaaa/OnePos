// src/services/token.ts
export const ACCESS_KEY = "access_token";
export const REFRESH_KEY = "refresh_token";

export const saveTokens = (access: string) => {
  localStorage.setItem(ACCESS_KEY, access);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_KEY);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_KEY, token);
};
