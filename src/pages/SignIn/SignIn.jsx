import { useState, useEffect } from "react";
import { Link } from "react-router";
// Data
import { signInData } from "./data";
// Import CSS Modules
import styles from "./SignIn.module.css";
// Components
import Icon from "~/components/Icon/Icon";

const GREETING_PHRASES = [
  "quay trở lại!",
  "gia nhập LearnFlow!",
  "bắt đầu buổi học mới!",
  "chinh phục thử thách!"
];

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Typewriter effect state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = GREETING_PHRASES[phraseIndex];

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
      // Pause at the end of typing before deleting
      const delayTimeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(delayTimeout);
    }

    if (isDeleting && charIndex === 0) {
      // Switch to next phrase when erased
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % GREETING_PHRASES.length);
      return;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <>
      <div className={styles.signinpage}>
        <div className={styles.signinpage__container}>
          {/* Left Side */}
          <div className={styles["signin-info"]}>
            {/* Background Glow Orbs */}
            <div className={styles["signin-info__orb-1"]} />
            <div className={styles["signin-info__orb-2"]} />

            {/* Background Code Snippet Pattern */}
            <div className={styles["signin-info__code-pattern"]}>
              <code>{`// LearnFlow EdTech Hub`}</code>
              <code>{`import { LearnFlow } from "@learnflow/core";`}</code>
              <code>{`const student = new LearnFlow({`}</code>
              <code>{`  level: "Developer",`}</code>
              <code>{`  goal: "Fullstack Mastery"`}</code>
              <code>{`});`}</code>
              <code>{`student.startJourney();`}</code>
            </div>

            <div className={styles["signin-info__wrapper"]}>
              <Link to="/" className={styles["signin-info__back-btn"]}>
                <span className={styles["signin-info__back-icon"]}>←</span>{" "}
                Trang chủ
              </Link>

              <div className={styles["signin-info__logo-group"]}>
                <div className={styles["signin-info__logo-box"]}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="6" fill="#0950c3"/>
                    <path d="M7 17V7l10 5-10 5z" fill="#ffffff"/>
                  </svg>
                </div>
                <span className={styles["signin-info__logo-text"]}>
                  LearnFlow
                </span>
              </div>

              <h1 className={styles["signin-info__title"]}>
                <span className={styles["signin-info__title-prefix"]}>
                  Chào mừng bạn
                </span>
                <span className={styles["signin-info__title--highlight"]}>
                  {GREETING_PHRASES[phraseIndex].substring(0, charIndex)}
                  <span className={styles["signin-info__cursor"]}>|</span>
                </span>
              </h1>
              <p className={styles["signin-info__desc"]}>
                Tiếp tục hành trình trở thành lập trình viên chuyên nghiệp với
                kho bài tập và lộ trình học cá nhân hóa.
              </p>

              <div className={styles["signin-info__feat-list"]}>
                {signInData.features.map((feat, index) => (
                  <div key={feat.id || feat.slug || feat.name || feat.title || feat} className={styles["signin-info__feat-card"]}>
                    <div className={styles["signin-info__feat-icon"]}>
                      <Icon name={feat.iconName} size={20} />
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

          {/* Right Side */}
          <div className={styles["signin-form"]}>
            {/* Background Dot Matrix Grid */}
            <div className={styles["signin-form__grid-pattern"]} />

            <div className={styles["signin-form__wrapper"]}>
              <div className={styles["signin-form__card"]}>
                <h2 className={styles["signin-form__title"]}>Đăng nhập</h2>
                <p className={styles["signin-form__desc"]}>
                  Chào mừng bạn trở lại với cộng đồng LearnFlow.
                </p>

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
                        <Icon name="Mail" size={18} />
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
                        <Icon name="Lock" size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={styles["signin-form__input"]}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`${styles["signin-form__input-adornment"]} ${styles["signin-form__input-adornment--end"]} ${styles["signin-form__eye-btn"]}`}
                        title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      >
                        {showPassword ? (
                          <Icon name="EyeOff" size={18} />
                        ) : (
                          <Icon name="Eye" size={18} />
                        )}
                      </button>
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
                    <span>Đăng nhập</span>
                    <Icon name="ArrowRight" size={18} className={styles["signin-form__submit-arrow"]} />
                  </button>
                </form>

                <div className={styles["signin-form__splitter"]}>
                  <span className={styles["signin-form__splitter-text"]}>
                    Hoặc tiếp tục với
                  </span>
                </div>

                <div className={styles["signin-form__social-list"]}>
                  <button
                    type="button"
                    className={styles["signin-form__social-btn"]}
                  >
                    <span className={styles["signin-form__social-icon"]}>
                      <Icon name="Google" size={18} />
                    </span>
                    Google
                  </button>
                  <button
                    type="button"
                    className={styles["signin-form__social-btn"]}
                  >
                    <span className={styles["signin-form__social-icon"]}>
                      <Icon name="Github" size={18} />
                    </span>
                    GitHub
                  </button>
                </div>

                <div className={styles["signin-form__redirect-group"]}>
                  <span className={styles["signin-form__redirect-text"]}>
                    Chưa có tài khoản?
                  </span>
                  <Link to="/signup" className={styles["signin-form__link"]}>
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
