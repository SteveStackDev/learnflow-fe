import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type = "info", title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, type, title, message };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const toast = {
    show: showToast,
    success: (message, title = "Thành công") => showToast({ type: "success", title, message }),
    error: (message, title = "Lỗi") => showToast({ type: "error", title, message }),
    warning: (message, title = "Cảnh báo") => showToast({ type: "warning", title, message }),
    info: (message, title = "Thông báo") => showToast({ type: "info", title, message }),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

const dummyToast = {
  show: () => {},
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
  remove: () => {},
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { toasts: [], showToast: () => {}, removeToast: () => {}, toast: dummyToast };
  }
  return context;
}
