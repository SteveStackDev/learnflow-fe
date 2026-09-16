import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui/Button/Button";
import styles from "./PremiumBlur.module.css";

/**
 * PremiumBlur: Full-page blur & lock wrapper component.
 * Gently blurs the underlying page content and displays an ultra-clean,
 * frosted-glass pro gate card in the center.
 */
export function PremiumBlur({
  children,
  isLocked = true,
  badgeText = "TÍNH NĂNG CAO CẤP",
  title = "Mở Khóa Toàn Bộ Trải Nghiệm Với Gói Pro",
  description = "Trang này hiện đang được khóa hoặc đang trong quá trình phát triển. Hãy nâng cấp tài khoản Pro để truy cập không giới hạn tất cả tài nguyên và tính năng độc quyền!",
  iconName = "Lock",
  primaryButtonText = "Khám phá gói Pro",
  primaryButtonLink = "/pricing",
  onPrimaryClick,
  secondaryButtonText = "Về trang chủ",
  secondaryButtonLink = "/",
  onSecondaryClick,
  variant = "premium", // "premium" | "coming-soon" | "security"
  blurLevel = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const navigate = useNavigate();

  // If not locked, render children normally without any overlay
  if (!isLocked) {
    return <>{children}</>;
  }

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else if (primaryButtonLink) {
      navigate(primaryButtonLink);
    }
  };

  const handleSecondary = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else if (secondaryButtonLink) {
      navigate(secondaryButtonLink);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[`wrapper--${variant}`]} ${className}`}>
      {/* Background Page Content (Gently Blurred & Disabled from interaction) */}
      <div
        className={`${styles.blurred_content} ${styles[`blurred_content--${blurLevel}`]}`}
        aria-hidden="true"
        tabIndex="-1"
      >
        {children}
      </div>

      {/* Floating Frosted Glass Overlay */}
      <div className={styles.overlay}>
        {/* Ambient Glow Lighting */}
        <div className={styles.glow_orb_1} />
        <div className={styles.glow_orb_2} />

        {/* Central Pro Lock Card */}
        <div className={styles.card}>
          {/* Glowing Icon Header */}
          <div className={styles.icon_wrapper}>
            <div className={styles.icon_glow} />
            <div className={styles.icon_box}>
              <Icon name={iconName} size={32} strokeWidth={2.2} />
            </div>
          </div>

          {/* Pill Badge Tag */}
          {badgeText && (
            <div className={styles.badge}>
              <span className={styles.badge_dot} />
              <span className={styles.badge_text}>{badgeText}</span>
            </div>
          )}

          {/* Title & Description */}
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          {/* Action Buttons */}
          <div className={styles.actions}>
            {primaryButtonText && (
              <Button
                variant="gradient"
                size="lg"
                rightIcon="ArrowRight"
                onClick={handlePrimary}
                className={styles.primary_btn}
              >
                {primaryButtonText}
              </Button>
            )}

            {secondaryButtonText && (
              <Button
                variant="outlined"
                size="lg"
                leftIcon="Home"
                onClick={handleSecondary}
                className={styles.secondary_btn}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumBlur;
