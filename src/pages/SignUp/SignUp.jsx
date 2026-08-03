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
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin đăng ký!", "Đăng ký thất bại");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không trùng khớp!", "Lỗi xác nhận");
      return;
    }
    toast.success("Tạo tài khoản LearnFlow thành công! Vui lòng đăng nhập.", "Đăng ký thành công");
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
              <h2 className={styles["signup-form__title"]}>Tạo tài khoản</h2>
              <p className={styles["signup-form__desc"]}>
                Tạo tài khoản để bắt đầu học theo roadmap, luyện bài tập, tham
                gia contest và theo dõi tiến độ trên LearnFlow.
              </p>

              <form
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
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className={styles["signup-form__input"]}
                    />
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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@vi-du.com"
                    className={styles["signup-form__input"]}
                  />
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
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
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
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
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
                </div>

                {/* Checkbox Agreement */}
                <div className={styles["signup-form__checkbox-group"]}>
                  <label htmlFor="signup-agree" className={styles["signup-form__checkbox-label"]}>
                    <input
                      id="signup-agree"
                      type="checkbox"
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles["signup-form__submit-btn"]}
                >
                  <span>Tạo tài khoản</span>
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
