import axios from "axios";

/**
 * FySet Centralized Axios API Client
 * - Configured for Vite Proxy (/api/v1) & direct fallback
 * - withCredentials: true (Mandatory for Session Cookie authentication)
 * - Automatic payload unwrap: returns response.data.data
 * - Standardized error formatting matching Backend ApiError
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request Interceptor: Attach temporary token if available (e.g. for OTP password recovery flow)
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("fyset_temp_token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unwrap payload and standardize errors
api.interceptors.response.use(
  (response) => {
    // If backend returns { message, data }, unwrap data directly for clean usage
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const errorResponse = error.response?.data;
    const message =
      errorResponse?.message ||
      error.message ||
      "Đã có lỗi xảy ra trong quá trình xử lý, vui lòng thử lại!";

    const standardizedError = {
      message,
      errors: errorResponse?.errors || null,
      status: error.response?.status || 500,
      originalError: error,
    };

    return Promise.reject(standardizedError);
  }
);

export default api;
