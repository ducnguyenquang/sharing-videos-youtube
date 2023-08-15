import Cookies from "js-cookie";

export type CookiesResponse = string | undefined | void;

export const STORAGE_COOKIE_KEYS = {
  ACCESS_TOKEN: "access-token",
  CURRENT_USER: "current-user",
};

export const setAccessToken = (accessToken: string): CookiesResponse => {
  Cookies.set(STORAGE_COOKIE_KEYS.ACCESS_TOKEN, accessToken, { expires: 365 });
};

export const getAccessToken = (): CookiesResponse =>
  Cookies.get(STORAGE_COOKIE_KEYS.ACCESS_TOKEN);

export const setCurrentUser = (currentUser: string): CookiesResponse =>
  Cookies.set(STORAGE_COOKIE_KEYS.CURRENT_USER, currentUser, { expires: 365 });

export const getCurrentUser = (): CookiesResponse =>
  Cookies.get(STORAGE_COOKIE_KEYS.CURRENT_USER);

export const clear = (): CookiesResponse => {
  Cookies.remove(STORAGE_COOKIE_KEYS.ACCESS_TOKEN);
  Cookies.remove(STORAGE_COOKIE_KEYS.CURRENT_USER);
  sessionStorage.clear();
};
