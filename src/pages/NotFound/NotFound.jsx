import { Link } from "react-router";
// Data
import { notFoundData } from "./data";
// Import CSS Modules
import styles from "./NotFound.module.css";
// Components
import Icon from "~/components/Icon/Icon";

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
              {notFoundData.actions.map((obj) => (
                <Link
                  key={obj.id || obj.slug || obj.text || obj.path || obj}
                  to={obj.path}
                  className={`${styles["notfound-content__nav-btn"]} ${styles[`notfound-content__nav-btn--${obj.actionVariant}`]}`}
                >
                  {obj.iconName && (
                    <span className={styles["notfound-content__btn-icon"]}>
                      <Icon name={obj.iconName} size={18} />
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
                    <Icon name="Headphones" size={18} />
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
