import { Link } from "react-router";
// Data
import { notFoundData } from "./data";
// Import CSS Modules
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <div className={styles.notfoundpage}>
        {/* Ambient Glow Orbs */}
        <div className={styles["notfoundpage__orb-1"]} />
        <div className={styles["notfoundpage__orb-2"]} />

        <div className={styles.notfoundpage__container}>
          {/* Content Section */}
          <section className={styles["notfound-content"]}>
            <h1 className={styles["notfound-content__badge"]}>404</h1>

            <div className={styles["notfound-content__text-box"]}>
              <h2 className={styles["notfound-content__title"]}>
                Oops! Có vẻ bạn vừa đi lạc khỏi LearnFlow
              </h2>

              <p className={styles["notfound-content__desc"]}>
                Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc được chuyển
                sang một địa chỉ mới. Đừng lo, các kiến thức lập trình vẫn đang chờ
                bạn ở các trang khác!
              </p>
            </div>

            {/* Quick Navigation Section */}
            <div className={styles["notfound-content__btn-group"]}>
              {notFoundData.actions.map((obj, index) => (
                <Link
                  key={index}
                  to={obj.path}
                  className={`${styles["notfound-content__nav-btn"]} ${styles[`notfound-content__nav-btn--${obj.actionVariant}`]}`}
                >
                  {obj.iconName === "HomeIcon" && (
                    <span className={styles["notfound-content__btn-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </span>
                  )}
                  {obj.text}
                </Link>
              ))}
            </div>
          </section>

          {/* Footer Support Card Section */}
          <footer className={styles["notfound-footer"]}>
            <div className={styles["notfound-footer__support-card"]}>
              <div className={styles["notfound-footer__support-content"]}>
                <h3 className={styles["notfound-footer__support-title"]}>
                  Cần thêm sự hỗ trợ?
                </h3>
                <p className={styles["notfound-footer__support-desc"]}>
                  Đội ngũ LearnFlow luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn
                  trong quá trình học tập.
                </p>
              </div>
              <div className={styles["notfound-footer__support-action"]}>
                <Link
                  to="/contact"
                  className={styles["notfound-footer__contact-btn"]}
                >
                  <span className={styles["notfound-footer__contact-icon"]}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </span>{" "}
                  Trang liên hệ
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default NotFound;
