import { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./Alert.module.css";

const ICON_MAP = {
  error: "Shield",
  success: "CheckCircle",
  warning: "Flame",
  info: "HelpCircle",
};

export function Alert({
  type = "info",
  title,
  children,
  onClose,
  dismissable = true,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const iconName = ICON_MAP[type] || ICON_MAP.info;

  return (
    <div
      className={`${styles.alert} ${styles[`alert--${type}`]} ${className}`}
      role="alert"
    >
      <div className={styles["alert__icon-box"]}>
        <Icon name={iconName} size={20} />
      </div>
      <div className={styles.alert__body}>
        {title && <h4 className={styles.alert__title}>{title}</h4>}
        {children && <div className={styles.alert__desc}>{children}</div>}
      </div>
      {dismissable && (
        <button
          type="button"
          onClick={handleClose}
          className={styles["alert__close-btn"]}
          aria-label="Đóng thông báo"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
}

export default Alert;
