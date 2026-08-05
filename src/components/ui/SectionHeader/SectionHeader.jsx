import React from "react";
import styles from "./SectionHeader.module.css";
import Badge from "../Badge/Badge";

export function SectionHeader({
  badge,
  badgeVariant = "primary",
  title,
  subtitle,
  align = "left", // left | center
  className = "",
  children,
  ...rest
}) {
  const headerClasses = [
    styles.sectionHeader,
    styles[`sectionHeader--${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={headerClasses} {...rest}>
      {badge && (
        <Badge variant={badgeVariant} size="md">
          {badge}
        </Badge>
      )}
      {title && <h2 className={styles.sectionHeader__title}>{title}</h2>}
      {subtitle && <p className={styles.sectionHeader__subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
}

export default SectionHeader;
