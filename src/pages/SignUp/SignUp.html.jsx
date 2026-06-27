// Data
import { signUpData } from "./data";
// Import CSS Modules
import styles from "./SignUp.module.css";

function SignUp() {
  return (
    <>
      <div className={styles.signuppage}>
        <div className={styles.signuppage__container}>
          {/* Left Side */}
          <div className={styles["signup-info"]}>
            <div className={styles["signup-info__wrapper"]}>
              <button type="button" className={styles["signup-info__back-btn"]}>
                <span className={styles["signup-info__back-icon"]}>←</span> Quay
                về Trang chủ
              </button>

              <div className={styles["signup-info__logo-group"]}>
                <div className={styles["signup-info__logo-box"]} />
                <span className={styles["signup-info__logo-text"]}>
                  LearnFlow
                </span>
              </div>

              <h1 className={styles["signup-info__title"]}>
                Bắt đầu hành trình học lập trình cùng LearnFlow
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
                      {obj.iconName}
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

          {/* Right Side */}
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

                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>EMAIL</label>
                  <input
                    type="email"
                    placeholder="email@vi-du.com"
                    className={styles["signup-form__input"]}
                  />
                </div>

                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>
                    MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
                    />
                    <span
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      [EyeIcon]
                    </span>
                  </div>
                </div>

                <div className={styles["signup-form__form-group"]}>
                  <label className={styles["signup-form__label"]}>
                    XÁC NHẬN MẬT KHẨU
                  </label>
                  <div className={styles["signup-form__input-wrapper"]}>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={styles["signup-form__input"]}
                    />
                    <span
                      className={`${styles["signup-form__input-adornment"]} ${styles["signup-form__input-adornment--end"]}`}
                    >
                      [EyeIcon]
                    </span>
                  </div>
                </div>

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

                <button
                  type="submit"
                  className={styles["signup-form__submit-btn"]}
                >
                  Tạo tài khoản{" "}
                  <span className={styles["signup-form__submit-icon"]}>→</span>
                </button>
              </form>

              <div className={styles["signup-form__splitter"]}>
                <span className={styles["signup-form__splitter-text"]}>
                  HOẶC TIẾP TỤC VỚI
                </span>
              </div>

              <div className={styles["signup-form__social-list"]}>
                {signUpData.providers.map((obj, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles["signup-form__social-btn"]}
                  >
                    <span className={styles["signup-form__social-icon"]}>
                      {obj.iconName}
                    </span>
                    {obj.name}
                  </button>
                ))}
              </div>

              <div className={styles["signup-form__redirect-group"]}>
                <span className={styles["signup-form__redirect-text"]}>
                  Đã có tài khoản?
                </span>
                <a href="#" className={styles["signup-form__link"]}>
                  Đăng nhập ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
