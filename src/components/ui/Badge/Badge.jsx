import React from "react";
import styles from "./Badge.module.css";
import Icon from "~/components/Icon/Icon";

export function Badge({
  children,
  variant = "primary", // primary | success | warning | error | info | purple | neutral
  size = "md", // sm | md
  icon,
  className = "",
  ...rest
}) {
  const badgeClasses = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses} {...rest}>
      {icon && (
        <span className={styles.badge__icon}>
          {typeof icon === "string" ? <Icon name={icon} size={14} /> : icon}
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
