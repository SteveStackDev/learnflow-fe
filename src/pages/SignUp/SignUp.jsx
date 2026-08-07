import { useState } from "react";

// Data
import { signUpData } from "./data";

// Import CSS Modules
import styles from "./SignUp.module.css";

// Sub-components
import SignUpInfo from "./components/SignUpInfo/SignUpInfo";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

// Context
import { useToast } from "~/context/ToastContext.jsx";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ và tên!";
    } else if (fullname.trim().length < 2) {
      newErrors.fullname = "Họ và tên phải có ít nhất 2 ký tự!";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ Email!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Email không đúng định dạng (ví dụ: name@domain.com)";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự!";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu!";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp!";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Bạn cần đồng ý với Điều khoản dịch vụ của LearnFlow!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, "Thông tin chưa hợp lệ");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Tạo tài khoản LearnFlow thành công! Vui lòng đăng nhập.", "Đăng ký thành công");
    }, 1000);
  };

  return (
    <div className={styles.signuppage}>
      <ThemeToggle />
      {/* Ambient Background Glow Orbs */}
      <div className={styles["signuppage__orb-1"]} />
      <div className={styles["signuppage__orb-2"]} />

      <div className={styles.signuppage__container}>
        {/* 1. Left Side: Brand Info & Value Props Panel */}
        <SignUpInfo signUpData={signUpData} />

        {/* 2. Right Side: Glassmorphism Sign Up Form Card */}
        <SignUpForm
          fullname={fullname}
          setFullname={setFullname}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          agreeTerms={agreeTerms}
          setAgreeTerms={setAgreeTerms}
          errors={errors}
          setErrors={setErrors}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default SignUp;
