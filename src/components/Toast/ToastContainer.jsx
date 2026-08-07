import { useToast } from "~/context/ToastContext.jsx";
import Alert from "~/components/Alert/Alert.jsx";
import styles from "./ToastContainer.module.css";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className={styles["toast-container"]}>
      {toasts.map((t) => (
        <div key={t.id} className={styles["toast-item"]}>
          <Alert type={t.type} title={t.title} onClose={() => removeToast(t.id)} dismissable={true}>
            {t.message}
          </Alert>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
