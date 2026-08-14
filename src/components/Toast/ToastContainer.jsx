import React from "react";
import { useToast } from "~/context/ToastContext.jsx";
import Alert from "~/components/Alert/Alert.jsx";
import styles from "./ToastContainer.module.css";

export function ToastContainer() {
  const { toasts = [], removeToast } = useToast() || {};

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className={styles["toast-container"]}
      role="region"
      aria-label="Thông báo hệ thống"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className={styles["toast-item"]}>
          <Alert
            type={toast.type}
            title={toast.title}
            onClose={() => removeToast?.(toast.id)}
            dismissable
          >
            {toast.message}
          </Alert>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;