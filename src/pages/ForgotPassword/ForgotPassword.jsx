import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useToast } from "~/context/ToastContext.jsx";
import { authService } from "~/services/authService";
import Icon from "~/components/Icon/Icon";

import StepEmailInput from "./components/StepEmailInput/StepEmailInput";
import StepOtpInput from "./components/StepOtpInput/StepOtpInput";
import StepNewPassword from "./components/StepNewPassword/StepNewPassword";

import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // BƯỚC 1: Gửi email nhận OTP
  const handleEmailSubmit = async (submittedEmail) => {
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(submittedEmail);
      if (res?.token) {
        setResetToken(res.token);
      }
      setEmail(submittedEmail);
      setCurrentStep(2);
      toast.success(
        `Đã gửi mã xác nhận 6 số đến ${submittedEmail}. Vui lòng kiểm tra hộp thư (hoặc mục Spam)!`,
        "Mã xác thực",
      );
    } catch (err) {
      toast.error(err.message || "Không thể gửi mã OTP, vui lòng thử lại sau!", "Lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  // BƯỚC 2: Xác nhận OTP
  const handleOtpVerify = async (submittedOtp) => {
    setIsLoading(true);
    try {
      await authService.verifyOtp({ email, otp: submittedOtp, token: resetToken });
      setCurrentStep(3);
      toast.success("Mã OTP hợp lệ! Vui lòng thiết lập mật khẩu mới.", "Thành công");
    } catch (err) {
      toast.error(err.message || "Mã OTP không chính xác hoặc đã hết hạn!", "Xác thực thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi lại mã OTP khi hết giờ
  const handleResendOtp = async () => {
    try {
      const res = await authService.forgotPassword(email);
      if (res?.token) {
        setResetToken(res.token);
      }
      toast.info(`Đã gửi lại mã OTP mới đến ${email}.`, "Đã gửi lại");
    } catch (err) {
      toast.error(err.message || "Không thể gửi lại mã, vui lòng thử lại sau!", "Lỗi");
    }
  };

  // BƯỚC 3: Cập nhật mật khẩu mới
  const handlePasswordSubmit = async ({ password, confirmPassword }) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        newPassword: password,
        confirmPassword,
        token: resetToken,
      });
      toast.success("Đổi mật khẩu thành công! Hãy đăng nhập bằng mật khẩu mới.", "Hoàn tất");
      navigate("/signin");
    } catch (err) {
      toast.error(err.message || "Cập nhật mật khẩu thất bại!", "Lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
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

      <div className={styles.card}>
        {/* Stepper Progress Indicator */}
        <div className={styles.stepper}>
          <div className={styles.stepper_track} />
          <div
            className={styles.stepper_progress}
            style={{
              width: currentStep === 1 ? "0%" : currentStep === 2 ? "45%" : "80%",
            }}
          />

          <div
            className={`${styles.step_node} ${
              currentStep === 1
                ? styles.step_node_active
                : currentStep > 1
                ? styles.step_node_done
                : ""
            }`}
          >
            {currentStep > 1 ? <Icon name="Check" size={14} /> : "1"}
          </div>

          <div
            className={`${styles.step_node} ${
              currentStep === 2
                ? styles.step_node_active
                : currentStep > 2
                ? styles.step_node_done
                : ""
            }`}
          >
            {currentStep > 2 ? <Icon name="Check" size={14} /> : "2"}
          </div>

          <div
            className={`${styles.step_node} ${
              currentStep === 3 ? styles.step_node_active : ""
            }`}
          >
            3
          </div>
        </div>

        {/* Header Text by Step */}
        <div className={styles.card_header}>
          <h1 className={styles.title}>
            {currentStep === 1
              ? "Quên mật khẩu?"
              : currentStep === 2
              ? "Nhập mã xác thực OTP"
              : "Thiết lập mật khẩu mới"}
          </h1>
          <p className={styles.subtitle}>
            {currentStep === 1
              ? "Nhập địa chỉ email đăng ký tài khoản để nhận mã OTP 6 số."
              : currentStep === 2
              ? `Mã xác nhận 6 số đã được gửi tới email ${email}`
              : "Vui lòng nhập mật khẩu mới và xác nhận để hoàn tất khôi phục tài khoản."}
          </p>
        </div>

        {/* Step 1: Nhập Email */}
        {currentStep === 1 && (
          <StepEmailInput
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSubmit}
            isLoading={isLoading}
          />
        )}

        {/* Step 2: Nhập OTP 6 số */}
        {currentStep === 2 && (
          <StepOtpInput
            email={email}
            onVerify={handleOtpVerify}
            onResend={handleResendOtp}
            isLoading={isLoading}
          />
        )}

        {/* Step 3: Nhập Mật Khẩu Mới */}
        {currentStep === 3 && (
          <StepNewPassword
            onSubmit={handlePasswordSubmit}
            isLoading={isLoading}
          />
        )}

        {/* Back to Sign In Link */}
        <Link to="/signin" className={styles.back_link}>
          <Icon name="ArrowLeft" size={15} />
          <span>Quay lại trang Đăng nhập</span>
        </Link>
      </div>
    </div>
  );
}
