import ApiConstants from "../shared/constants/apiConstants";
import {
  getAccessToken,
  removeCookies,
  setCookies,
} from "../shared/utils/helpers";
import CommonService from "./common.service";

export const login = async (email: any, password: any) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "POST",
    ApiConstants?.LOGIN_API,
    {
      email,
      password,
    }
  );

  const { userDetails, accessToken, refreshToken } = response?.data;

  setCookies(userDetails, accessToken, refreshToken);

  return response.data.user;
};

export const register = async (username: any, email: any, password: any) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "POST",
    ApiConstants.REGISTER_API,
    {
      username,
      email,
      password,
    }
  );

  const { userDetails, accessToken, refreshToken } = response?.data?.data;

  setCookies(userDetails, accessToken, refreshToken);

  return response.data.user;
};

export const logout = () => {
  removeCookies();
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const getUser = () => {
  const response = CommonService?.invokeHttpCallFetch(
    "GET",
    ApiConstants.GET_USER_API
  );
  return response;
};
