import React, { useId } from "react";
import styles from "./FormField.module.css";
import Icon from "~/components/Icon/Icon";

export function FormField({
  id: customId,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
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
  const generatedId = useId();
  const fieldId = customId || generatedId;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

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
        <label htmlFor={fieldId} className={styles.formField__label}>
          {label}
          {required && <span className={styles.formField__required}> *</span>}
        </label>
      )}

      <div className={styles.formField__control}>
        {/* Left Icon (Chỉ hiển thị, không clickable) */}
        {leftIcon && (
          <span className={`${styles.formField__icon} ${styles["formField__icon--left"]}`}>
            {typeof leftIcon === "string" ? <Icon name={leftIcon} size={18} /> : leftIcon}
          </span>
        )}

        <Component
          id={fieldId}
          type={isTextArea ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={isTextArea ? rows : undefined}
          className={inputClasses}
          aria-invalid={Boolean(errorText)}
          aria-describedby={
            errorText ? errorId : helperText ? helperId : undefined
          }
          {...rest}
        />

        {/* Right Icon (Có thể tương tác bằng Phím/Chuột nếu truyền onRightIconClick) */}
        {rightIcon && (
          onRightIconClick ? (
            <button
              type="button"
              onClick={onRightIconClick}
              disabled={disabled}
              className={`${styles.formField__icon} ${styles["formField__icon--right"]} ${styles["formField__icon--button"]}`}
              aria-label="Thao tác bổ sung"
            >
              {typeof rightIcon === "string" ? <Icon name={rightIcon} size={18} /> : rightIcon}
            </button>
          ) : (
            <span className={`${styles.formField__icon} ${styles["formField__icon--right"]}`}>
              {typeof rightIcon === "string" ? <Icon name={rightIcon} size={18} /> : rightIcon}
            </span>
          )
        )}
      </div>

      {/* Thông báo Lỗi / Helper Text */}
      {errorText && (
        <span id={errorId} className={styles["formField__error-text"]} role="alert">
          {errorText}
        </span>
      )}
      {helperText && !errorText && (
        <span id={helperId} className={styles["formField__helper-text"]}>
          {helperText}
        </span>
      )}
    </div>
  );
}

export default FormField;