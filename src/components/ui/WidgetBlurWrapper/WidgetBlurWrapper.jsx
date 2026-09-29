import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./WidgetBlurWrapper.module.css";

export function WidgetBlurWrapper({
  children,
  isBlurred = true,
  badge = "SẮP RA MẮT",
  icon = "Sparkles",
  title = "Tính năng đang phát triển",
  description = "Tính năng đang trong quá trình hoàn thiện và sẽ sớm khả dụng cho tất cả học viên!",
  tagColor = "blue", // "blue" | "amber" | "green" | "purple"
  className = "",
}) {
  if (!isBlurred) {
    return children;
  }

  return (
    <div className={`${styles.blur_wrapper} ${className}`}>
      {/* Blurred Content Underneath */}
      <div className={styles.blurred_content} aria-hidden="true" tabIndex="-1">
        {children}
      </div>

      {/* Frosted Glass Overlay */}
      <div className={styles.blur_overlay}>
        <div className={styles.glow_orb} />

        <div className={`${styles.lock_badge_card} ${styles[`lock_badge_card--${tagColor}`]}`}>
          <div className={styles.icon_box}>
            <Icon name={icon} size={20} strokeWidth={2.2} />
          </div>

          <div className={styles.text_group}>
            {badge && (
              <span className={styles.badge_pill}>
                <span className={styles.badge_dot} />
                <span>{badge}</span>
              </span>
            )}
            <h4 className={styles.card_title}>{title}</h4>
            <p className={styles.card_desc}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetBlurWrapper;
