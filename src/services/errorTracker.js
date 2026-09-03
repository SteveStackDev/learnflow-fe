import { envConfig } from "~/config/env.config";

/**
 * FySet Error Tracker Service
 * Quản lý và ghi nhận lỗi giao diện tập trung (Console Logging)
 */

let isInitialized = false;

/**
 * Khởi tạo dịch vụ theo dõi lỗi
 */
export function initErrorTracker() {
  if (isInitialized) return;

  if (envConfig.isDev) {
    console.log(`[FySet ErrorTracker] Khởi tạo bộ ghi log lỗi ở chế độ ${envConfig.appEnv}.`);
  }

  isInitialized = true;
}

/**
 * Bắt và in chi tiết ngoại lệ / lỗi runtime
 * @param {Error|any} error - Đối tượng lỗi ngoại lệ
 * @param {object} [errorInfo={}] - React component stack hoặc thông tin bổ sung
 * @param {object} [extraContext={}] - Dữ liệu ngữ cảnh bổ sung
 */
export function captureException(error, errorInfo = {}, extraContext = {}) {
  // Ghi log chi tiết ra Console để lập trình viên xem và debug
  console.error("[FySet ErrorTracker] Phát hiện ngoại lệ runtime:", {
    error: error?.message || error,
    stack: error?.stack,
    componentStack: errorInfo?.componentStack || errorInfo,
    environment: envConfig.appEnv,
    timestamp: new Date().toISOString(),
    ...extraContext,
  });
}

export default {
  initErrorTracker,
  captureException,
};
