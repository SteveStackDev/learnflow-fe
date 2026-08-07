import { useState } from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./Footer.module.css";

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleComingSoon = (featureName) => {
    toast.info(
      `Trang "${featureName}" đang được phát triển và sẽ sớm ra mắt! (UI hoàn thành – chờ kết nối API/backend)`,
      "Tính năng sắp ra mắt",
    );
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ!", "Đăng ký thất bại");
      return;
    }
    // UI hoàn thành – chờ kết nối API/backend.
    toast.success(
      "Đăng ký nhận bản tin thành công! (UI hoàn thành – chờ kết nối API/backend)",
      "Đăng ký nhận tin (Mock)",
    );
    setNewsletterEmail("");
  };
  return (
    <footer className={styles.footer}>
      {/* Floating CTA Banner */}
      <div className={`${styles.footer__container} ${styles["footer__container--cta"]}`}>
        <div className={styles.footer__cta}>
          <div className={styles["footer__cta-content"]}>
            <h3 className={styles["footer__cta-title"]}>
              Sẵn sàng bắt đầu hành trình học lập trình cùng LearnFlow?
            </h3>
            <p className={styles["footer__cta-description"]}>
              Hàng nghìn bài tập, lộ trình học rõ ràng và cộng đồng luôn đồng hành cùng bạn.
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
      <div className={`${styles.footer__container} ${styles["footer__container--main"]}`}>
        <div className={styles.footer__grid}>
          {/* Column 1: Brand & Newsletter */}
          <div className={`${styles.footer__col} ${styles["footer__col--brand"]}`}>
            <Link to="/" className={styles.footer__brand}>
              <div className={styles["footer__brand-logo"]}>
                <Icon name="LogoCap" size={22} style={{ color: "#ffffff" }} />
              </div>
              <span className={styles["footer__brand-name"]}>LearnFlow</span>
            </Link>
            <p className={styles.footer__about}>
              LearnFlow là nền tảng học lập trình giúp bạn xây dựng lộ trình học rõ ràng, luyện tập
              thông qua bài tập thực tế và phát triển kỹ năng để sẵn sàng cho sự nghiệp trong ngành
              công nghệ thông tin.
            </p>

            <div className={styles.footer__newsletter}>
              <label
                htmlFor="footer-newsletter-email"
                className={styles["footer__newsletter-title"]}
              >
                Nhận thông tin mới nhất
              </label>
              <p className={styles["footer__newsletter-desc"]}>
                Đăng ký để nhận thông báo về khóa học mới và cập nhật từ LearnFlow.
              </p>
              <form
                noValidate
                className={styles["footer__newsletter-form"]}
                onSubmit={handleNewsletterSubmit}
              >
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email của bạn"
                  aria-label="Email của bạn"
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
          <div className={`${styles.footer__col} ${styles["footer__col--links"]}`}>
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
                    <Link to="/leaderboard" className={styles["footer__nav-link"]}>
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
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Hồ sơ cá nhân")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Hồ sơ cá nhân <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Cài đặt")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Cài đặt <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* HỖ TRỢ */}
              <div className={styles["footer__nav-group"]}>
                <h4 className={styles["footer__nav-title"]}>HỖ TRỢ</h4>
                <ul className={styles["footer__nav-list"]}>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Trung tâm trợ giúp")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Trung tâm trợ giúp{" "}
                      <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Câu hỏi thường gặp")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Câu hỏi thường gặp{" "}
                      <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Chính sách bảo mật")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Chính sách bảo mật{" "}
                      <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleComingSoon("Điều khoản sử dụng")}
                      className={styles["footer__nav-link-btn"]}
                    >
                      Điều khoản sử dụng{" "}
                      <span className={styles["footer__badge-upcoming"]}>Sắp có</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.footer__divider} />

      {/* Bottom Bar */}
      <div className={`${styles.footer__container} ${styles["footer__container--bottom"]}`}>
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
              <Icon name="Facebook" size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={styles["footer__social-icon"]}
            >
              <Icon name="Github" size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={styles["footer__social-icon"]}
            >
              <Icon name="Linkedin" size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className={styles["footer__social-icon"]}
            >
              <Icon name="Youtube" size={18} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className={styles["footer__social-icon"]}
            >
              <Icon name="Discord" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
