import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("fyset_temp_token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
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
  },
);

export default api;
