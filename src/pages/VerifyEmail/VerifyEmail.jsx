import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router";
import { authService } from "~/services/authService";
import Icon from "~/components/Icon/Icon";
import VerifyEmailCard from "./components/VerifyEmailCard/VerifyEmailCard";
import styles from "./VerifyEmail.module.css";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("");

  const handleVerify = useCallback(async () => {
    if (!token) {
      setStatus("error");
      setMessage("Không tìm thấy mã xác thực (token) trong liên kết. Vui lòng kiểm tra lại email của bạn.");
      return;
    }

    setStatus("loading");
    try {
      const res = await authService.verifyEmailToken(token);
      setStatus("success");
      setMessage(res?.message || "Tài khoản của bạn đã được kích hoạt thành công!");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Mã xác thực đã hết hạn hoặc không hợp lệ.");
    }
  }, [token]);

  useEffect(() => {
    handleVerify();
  }, [handleVerify]);

  return (
    <div className={styles.verify_page}>
      {/* Ambient Lighting Orbs */}
      <div className={styles.orb_1} />
      <div className={styles.orb_2} />

      {/* Brand Header */}
      <Link to="/" className={styles.brand_header}>
        <div className={styles.brand_logo}>
          <Icon name="PlayLogo" size={20} />
        </div>
        <span className={styles.brand_name}>FySet</span>
      </Link>

      {/* Verification Card Subcomponent */}
      <VerifyEmailCard
        status={status}
        message={message}
        onRetry={handleVerify}
      />
    </div>
  );
}
