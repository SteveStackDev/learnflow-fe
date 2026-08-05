import { useState } from "react";
import { Link } from "react-router";

// Data
import { signUpData } from "./data";

// Import CSS Modules
import styles from "./SignUp.module.css";
// Components
import Icon from "~/components/Icon/Icon";
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

  const validateForm = () => {
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
    return Object.keys(newErrors).length === 0;
  };

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
    <>
      <div className={styles.signuppage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["signuppage__orb-1"]} />
        <div className={styles["signuppage__orb-2"]} />

        <div className={styles.signuppage__container}>
          {/* 1. Left Side: Brand Info & Value Props Panel */}
          <div className={styles["signup-info"]}>
            <div className={styles["signup-info__wrapper"]}>
              <Link to="/" className={styles["signup-info__back-btn"]}>
                <span className={styles["signup-info__back-icon"]}>←</span>
                <span>Quay về Trang chủ</span>
              </Link>

              <div className={styles["signup-info__logo-group"]}>
                <div className={styles["signup-info__logo-box"]}>
                  <Icon name="Layers" size={22} strokeWidth={2.5} />
                </div>
                <span className={styles["signup-info__logo-text"]}>
                  LearnFlow
                </span>
              </div>

              <h1 className={styles["signup-info__title"]}>
                Bắt đầu hành trình{" "}
                <span className={styles["signup-info__title--highlight"]}>
                  học lập trình
                </span>{" "}
                cùng LearnFlow
              </h1>
              <p className={styles["signup-info__desc"]}>
                Tham gia cùng hàng ngàn học viên khác để xây dựng kỹ năng lập
                trình bền vững qua các lộ trình học bài bản và dự án thực tế.
              </p>

              <div className={styles["signup-info__benefits-stack"]}>
                {signUpData.benefits.map((obj, index) => (
                  <div
                    key={obj.id || obj.slug || obj.name || obj.title || obj}
                    className={styles["signup-info__benefit-card"]}
                  >
                    <div className={styles["signup-info__benefit-icon"]}>
                      <Icon name={obj.iconName} size={20} />
                    </div>
                    <div className={styles["signup-info__benefit-content"]}>
                      <h3 className={styles["signup-info__benefit-title"]}>
                        {obj.title}
                      </h3>
                      <p className={styles["signup-info__benefit-desc"]}>
                        {obj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Right Side: Glassmorphism Sign Up Form Card */}
          <div className={styles["signup-form"]}>
            <div className={styles["signup-form__wrapper"]}>
              {/* Mobile Header (Shown only on responsive <= 992px) */}
              <div className={styles["signup-form__mobile-header"]}>
                <Link to="/" className={styles["signup-form__mobile-back-btn"]}>
                  <span className={styles["signup-form__mobile-back-icon"]}>←</span> Trang chủ
                </Link>

                <div className={styles["signup-form__mobile-logo-group"]}>
                  <div className={styles["signup-form__mobile-logo-box"]}>
                    <Icon name="Layers" size={26} strokeWidth={2.5} />
                  </div>
                  <span className={styles["signup-form__mobile-logo-text"]}>
                    LearnFlow
                  </span>
                </div>

                <h1 className={styles["signup-form__mobile-title"]}>
                  Bắt đầu hành trình{" "}
                  <span className={styles["signup-info__title--highlight"]}>
                    học lập trình
                  </span>{" "}
                  cùng LearnFlow
                </h1>
              </div>

              <h2 className={styles["signup-form__title"]}>Tạo tài khoản</h2>
              <p className={styles["signup-form__desc"]}>
                Tạo tài khoản để bắt đầu học theo roadmap, luyện bài tập, tham
                gia contest và theo dõi tiến độ trên LearnFlow.
              </p>

              <form
                noValidate
                className={styles["signup-form__form"]}
                onSubmit={handleSubmit}
              >
                {/* 2-Column Row: Full Name & Username */}
                <div className={styles["signup-form__form-row"]}>
                  <div className={styles["signup-form__form-group"]}>
                    <label htmlFor="signup-fullname" className={styles["signup-form__label"]}>
                      HỌ VÀ TÊN
                    </label>
                    <input
                      id="signup-fullname"
                      type="text"
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                        if (errors.fullname) setErrors((prev) => ({ ...prev, fullname: null }));
                      }}
                      placeholder="Nguyễn Văn A"
                      className={`${styles["signup-form__input"]} ${
                        errors.fullname ? styles["signup-form__input--error"] : ""
                      }`}
                    />
                    {errors.fullname && (
                      <span className={styles["signup-form__error-text"]}>
                        <Icon name="AlertCircle" size={13} />
                        {errors.fullname}
                      </span>
                    )}
                  </div>
                  <div className={styles["signup-form__form-group"]}>
                    <label htmlFor="signup-username" className={styles["signup-form__label"]}>
                      TÊN NGƯỜI DÙNG
                    </label>
                    <input
                      id="signup-username"
                      type="text"
                      placeholder="van_a_99"
                      className={styles["signup-form__input"]}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label htmlFor="signup-email" className={styles["signup-form__label"]}>EMAIL</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="email@vi-du.com"
                    className={`${styles["signup-form__input"]} ${
                      errors.email ? styles["signup-form__input--error"] : ""
                    }`}
                  />
                  {errors.email && (
                    <span className={styles["signup-form__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label htmlFor="signup-password" className={styles["signup-form__label"]}>
                    MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                      }}
                      placeholder="••••••••"
                      className={`${styles["signup-form__input"]} ${
                        errors.password ? styles["signup-form__input--error"] : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      {showPassword ? (
                        <Icon name="EyeOff" size={18} />
                      ) : (
                        <Icon name="Eye" size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className={styles["signup-form__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label htmlFor="signup-confirm-password" className={styles["signup-form__label"]}>
                    XÁC NHẬN MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
                      }}
                      placeholder="••••••••"
                      className={`${styles["signup-form__input"]} ${
                        errors.confirmPassword ? styles["signup-form__input--error"] : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      {showConfirmPassword ? (
                        <Icon name="EyeOff" size={18} />
                      ) : (
                        <Icon name="Eye" size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className={styles["signup-form__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Checkbox Agreement */}
                <div className={styles["signup-form__checkbox-group"]}>
                  <label htmlFor="signup-agree" className={styles["signup-form__checkbox-label"]}>
                    <input
                      id="signup-agree"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: null }));
                      }}
                      className={styles["signup-form__checkbox"]}
                    />
                    <span className={styles["signup-form__checkbox-text"]}>
                      Tôi đồng ý với{" "}
                      <a href="#" className={styles["signup-form__link"]}>
                        Điều khoản sử dụng
                      </a>{" "}
                      và{" "}
                      <a href="#" className={styles["signup-form__link"]}>
                        Chính sách bảo mật
                      </a>{" "}
                      của LearnFlow.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <span className={styles["signup-form__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles["signup-form__submit-btn"]}
                >
                  <span>{isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}</span>
                  <span className={styles["signup-form__submit-icon"]}>→</span>
                </button>
              </form>

              {/* Social Login Splitter */}
              <div className={styles["signup-form__splitter"]}>
                <span className={styles["signup-form__splitter-text"]}>
                  HOẶC TIẾP TỤC VỚI
                </span>
              </div>

              {/* Social Buttons Row */}
              <div className={styles["signup-form__social-list"]}>
                <button
                  type="button"
                  className={styles["signup-form__social-btn"]}
                >
                  <span className={styles["signup-form__social-icon"]}>
                    <Icon name="Google" size={18} />
                  </span>
                  Google
                </button>

                <button
                  type="button"
                  className={styles["signup-form__social-btn"]}
                >
                  <span className={styles["signup-form__social-icon"]}>
                    <Icon name="Github" size={18} />
                  </span>
                  GitHub
                </button>
              </div>

              {/* Redirect Link */}
              <div className={styles["signup-form__redirect-group"]}>
                <span className={styles["signup-form__redirect-text"]}>
                  Đã có tài khoản?
                </span>
                <Link to="/signin" className={styles["signup-form__link-bold"]}>
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
