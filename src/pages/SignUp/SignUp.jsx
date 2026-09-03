import { useState } from "react";
import { useNavigate } from "react-router";

// Data
import { signUpData } from "../../constants/mockSignUp";

// Import CSS Modules
import styles from "./SignUp.module.css";

// Sub-components
import SignUpInfo from "./components/SignUpInfo/SignUpInfo";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

// Context & Service
import { useToast } from "~/context/ToastContext.jsx";
import { authService } from "~/services/authService";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ và tên!";
    } else if (fullname.trim().length < 2) {
      newErrors.fullname = "Họ và tên phải có ít nhất 2 ký tự!";
    }

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      newErrors.username = "Vui lòng nhập tên người dùng (username)!";
    } else if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      newErrors.username = "Tên người dùng phải từ 3 đến 30 ký tự!";
    } else if (!/^[a-zA-Z0-9_]+$/.test(trimmedUsername)) {
      newErrors.username = "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới (_)";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ Email!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Email không đúng định dạng (ví dụ: name@domain.com)";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu!";
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 8 ký tự!";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ số!";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&...)";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu!";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp!";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Bạn cần đồng ý với Điều khoản dịch vụ của FySet!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, "Thông tin chưa hợp lệ");
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.register({
        username: trimmedUsername,
        email: email.trim(),
        password,
        confirmPassword,
      });

      toast.success(
        "Đăng ký tài khoản thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.",
        "Đăng ký thành công",
      );
      navigate("/sign-in");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }
      toast.error(
        error.message || "Đăng ký không thành công, vui lòng thử lại!",
        "Đăng ký thất bại",
      );
    } finally {
      setIsSubmitting(false);
    }
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
          username={username}
          setUsername={setUsername}
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
