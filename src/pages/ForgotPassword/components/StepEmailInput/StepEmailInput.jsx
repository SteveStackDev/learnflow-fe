import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./StepEmailInput.module.css";

export default function StepEmailInput({ email, setEmail, onSubmit, isLoading }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email tài khoản!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Định dạng email không hợp lệ (ví dụ: name@gmail.com)!");
      return;
    }

    setError("");
    onSubmit(email.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field_group}>
        <label htmlFor="forgot-email" className={styles.label}>
          Địa chỉ Email đã đăng ký
        </label>
        <div className={styles.input_wrapper}>
          <Icon name="Mail" size={18} className={styles.input_icon} />
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="example@fyset.dev"
            className={`${styles.input} ${error ? styles.input_error : ""}`}
            autoFocus
          />
        </div>
        {error && (
          <span className={styles.error_msg}>
            <Icon name="AlertCircle" size={14} />
            {error}
          </span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className={styles.btn_submit}>
        {isLoading ? (
          <>
            <Icon name="RefreshCw" size={16} className={styles.spinner} />
            <span>Đang gửi mã OTP...</span>
          </>
        ) : (
          <>
            <span>Nhận mã xác nhận</span>
            <Icon name="ArrowRight" size={16} />
          </>
        )}
      </button>
    </form>
  );
}
