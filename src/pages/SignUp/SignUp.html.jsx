import { useState } from "react";
import { Link } from "react-router";

// Data
import { signUpData } from "./data";

// Import CSS Modules
import styles from "./SignUp.module.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
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
                    key={index}
                    className={styles["signup-info__benefit-card"]}
                  >
                    <div className={styles["signup-info__benefit-icon"]}>
                      {index === 0 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                          <line x1="8" y1="2" x2="8" y2="18" />
                          <line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                        </svg>
                      )}
                      {index === 3 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="8" r="7" />
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                        </svg>
                      )}
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
                onSubmit={(e) => e.preventDefault()}
              >
                {/* 2-Column Row: Full Name & Username */}
                <div className={styles["signup-form__form-row"]}>
                  <div className={styles["signup-form__form-group"]}>
                    <label className={styles["signup-form__label"]}>
                      HỌ VÀ TÊN
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className={styles["signup-form__input"]}
                    />
                  </div>
                  <div className={styles["signup-form__form-group"]}>
                    <label className={styles["signup-form__label"]}>
                      TÊN NGƯỜI DÙNG
                    </label>
                    <input
                      type="text"
                      placeholder="van_a_99"
                      className={styles["signup-form__input"]}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>EMAIL</label>
                  <input
                    type="email"
                    placeholder="email@vi-du.com"
                    className={styles["signup-form__input"]}
                  />
                </div>

                {/* Password Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>
                    MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>
                    XÁC NHẬN MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      {showConfirmPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox Agreement */}
                <div className={styles["signup-form__checkbox-group"]}>
                  <label className={styles["signup-form__checkbox-label"]}>
                    <input
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
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </span>
                  Google
                </button>

                <button
                  type="button"
                  className={styles["signup-form__social-btn"]}
                >
                  <span className={styles["signup-form__social-icon"]}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
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
