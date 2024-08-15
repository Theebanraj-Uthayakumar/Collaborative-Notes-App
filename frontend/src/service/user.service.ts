import axios from "axios";
import ApiConstants from "../shared/constants/apiConstants";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
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

  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  return response.data.user;
};

export const register = async (username: any, email: any, password: any) => {
  const response = await apiClient.post(ApiConstants.REGISTER_API, {
    username,
    email,
    password,
  });

  const { userDetails, accessToken, refreshToken } = response?.data?.data;

  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("userDetails");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export default apiClient;
