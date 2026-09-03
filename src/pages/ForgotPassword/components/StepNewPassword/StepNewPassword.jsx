import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./StepNewPassword.module.css";

export default function StepNewPassword({ onSubmit, isLoading }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const calculateStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "transparent", width: "0%" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: "Yếu", color: "#ef4444", width: "33%" };
    if (score <= 4) return { score, label: "Trung bình", color: "#f59e0b", width: "66%" };
    return { score, label: "Mạnh", color: "#22c55e", width: "100%" };
  };

  const strength = calculateStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Vui lòng nhập mật khẩu mới!");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    setError("");
    onSubmit({ password, confirmPassword });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Password Field */}
      <div className={styles.field_group}>
        <label htmlFor="reset-pass" className={styles.label}>
          Mật khẩu mới
        </label>
        <div className={styles.input_wrapper}>
          <Icon name="Lock" size={18} className={styles.input_icon} />
          <input
            id="reset-pass"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="Tối thiểu 6 ký tự"
            className={styles.input}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eye_btn}
            title={showPassword ? "Ẩn" : "Hiện"}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        {/* Strength meter */}
        {password && (
          <div className={styles.strength_wrapper}>
            <div className={styles.strength_bar}>
              <div
                className={styles.strength_fill}
                style={{
                  width: strength.width,
                  backgroundColor: strength.color,
                }}
              />
            </div>
            <span className={styles.strength_text}>
              Độ bảo mật: <strong style={{ color: strength.color }}>{strength.label}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className={styles.field_group}>
        <label htmlFor="reset-confirm-pass" className={styles.label}>
          Xác nhận lại mật khẩu
        </label>
        <div className={styles.input_wrapper}>
          <Icon name="ShieldCheck" size={18} className={styles.input_icon} />
          <input
            id="reset-confirm-pass"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError("");
            }}
            placeholder="Nhập lại mật khẩu mới"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.eye_btn}
            title={showConfirmPassword ? "Ẩn" : "Hiện"}
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>

      {error && (
        <span className={styles.error_msg}>
          <Icon name="AlertCircle" size={14} />
          {error}
        </span>
      )}

      <button type="submit" disabled={isLoading} className={styles.btn_submit}>
        {isLoading ? (
          <>
            <Icon name="RefreshCw" size={16} className={styles.spinner} />
            <span>Đang cập nhật mật khẩu...</span>
          </>
        ) : (
          <>
            <span>Cập nhật mật khẩu mới</span>
            <Icon name="Check" size={16} />
          </>
        )}
      </button>
    </form>
  );
}
