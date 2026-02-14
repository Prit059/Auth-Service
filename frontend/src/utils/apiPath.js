export const BASE_URL = "http://localhost:8000"

export const API_PATHS = {

  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: (token) =>  `/auth/reset-password/${token}`,
    VERIFY_EMAIL: (token) => `/auth/verify-email/${token}`,
  }
}