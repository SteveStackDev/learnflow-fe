import { Link } from "react-router";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Floating CTA Banner */}
      <div
        className={`${styles.footer__container} ${styles["footer__container--cta"]}`}
      >
        <div className={styles.footer__cta}>
          <div className={styles["footer__cta-content"]}>
            <h3 className={styles["footer__cta-title"]}>
              Sẵn sàng bắt đầu hành trình học lập trình cùng LearnFlow?
            </h3>
            <p className={styles["footer__cta-description"]}>
              Hàng nghìn bài tập, lộ trình học rõ ràng và cộng đồng luôn đồng
              hành cùng bạn.
            </p>
          </div>
          <div className={styles["footer__cta-actions"]}>
            <Link
              to="/signup"
              className={`${styles.footer__btn} ${styles["footer__btn--primary"]}`}
            >
              Đăng ký miễn phí
            </Link>
            <Link
              to="/roadmap"
              className={`${styles.footer__btn} ${styles["footer__btn--secondary"]}`}
            >
              Khám phá lộ trình
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div
        className={`${styles.footer__container} ${styles["footer__container--main"]}`}
      >
        <div className={styles.footer__grid}>
          {/* Column 1: Brand & Newsletter */}
          <div
            className={`${styles.footer__col} ${styles["footer__col--brand"]}`}
          >
            <Link to="/" className={styles.footer__brand}>
              <div className={styles["footer__brand-logo"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#ffffff" />
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17 5 13.18z" fill="#ffffff" opacity="0.85" />
                </svg>
              </div>
              <span className={styles["footer__brand-name"]}>LearnFlow</span>
            </Link>
            <p className={styles.footer__about}>
              LearnFlow là nền tảng học lập trình giúp bạn xây dựng lộ trình học
              rõ ràng, luyện tập thông qua bài tập thực tế và phát triển kỹ năng
              để sẵn sàng cho sự nghiệp trong ngành công nghệ thông tin.
            </p>

            <div className={styles.footer__newsletter}>
              <h4 className={styles["footer__newsletter-title"]}>
                Nhận thông tin mới nhất
              </h4>
              <p className={styles["footer__newsletter-desc"]}>
                Đăng ký để nhận thông báo về khóa học mới và cập nhật từ
                LearnFlow.
              </p>
              <form
                className={styles["footer__newsletter-form"]}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className={styles["footer__newsletter-input"]}
                />
                <button
                  type="submit"
                  className={`${styles.footer__btn} ${styles["footer__btn--primary"]} ${styles["footer__btn--sm"]}`}
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Navigation Groups */}
          <div
            className={`${styles.footer__col} ${styles["footer__col--links"]}`}
          >
            <div className={styles.footer__nav}>
              {/* KHÁM PHÁ */}
              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>KHÁM PHÁ</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <Link to="/" className={styles["footer__nav-link"]}>
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className={styles["footer__nav-link"]}>
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link to="/roadmap" className={styles["footer__nav-link"]}>
                      Lộ trình
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className={styles["footer__nav-link"]}>
                      Bảng giá
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className={styles["footer__nav-link"]}>
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* HỌC TẬP */}
              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>HỌC TẬP</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <Link to="/course" className={styles["footer__nav-link"]}>
                      Khóa học
                    </Link>
                  </li>
                  <li>
                    <Link to="/problem" className={styles["footer__nav-link"]}>
                      Bài tập
                    </Link>
                  </li>
                  <li>
                    <Link to="/contest" className={styles["footer__nav-link"]}>
                      Cuộc thi
                    </Link>
                  </li>
                  <li>
                    <Link to="/badge" className={styles["footer__nav-link"]}>
                      Danh hiệu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/leaderboard"
                      className={styles["footer__nav-link"]}
                    >
                      Bảng xếp hạng
                    </Link>
                  </li>
                </ul>
              </div>

              {/* TÀI KHOẢN */}
              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>TÀI KHOẢN</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <Link to="/signin" className={styles["footer__nav-link"]}>
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className={styles["footer__nav-link"]}>
                      Đăng ký
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className={styles["footer__nav-link"]}>
                      Hồ sơ cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className={styles["footer__nav-link"]}>
                      Cài đặt
                    </Link>
                  </li>
                </ul>
              </div>

              {/* HỖ TRỢ */}
              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>HỖ TRỢ</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <Link to="/help" className={styles["footer__nav-link"]}>
                      Trung tâm trợ giúp
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className={styles["footer__nav-link"]}>
                      Câu hỏi thường gặp
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className={styles["footer__nav-link"]}>
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className={styles["footer__nav-link"]}>
                      Điều khoản sử dụng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.footer__divider} />

      {/* Bottom Bar */}
      <div
        className={`${styles.footer__container} ${styles["footer__container--bottom"]}`}
      >
        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            <span className={styles["footer__copyright-text"]}>
              © 2026 LearnFlow. Tất cả các quyền được bảo lưu.
            </span>
            <span className={styles["footer__copyright-heart"]}>
              ❤️ Được xây dựng với đam mê dành cho cộng đồng học lập trình.
            </span>
          </div>

          <div className={styles.footer__socials}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className={styles["footer__social-icon"]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={styles["footer__social-icon"]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={styles["footer__social-icon"]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className={styles["footer__social-icon"]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className={styles["footer__social-icon"]}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
