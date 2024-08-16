import Cookies from "js-cookie";
import Constants from "../constants/constants";

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const setCookies = (
  userDetails: any,
  accessToken: any,
  refreshToken: any
) => {
  try {
    Cookies.set(Constants?.TOKEN_NAMES?.ACCESS_TOKEN, accessToken, {
      expires: 1 / 24,
    });
    Cookies.set(Constants?.TOKEN_NAMES?.REFRESH_TOKEN, refreshToken, {
      expires: 7,
    });
    Cookies.set(
      Constants?.TOKEN_NAMES?.USER_DETAILS,
      JSON.stringify(userDetails)
    );
  } catch (error) {
    console.error("Failed to set cookies:", error);
  }
};

export const removeCookies = () => {
  try {
    Cookies.remove(Constants?.TOKEN_NAMES?.ACCESS_TOKEN);
    Cookies.remove(Constants?.TOKEN_NAMES?.REFRESH_TOKEN);
    Cookies.remove(Constants?.TOKEN_NAMES?.USER_DETAILS);
  } catch (error) {
    console.error("Failed to remove cookies:", error);
  }
};

export const getAccessToken = () => {
  return Cookies.get(Constants?.TOKEN_NAMES?.ACCESS_TOKEN);
};

export const getUserDetails = () => {
  const userDetails = Cookies.get(Constants?.TOKEN_NAMES?.USER_DETAILS);
  return userDetails ? JSON.parse(userDetails) : null;
};
