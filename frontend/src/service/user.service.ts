import axios from "axios";
import ApiConstants from "../shared/constants/apiConstants";
import {
  getAccessToken,
  removeCookies,
  setCookies,
} from "../shared/utils/helpers";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: any, password: any) => {
  const response = await apiClient.post(ApiConstants?.LOGIN_API, {
    email,
    password,
  });

  const { userDetails, accessToken, refreshToken } = response?.data?.data;

  setCookies(userDetails, accessToken, refreshToken);

  return response.data.user;
};

export const register = async (username: any, email: any, password: any) => {
  const response = await apiClient.post(ApiConstants.REGISTER_API, {
    username,
    email,
    password,
  });

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

export default apiClient;
