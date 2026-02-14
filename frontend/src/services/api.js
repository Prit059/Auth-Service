import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

// ========== AUTH APIS ==========

export const register = (userData) => {
  return axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);
};

export const login = (credentials) => {
  return axiosInstance.post(API_PATHS.AUTH.LOGIN, credentials);
};

export const getProfile = () => {
  return axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
};

export const forgotPassword = (email) => {
  return axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
};

export const resetPassword = (token, newpassword) => {
  return axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD(token), { newpassword });
};

export const verifyEmail = (token) => {
  return axiosInstance.get(API_PATHS.AUTH.VERIFY_EMAIL(token));
};