import { envConfig } from "~/config/env.config";

/**
 * Custom Error Class for API Exceptions
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Core HTTP Request Handler
 * @param {string} endpoint - Relative path (e.g., "/contests") or full URL
 * @param {RequestInit} [options={}] - Custom fetch options
 * @returns {Promise<any>}
 */
export async function request(endpoint, options = {}) {
  const {
    params,
    headers = {},
    timeout = envConfig.apiTimeout,
    mockFallback = null,
    ...customConfig
  } = options;

  // 1. If mock is explicitly enabled or forced and fallback exists, return mock
  if (envConfig.enableMock && mockFallback !== null) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return typeof mockFallback === "function" ? mockFallback() : mockFallback;
  }

  // 2. Build Full URL & Query String
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${envConfig.apiBaseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  // 3. Prepare Default Headers (Auth Token support)
  const token = typeof window !== "undefined" ? localStorage.getItem("fyset_token") : null;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  // 4. Set Up Abort Timeout Controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: defaultHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    const data = contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const errorMessage =
        (typeof data === "object" && data?.message) ||
        `HTTP Error ${response.status}: ${response.statusText}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new ApiError(`Request timeout after ${timeout}ms`, 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or unexpected exception
    throw new ApiError(error.message || "Network error occurred", 0);
  }
}

/**
 * Conveniences HTTP Verb Shorthands
 */
export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  patch: (endpoint, body, options) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
};

export default apiClient;
