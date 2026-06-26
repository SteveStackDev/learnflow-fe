// Data
import { signInData } from "./data";
// Import CSS Modules
import styles from "./SignIn.module.css";

function SignIn() {
  return (
    <>
      <div className={styles.signinpage}>
        <div className={styles.signinpage__container}>
          {/* Left Side: Welcome & Features Infographic */}
          <div className={styles["signin-info"]}>
            <div className={styles["signin-info__wrapper"]}>
              <button type="button" className={styles["signin-info__back-btn"]}>
                <span className={styles["signin-info__back-icon"]}>←</span>{" "}
                Trang chủ
              </button>

              {/* Logo */}
              <div className={styles["signin-info__logo-group"]}>
                <div className={styles["signin-info__logo-box"]} />
                <span className={styles["signin-info__logo-text"]}>
                  LearnFlow
                </span>
              </div>

              <h1 className={styles["signin-info__title"]}>
                Chào mừng bạn quay trở lại!
              </h1>
              <p className={styles["signin-info__desc"]}>
                Tiếp tục hành trình trở thành lập trình viên chuyên nghiệp với
                kho bài tập và lộ trình học cá nhân hóa.
              </p>

              {/* Features List */}
              <div className={styles["signin-info__feat-list"]}>
                {signInData.features.map((feat, index) => (
                  <div key={index} className={styles["signin-info__feat-card"]}>
                    <div className={styles["signin-info__feat-icon"]}>
                      {feat.iconName}
                    </div>
                    <div className={styles["signin-info__feat-content"]}>
                      <h3 className={styles["signin-info__feat-title"]}>
                        {feat.title}
                      </h3>
                      <p className={styles["signin-info__feat-desc"]}>
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Dynamic Form Section */}
          <div className={styles["signin-form"]}>
            <div className={styles["signin-form__wrapper"]}>
              <h2 className={styles["signin-form__title"]}>Đăng nhập</h2>
              <p className={styles["signin-form__desc"]}>
                Chào mừng bạn trở lại với cộng đồng LearnFlow.
              </p>

              {/* Credential Form */}
              <form
                className={styles["signin-form__form"]}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className={styles["signin-form__form-group"]}>
                  <label className={styles["signin-form__label"]}>
                    Địa chỉ Email
                  </label>
                  <div className={styles["signin-form__input-wrapper"]}>
                    <span
                      className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--start"]}`}
                    >
                      [MailIcon]
                    </span>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className={styles["signin-form__input"]}
                    />
                  </div>
                </div>

                <div className={styles["signin-form__form-group"]}>
                  <div className={styles["signin-form__label-row"]}>
                    <label className={styles["signin-form__label"]}>
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
                      [LockIcon]
                    </span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={styles["signin-form__input"]}
                    />
                    <span
                      className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--end"]}`}
                    >
                      [EyeIcon]
                    </span>
                  </div>
                </div>

                <div className={styles["signin-form__checkbox-group"]}>
                  <label className={styles["signin-form__checkbox-label"]}>
                    <input
                      type="checkbox"
                      defaultChecked
                      className={styles["signin-form__checkbox"]}
                    />
                    <span className={styles["signin-form__checkbox-text"]}>
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={styles["signin-form__submit-btn"]}
                >
                  Đăng nhập
                </button>
              </form>

              {/* Social Authentication Splitter */}
              <div className={styles["signin-form__splitter"]}>
                <span className={styles["signin-form__splitter-text"]}>
                  Hoặc tiếp tục với
                </span>
              </div>

              {/* Social Authentication Buttons */}
              <div className={styles["signin-form__social-list"]}>
                {signInData.providers.map((obj, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles["signin-form__social-btn"]}
                  >
                    <span className={styles["signin-form__social-icon"]}>
                      {obj.iconName}
                    </span>
                    {obj.name}
                  </button>
                ))}
              </div>

              {/* Redirect Register Action */}
              <div className={styles["signin-form__redirect-group"]}>
                <span className={styles["signin-form__redirect-text"]}>
                  Chưa có tài khoản?
                </span>
                <a href="#" className={styles["signin-form__link"]}>
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
