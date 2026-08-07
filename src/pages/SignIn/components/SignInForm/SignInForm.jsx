import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./SignInForm.module.css";

function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  errors,
  setErrors,
  isSubmitting,
  handleSubmit,
  greetingPhrases,
  phraseIndex,
  charIndex,
}) {
  return (
    <div className={styles["signin-form"]}>
      {/* Background Dot Matrix Grid */}
      <div className={styles["signin-form__grid-pattern"]} />

      <div className={styles["signin-form__wrapper"]}>
        {/* Mobile Header (Shown only on responsive <= 992px) */}
        <div className={styles["signin-form__mobile-header"]}>
          <Link to="/" className={styles["signin-form__mobile-back-btn"]}>
            <span className={styles["signin-form__mobile-back-icon"]}>←</span> Trang chủ
          </Link>

          <div className={styles["signin-form__mobile-logo-group"]}>
            <div className={styles["signin-form__mobile-logo-box"]}>
              <Icon name="PlayLogo" size={28} />
            </div>
            <span className={styles["signin-form__mobile-logo-text"]}>LearnFlow</span>
          </div>

          <h1 className={styles["signin-form__mobile-typing-title"]}>
            <span className={styles["signin-form__title-prefix"]}>Chào mừng bạn </span>
            <span className={styles["signin-form__title--highlight"]}>
              {greetingPhrases[phraseIndex].substring(0, charIndex)}
              <span className={styles["signin-form__cursor"]}>|</span>
            </span>
          </h1>
        </div>

        <div className={styles["signin-form__card"]}>
          <h2 className={styles["signin-form__title"]}>Đăng nhập</h2>
          <p className={styles["signin-form__desc"]}>
            Chào mừng bạn trở lại với cộng đồng LearnFlow.
          </p>

          <form noValidate className={styles["signin-form__form"]} onSubmit={handleSubmit}>
            <div className={styles["signin-form__form-group"]}>
              <label htmlFor="signin-email" className={styles["signin-form__label"]}>
                Địa chỉ Email
              </label>
              <div className={styles["signin-form__input-wrapper"]}>
                <span
                  className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--start"]}`}
                >
                  <Icon name="Mail" size={18} />
                </span>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  placeholder="example@email.com"
                  className={`${styles["signin-form__input"]} ${
                    errors.email ? styles["signin-form__input--error"] : ""
                  }`}
                />
              </div>
              {errors.email && (
                <span className={styles["signin-form__error-text"]}>
                  <Icon name="AlertCircle" size={14} />
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles["signin-form__form-group"]}>
              <div className={styles["signin-form__label-row"]}>
                <label htmlFor="signin-password" className={styles["signin-form__label"]}>
                  Mật khẩu
                </label>
                <a href="#" className={styles["signin-form__link"]}>
                  Quên mật khẩu?
                </a>
              </div>
              <div className={styles["signin-form__input-wrapper"]}>
                <span
                  className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--start"]}`}
                >
                  <Icon name="Lock" size={18} />
                </span>
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  placeholder="••••••••"
                  className={`${styles["signin-form__input"]} ${
                    errors.password ? styles["signin-form__input--error"] : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--end"]} ${styles["signin-form__eye-btn"]}`}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <Icon name="EyeOff" size={18} /> : <Icon name="Eye" size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles["signin-form__error-text"]}>
                  <Icon name="AlertCircle" size={14} />
                  {errors.password}
                </span>
              )}
            </div>

            <div className={styles["signin-form__checkbox-group"]}>
              <label htmlFor="signin-remember" className={styles["signin-form__checkbox-label"]}>
                <input
                  id="signin-remember"
                  type="checkbox"
                  defaultChecked
                  className={styles["signin-form__checkbox"]}
                />
                <span className={styles["signin-form__checkbox-text"]}>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles["signin-form__submit-btn"]}
            >
              <span>{isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}</span>
              <Icon name="ArrowRight" size={18} className={styles["signin-form__submit-arrow"]} />
            </button>
          </form>

          <div className={styles["signin-form__splitter"]}>
            <span className={styles["signin-form__splitter-text"]}>Hoặc tiếp tục với</span>
          </div>

          <div className={styles["signin-form__social-list"]}>
            <button type="button" className={styles["signin-form__social-btn"]}>
              <span className={styles["signin-form__social-icon"]}>
                <Icon name="Google" size={18} />
              </span>
              Google
            </button>
            <button type="button" className={styles["signin-form__social-btn"]}>
              <span className={styles["signin-form__social-icon"]}>
                <Icon name="Github" size={18} />
              </span>
              GitHub
            </button>
          </div>

          <div className={styles["signin-form__redirect-group"]}>
            <span className={styles["signin-form__redirect-text"]}>Chưa có tài khoản?</span>
            <Link to="/signup" className={styles["signin-form__link"]}>
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
