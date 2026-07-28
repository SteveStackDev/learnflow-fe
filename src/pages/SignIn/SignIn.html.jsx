import { useState, useEffect } from "react";
import { Link } from "react-router";
// Data
import { signInData } from "./data";
// Import CSS Modules
import styles from "./SignIn.module.css";

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
                  <div key={index} className={styles["signin-info__feat-card"]}>
                    <div className={styles["signin-info__feat-icon"]}>
                      {index === 0 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                          <path d="M4 22h16"/>
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6"/>
                          <polyline points="8 6 2 12 8 18"/>
                        </svg>
                      )}
                      {index === 3 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="8" r="7"/>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                        </svg>
                      )}
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
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
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
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
                    <svg
                      className={styles["signin-form__submit-arrow"]}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
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
                    className={styles["signin-form__social-btn"]}
                  >
                    <span className={styles["signin-form__social-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
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
