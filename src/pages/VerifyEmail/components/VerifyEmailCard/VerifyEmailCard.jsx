import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./VerifyEmailCard.module.css";

export default function VerifyEmailCard({ status, message, onRetry }) {
  if (status === "loading") {
    return (
      <div className={styles.card}>
        <div className={`${styles.icon_wrapper} ${styles.icon_loading}`}>
          <Icon name="RefreshCw" size={36} className={styles.spinner} />
        </div>
        <h2 className={styles.title}>Đang kích hoạt tài khoản...</h2>
        <p className={styles.description}>
          Hệ thống đang kiểm tra mã xác thực từ email của bạn. Vui lòng giữ kết nối trong giây lát.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.card}>
        <div className={`${styles.icon_wrapper} ${styles.icon_success}`}>
          <Icon name="CheckCircle2" size={40} />
        </div>
        <h2 className={styles.title}>Kích hoạt thành công! 🎉</h2>
        <p className={styles.description}>
          {message ||
            "Chúc mừng bạn! Tài khoản FySet của bạn đã được xác thực an toàn. Bạn có thể đăng nhập và trải nghiệm toàn bộ tính năng ngay bây giờ."}
        </p>
        <div className={styles.action_group}>
          <Link to="/signin" className={styles.btn_primary}>
            <span>Đăng nhập ngay</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
          <Link to="/" className={styles.btn_secondary}>
            <span>Về trang chủ</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.icon_wrapper} ${styles.icon_error}`}>
        <Icon name="AlertCircle" size={40} />
      </div>
      <h2 className={styles.title}>Xác thực không thành công</h2>
      <p className={styles.description}>
        {message ||
          "Đường link kích hoạt đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại link mới hoặc liên hệ đội ngũ hỗ trợ."}
      </p>
      <div className={styles.action_group}>
        {onRetry && (
          <button type="button" onClick={onRetry} className={styles.btn_primary}>
            <Icon name="RefreshCw" size={16} />
            <span>Thử lại</span>
          </button>
        )}
        <Link to="/signup" className={styles.btn_secondary}>
          <span>Quay lại trang Đăng ký</span>
        </Link>
        <Link to="/" className={styles.btn_secondary}>
          <span>Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
