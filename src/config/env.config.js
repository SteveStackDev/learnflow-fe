/**
 * FySet Centralized Environment Configuration
 */

const getEnv = (key, defaultValue = "") => {
  return import.meta.env[key] !== undefined
    ? import.meta.env[key]
    : defaultValue;
};

export const envConfig = {
  appTitle: getEnv("VITE_APP_TITLE", "FySet"),
  appEnv: getEnv("VITE_APP_ENV", import.meta.env.MODE || "development"),
  apiBaseUrl: getEnv("VITE_API_BASE_URL", "http://localhost:5000/api"),
  enableMock: String(getEnv("VITE_ENABLE_MOCK", "true")).toLowerCase() === "true",
  apiTimeout: Number(getEnv("VITE_API_TIMEOUT", 10000)) || 10000,
  sentryDsn: getEnv("VITE_SENTRY_DSN", ""),

  // Environment Check Helpers
  isDev: import.meta.env.DEV || getEnv("VITE_APP_ENV") === "development",
  isProd: import.meta.env.PROD || getEnv("VITE_APP_ENV") === "production",
};

export default envConfig;
