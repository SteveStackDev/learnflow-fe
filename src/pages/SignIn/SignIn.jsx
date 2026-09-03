import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Data
import { signInData } from "../../constants/mockSignIn";

// Import CSS Modules
import styles from "./SignIn.module.css";

// Sub-components
import SignInInfo from "./components/SignInInfo/SignInInfo";
import SignInForm from "./components/SignInForm/SignInForm";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

// Context
import { useToast } from "~/context/ToastContext.jsx";
import { authService } from "~/services/authService";

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

  // Hàm xử lý Đăng nhập qua authService
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const inputVal = email.trim();

    if (!inputVal) {
      newErrors.email = "Vui lòng nhập Email hoặc Username!";
    } else if (inputVal.includes("@")) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputVal)) {
        newErrors.email = "Email không đúng định dạng (ví dụ: name@domain.com)";
      }
    } else if (inputVal.length < 3) {
      newErrors.email = "Username phải chứa ít nhất 3 ký tự!";
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

    try {
      setIsSubmitting(true);
      const user = await authService.login({ identifier: inputVal, password });
      toast.success(
        `Chào mừng ${user.name || user.username || "bạn"} trở lại!`,
        "Đăng nhập thành công",
      );
      navigate("/");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }
      toast.error(
        error.message || "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!",
        "Đăng nhập thất bại",
      );
    } finally {
      setIsSubmitting(false);
    }
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
