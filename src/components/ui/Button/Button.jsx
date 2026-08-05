import React from "react";
import styles from "./Button.module.css";
import Icon from "~/components/Icon/Icon";

export function Button({
  children,
  variant = "contained", // contained | outlined | dark | ghost | gradient | danger
  size = "md", // sm | md | lg
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...rest
}) {
  const btnClasses = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled || isLoading ? styles["btn--disabled"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={btnClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...rest}
    >
      {isLoading ? (
        <span className={styles.btn__spinner} aria-hidden="true" />
      ) : (
        <>
          {leftIcon && (
            <span className={styles.btn__icon}>
              {typeof leftIcon === "string" ? <Icon name={leftIcon} size={18} /> : leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className={styles.btn__icon}>
              {typeof rightIcon === "string" ? <Icon name={rightIcon} size={18} /> : rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
