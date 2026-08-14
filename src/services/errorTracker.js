import { envConfig } from "~/config/env.config";

/**
 * FySet Error Tracker Service
 * Centralized error reporting layer (Sentry integration ready)
 */

let isInitialized = false;

/**
 * Initialize Error Tracking Service
 */
export function initErrorTracker() {
  if (isInitialized) return;

  if (envConfig.sentryDsn && typeof window !== "undefined" && window.Sentry) {
    try {
      window.Sentry.init({
        dsn: envConfig.sentryDsn,
        environment: envConfig.appEnv,
        tracesSampleRate: 1.0,
      });
      console.log(`[FySet ErrorTracker] Sentry initialized in ${envConfig.appEnv} mode.`);
    } catch (err) {
      console.warn("[FySet ErrorTracker] Failed to initialize Sentry:", err);
    }
  }

  isInitialized = true;
}

/**
 * Capture runtime exception & send telemetry
 * @param {Error|any} error - Exception object
 * @param {object} [errorInfo={}] - React component stack or additional details
 * @param {object} [extraContext={}] - Custom user/page context
 */
export function captureException(error, errorInfo = {}, extraContext = {}) {
  // Always log error details in console for development & debugging
  console.error("[FySet ErrorTracker] Captured runtime exception:", {
    error,
    componentStack: errorInfo?.componentStack || errorInfo,
    environment: envConfig.appEnv,
    timestamp: new Date().toISOString(),
    ...extraContext,
  });

  // If Sentry SDK is present on window, forward to Sentry
  if (typeof window !== "undefined" && window.Sentry && typeof window.Sentry.captureException === "function") {
    try {
      window.Sentry.withScope((scope) => {
        if (errorInfo?.componentStack) {
          scope.setExtra("componentStack", errorInfo.componentStack);
        }
        if (Object.keys(extraContext).length > 0) {
          scope.setExtras(extraContext);
        }
        scope.setTag("app_env", envConfig.appEnv);
        window.Sentry.captureException(error);
      });
    } catch (sentryErr) {
      console.warn("[FySet ErrorTracker] Error pushing to Sentry:", sentryErr);
    }
  }
}

export default {
  initErrorTracker,
  captureException,
};
