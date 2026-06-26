// Data
import { notFoundData } from "./data";
// Import CSS Modules
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <>
      <div className={styles.notfoundpage}>
        {/* Main 404 Content Section */}
        <section className={styles["notfound-content"]}>
          {/* Large 404 Background Text */}
          <h1 className={styles["notfound-content__badge"]}>404</h1>

          <h2 className={styles["notfound-content__title"]}>
            Oops! Có vẻ bạn vừa đi lạc khỏi LearnFlow
          </h2>

          <p className={styles["notfound-content__desc"]}>
            Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc được chuyển
            sang một địa chỉ mới. Đừng lo, các kiến thức lập trình vẫn đang chờ
            bạn ở các trang khác!
          </p>

          {/* Quick Navigation Buttons */}
          <div className={styles["notfound-content__btn-group"]}>
            {notFoundData.actions.map((obj, index) => (
              <button
                key={index}
                type="button"
                className={`${styles["notfound-content__nav-btn"]} ${styles[`notfound-content__nav-btn--${obj.actionVariant}`]}`}
              >
                {obj.iconName === "HomeIcon" && (
                  <span className={styles["notfound-content__btn-icon"]}>
                    [HomeIcon]
                  </span>
                )}
                {obj.text}
              </button>
            ))}
          </div>
        </section>

        {/* Support / Contact Footer Box */}
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
              <button
                type="button"
                className={styles["notfound-footer__contact-btn"]}
              >
                <span className={styles["notfound-footer__contact-icon"]}>
                  [HeadsetIcon]
                </span>{" "}
                Trang liên hệ
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default NotFound;
