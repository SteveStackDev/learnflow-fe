import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./SignUpForm.module.css";

function SignUpForm({
  fullname,
  setFullname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  agreeTerms,
  setAgreeTerms,
  errors,
  setErrors,
  isSubmitting,
  handleSubmit,
}) {
  return (
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
            <span className={styles["signup-form__mobile-logo-text"]}>FySet</span>
          </div>

          <h1 className={styles["signup-form__mobile-title"]}>
            Bắt đầu hành trình{" "}
            <span className={styles["signup-form__title--highlight"]}>học&nbsp;lập&nbsp;trình</span>{" "}
            cùng FySet
          </h1>
        </div>

        <h2 className={styles["signup-form__title"]}>Tạo tài khoản</h2>
        <p className={styles["signup-form__desc"]}>
          Tạo tài khoản để bắt đầu học theo roadmap, luyện bài tập, tham gia contest và theo dõi
          tiến độ trên FySet.
        </p>

        <form noValidate className={styles["signup-form__form"]} onSubmit={handleSubmit}>
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
            <label htmlFor="signup-email" className={styles["signup-form__label"]}>
              EMAIL
            </label>
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
                {showPassword ? <Icon name="EyeOff" size={18} /> : <Icon name="Eye" size={18} />}
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
                  if (errors.confirmPassword)
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
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
                của FySet.
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
          <span className={styles["signup-form__splitter-text"]}>HOẶC TIẾP TỤC VỚI</span>
        </div>

        {/* Social Buttons Row */}
        <div className={styles["signup-form__social-list"]}>
          <button type="button" className={styles["signup-form__social-btn"]}>
            <span className={styles["signup-form__social-icon"]}>
              <Icon name="Google" size={18} />
            </span>
            Google
          </button>

          <button type="button" className={styles["signup-form__social-btn"]}>
            <span className={styles["signup-form__social-icon"]}>
              <Icon name="Github" size={18} />
            </span>
            GitHub
          </button>
        </div>

        {/* Redirect Link */}
        <div className={styles["signup-form__redirect-group"]}>
          <span className={styles["signup-form__redirect-text"]}>Đã có tài khoản?</span>
          <Link to="/signin" className={styles["signup-form__link-bold"]}>
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
