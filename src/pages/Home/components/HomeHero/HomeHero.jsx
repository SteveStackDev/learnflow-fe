import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./HomeHero.module.css";

function HomeHero() {
  return (
    <section className={styles["home-hero"]}>
      <div className={styles["home-hero__container"]}>
        <div className={styles["home-hero__content"]}>
          <div className={styles["home-hero__left"]}>
            <div className={styles["home-hero__badge-wrap"]}>
              <span className={styles["home-hero__badge"]}>
                <Icon name="Star" size={18} />
                Mới: Thử thách 30 ngày Java Spring Boot
              </span>
            </div>
            <h1 className={styles["home-hero__title"]}>
              Dòng chảy học tập, kiến tạo tương lai{" "}
              <span className={styles["home-hero__title--highlight"]}>
                lập trình viên
              </span>
            </h1>
            <p className={styles["home-hero__desc"]}>
              Học lập trình theo lộ trình bài bản, luyện tập coding challenge
              mỗi ngày và theo dõi tiến độ của riêng bạn trên nền tảng hiện
              đại nhất.
            </p>
            <div className={styles["home-hero__actions"]}>
              <Link
                to="/signup"
                className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--contained"]}`}
              >
                Bắt đầu ngay
              </Link>
              <Link
                to="/roadmap"
                className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--outlined"]}`}
              >
                Xem lộ trình
              </Link>
            </div>
          </div>

          {/* Right Side: Interactive Terminal & Dashboard Mockup */}
          <div className={styles["home-hero__right"]}>
            <div className={styles["home-hero__terminal-card"]}>
              <div className={styles["home-hero__terminal-header"]}>
                <div className={styles["home-hero__terminal-dots"]}>
                  <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--red"]}`} />
                  <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--yellow"]}`} />
                  <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--green"]}`} />
                </div>
                <span className={styles["home-hero__terminal-url"]}>
                  learnflow.dev/dashboard
                </span>
              </div>

              <div className={styles["home-hero__terminal-body"]}>
                {/* Dashboard Mini Stats Widgets */}
                <div className={styles["home-hero__dashboard-widgets"]}>
                  <div className={styles["home-hero__widget-box"]}>
                    <span className={styles["home-hero__widget-label"]}>Chuỗi Streak hiện tại</span>
                    <div className={styles["home-hero__widget-val-wrap"]}>
                      <span className={styles["home-hero__widget-val"]}>42</span>
                      <span className={styles["home-hero__widget-unit"]}>ngày 🔥</span>
                    </div>
                  </div>

                  <div className={styles["home-hero__widget-box"]}>
                    <span className={styles["home-hero__widget-label"]}>Hạng Thành viên</span>
                    <div className={styles["home-hero__widget-val-wrap"]}>
                      <span className={styles["home-hero__widget-val"]}>Vàng</span>
                      <span className={styles["home-hero__widget-unit"]}>🏅</span>
                    </div>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className={styles["home-hero__code-box"]}>
                  <div className={styles["home-hero__code-line"]}>
                    <span className={styles["home-hero__line-num"]}>1</span>
                    <code>
                      <span className={styles["home-hero__code-keyword"]}>const</span> <span className={styles["home-hero__code-var"]}>student</span> = <span className={styles["home-hero__code-func"]}>new</span> <span className={styles["home-hero__code-class"]}>LearnFlow</span>();
                    </code>
                  </div>
                  <div className={styles["home-hero__code-line"]}>
                    <span className={styles["home-hero__line-num"]}>2</span>
                    <code>
                      <span className={styles["home-hero__code-var"]}>student</span>.<span className={styles["home-hero__code-prop"]}>target</span> = <span className={styles["home-hero__code-num"]}>100</span>;
                    </code>
                  </div>
                  <div className={styles["home-hero__code-line"]}>
                    <span className={styles["home-hero__line-num"]}>3</span>
                    <code>
                      <span className={styles["home-hero__code-keyword"]}>return</span> <span className={styles["home-hero__code-var"]}>target</span> - <span className={styles["home-hero__code-var"]}>progress</span>;
                    </code>
                  </div>
                  <div className={styles["home-hero__code-line"]}>
                    <span className={styles["home-hero__line-num"]}>4</span>
                    <code>
                      <span className={styles["home-hero__code-comment"]}>// {`>`}</span>
                    </code>
                  </div>
                  <div className={styles["home-hero__code-line"]}>
                    <span className={styles["home-hero__line-num"]}>5</span>
                    <code>
                      <span className={styles["home-hero__code-string"]}>🔥 Bắt đầu buổi học ngay...</span>
                    </code>
                  </div>

                  <div className={styles["home-hero__code-footer-btn"]}>
                    <span>Đang phát triển...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
