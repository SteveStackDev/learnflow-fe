import React, { useState, useEffect, useRef } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./StepOtpInput.module.css";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 180; // 3 minutes matching Redis TTL

export default function StepOtpInput({ onVerify, onResend, isLoading }) {
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);
    if (error) setError("");

    // Auto-advance to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, OTP_LENGTH).split("");
    const newOtp = [...otpDigits];
    digits.forEach((d, idx) => {
      newOtp[idx] = d;
    });
    setOtpDigits(newOtp);

    const focusIdx = Math.min(digits.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleResendClick = async () => {
    if (countdown > 0) return;
    setCountdown(COUNTDOWN_SECONDS);
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
    if (onResend) await onResend();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join("");
    if (fullOtp.length < OTP_LENGTH) {
      setError("Vui lòng nhập đủ 6 chữ số mã xác thực!");
      return;
    }
    setError("");
    onVerify(fullOtp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.otp_grid} onPaste={handlePaste}>
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`${styles.otp_box} ${digit ? styles.otp_box_filled : ""}`}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error && (
        <span className={styles.error_msg}>
          <Icon name="AlertCircle" size={14} />
          {error}
        </span>
      )}

      {/* Timer & Resend */}
      <div className={styles.timer_box}>
        {countdown > 0 ? (
          <>
            <Icon name="Clock" size={15} />
            <span>Mã hết hạn sau:</span>
            <span className={styles.timer_time}>{formatTime(countdown)}</span>
          </>
        ) : (
          <span className={styles.timer_expired}>Mã OTP đã hết hiệu lực.</span>
        )}
        <button
          type="button"
          onClick={handleResendClick}
          disabled={countdown > 0}
          className={styles.resend_btn}
        >
          Gửi lại mã
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || otpDigits.join("").length < OTP_LENGTH}
        className={styles.btn_verify}
      >
        {isLoading ? (
          <>
            <Icon name="RefreshCw" size={16} className={styles.spinner} />
            <span>Đang kiểm tra...</span>
          </>
        ) : (
          <>
            <span>Xác nhận mã OTP</span>
            <Icon name="ArrowRight" size={16} />
          </>
        )}
      </button>
    </div>
  );
}
