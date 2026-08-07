import React from "react";
import styles from "./FormField.module.css";
import Icon from "~/components/Icon/Icon";

export function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  errorText,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = "",
  as = "input", // input | textarea
  rows = 4,
  ...rest
}) {
  const isTextArea = as === "textarea";
  const Component = isTextArea ? "textarea" : "input";

  const inputClasses = [
    styles.formField__input,
    leftIcon ? styles["formField__input--has-icon-left"] : "",
    rightIcon ? styles["formField__input--has-icon-right"] : "",
    errorText ? styles["formField__input--error"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${styles.formField} ${className}`}>
      {label && (
        <label className={styles.formField__label}>
          {label}
          {required && <span className={styles.formField__required}>*</span>}
        </label>
      )}

      <div className={styles.formField__control}>
        {leftIcon && (
          <span className={`${styles.formField__icon} ${styles["formField__icon--left"]}`}>
            {typeof leftIcon === "string" ? <Icon name={leftIcon} size={18} /> : leftIcon}
          </span>
        )}

        <Component
          type={isTextArea ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={isTextArea ? rows : undefined}
          className={inputClasses}
          {...rest}
        />

        {rightIcon && (
          <span
            className={`${styles.formField__icon} ${styles["formField__icon--right"]}`}
            onClick={onRightIconClick}
          >
            {typeof rightIcon === "string" ? <Icon name={rightIcon} size={18} /> : rightIcon}
          </span>
        )}
      </div>

      {errorText && <span className={styles["formField__error-text"]}>{errorText}</span>}
      {helperText && !errorText && (
        <span className={styles["formField__helper-text"]}>{helperText}</span>
      )}
    </div>
  );
}

export default FormField;
