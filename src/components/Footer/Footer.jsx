import { Link } from "react-router";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div
        className={`${styles.footer__container} ${styles["footer__container--cta"]}`}
      >
        <div className={styles.footer__cta}>
          <div className={styles["footer__cta-content"]}>
            <p className={styles["footer__cta-title"]}>
              Sẵn sàng bắt đầu hành trình học lập trình cùng LearnFlow?
            </p>
            <p className={styles["footer__cta-description"]}>
              Hàng nghìn bài tập, lộ trình học rõ ràng và cộng đồng luôn đồng
              hành cùng bạn.
            </p>
          </div>
          <div className={styles["footer__cta-actions"]}>
            <button
              className={`${styles.footer__btn} ${styles["footer__btn--primary"]}`}
            >
              Đăng ký miễn phí
            </button>
            <button
              className={`${styles.footer__btn} ${styles["footer__btn--secondary"]}`}
            >
              Khám phá lộ trình
            </button>
          </div>
        </div>
      </div>

      <hr className={styles.footer__divider} />

      <div
        className={`${styles.footer__container} ${styles["footer__container--main"]}`}
      >
        <div className={styles.footer__grid}>
          <div
            className={`${styles.footer__col} ${styles["footer__col--brand"]}`}
          >
            <div className={styles.footer__brand}>
              <div className={styles["footer__brand-logo"]} />
              <span className={styles["footer__brand-name"]}>LearnFlow</span>
            </div>
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
              <div className={styles["footer__newsletter-form"]}>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className={styles["footer__newsletter-input"]}
                />
                <button
                  className={`${styles.footer__btn} ${styles["footer__btn--primary"]}`}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${styles.footer__col} ${styles["footer__col--links"]}`}
          >
            <div className={styles.footer__nav}>
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

              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>HỌC TẬP</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <Link to="/courses" className={styles["footer__nav-link"]}>
                      Khóa học
                    </Link>
                  </li>
                  <li>
                    <Link to="/problems" className={styles["footer__nav-link"]}>
                      Bài tập
                    </Link>
                  </li>
                  <li>
                    <Link to="/contests" className={styles["footer__nav-link"]}>
                      Cuộc thi
                    </Link>
                  </li>
                  <li>
                    <Link to="/badges" className={styles["footer__nav-link"]}>
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

      <div
        className={`${styles.footer__container} ${styles["footer__container--bottom"]}`}
      >
        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            <span>© 2026 LearnFlow. Tất cả các quyền được bảo lưu.</span>
            <span>
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
              <i className="fab fa-facebook">FB</i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={styles["footer__social-icon"]}
            >
              <i className="fab fa-github">GH</i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={styles["footer__social-icon"]}
            >
              <i className="fab fa-linkedin">LN</i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className={styles["footer__social-icon"]}
            >
              <i className="fab fa-youtube">YT</i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className={styles["footer__social-icon"]}
            >
              <i className="fab fa-tiktok">TT</i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
