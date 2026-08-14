import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Data
import { signInData } from "./data";
// [MODIFIED] - Import dữ liệu tài khoản test từ file testAccountData.js trong thư mục component TestAccount
import { testAccount } from "./components/TestAccount/testAccountData";

// Import CSS Modules
import styles from "./SignIn.module.css";

// Sub-components
import SignInInfo from "./components/SignInInfo/SignInInfo";
import SignInForm from "./components/SignInForm/SignInForm";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

// Context
import { useToast } from "~/context/ToastContext.jsx";

const GREETING_PHRASES = [
  "quay trở lại!",
  "gia nhập FySet!",
  "bắt đầu buổi học mới!",
  "chinh phục thử thách!",
];

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // [MODIFIED] - Hàm xử lý Đăng nhập & lưu thông tin người dùng vào localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, "Thông tin chưa đúng");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // [MODIFIED] - Khởi tạo thông tin người dùng dựa trên tài khoản test hoặc thông tin người dùng tự nhập
      const userObj = {
        email: email.trim(),
        name: email.trim() === testAccount.email ? testAccount.name : email.split("@")[0],
        avatar:
          email.trim() === testAccount.email
            ? testAccount.avatar
            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${email.split("@")[0]}`,
        role: email.trim() === testAccount.email ? testAccount.role : "Học viên",
      };

      // [MODIFIED] - Lưu trạng thái tài khoản vào localStorage & phát sự kiện thông báo thay đổi auth
      localStorage.setItem("fySet_user", JSON.stringify(userObj));
      window.dispatchEvent(new Event("fySet_auth_change"));

      toast.success(`Chào mừng ${userObj.name} trở lại!`, "Đăng nhập thành công");
      navigate("/");
    }, 600);
  };

  // Typewriter effect state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = GREETING_PHRASES[phraseIndex];

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
      const delayTimeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(delayTimeout);
    }

    if (isDeleting && charIndex === 0) {
      const resetTimer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % GREETING_PHRASES.length);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className={styles.signinpage}>
      <ThemeToggle />
      <div className={styles.signinpage__container}>
        {/* Left Side: Info & Features Panel */}
        <SignInInfo
          signInData={signInData}
          greetingPhrases={GREETING_PHRASES}
          phraseIndex={phraseIndex}
          charIndex={charIndex}
        />

        {/* Right Side: Sign In Form Panel */}
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          errors={errors}
          setErrors={setErrors}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          greetingPhrases={GREETING_PHRASES}
          phraseIndex={phraseIndex}
          charIndex={charIndex}
        />
      </div>
    </div>
  );
}

export default SignIn;
