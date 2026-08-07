import Icon from "~/components/Icon/Icon";
import styles from "./BadgeHero.module.css";

function BadgeHero() {
  return (
    <section className={styles["badge-hero"]}>
      <div className={styles["badge-hero__container"]}>
        <div className={styles["badge-hero__grid"]}>
          {/* Left Content */}
          <div className={styles["badge-hero__content"]}>
            <div className={styles["badge-hero__badge-wrap"]}>
              <span className={styles["badge-hero__tag"]}>🏆 Hệ Thống Danh Hiệu & Đổi Thưởng</span>
            </div>
            <h1 className={styles["badge-hero__title"]}>
              Chinh Phục Danh Hiệu{" "}
              <span className={styles["badge-hero__title--highlight"]}>
                Khẳng&nbsp;Định&nbsp;Năng&nbsp;Lực
              </span>
            </h1>
            <p className={styles["badge-hero__desc"]}>
              Thu thập các huy hiệu độc quyền từ bài lab, streak học tập và các cuộc thi coding. Mở
              khóa đặc quyền, tích lũy điểm XP và khẳng định tên tuổi trên bảng vàng LearnFlow.
            </p>
            <div className={styles["badge-hero__actions"]}>
              <button
                type="button"
                className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--contained"]}`}
              >
                <Icon name="ArrowRight" size={18} strokeWidth={2.5} />
                <span>Khám phá nhiệm vụ</span>
              </button>
              <button
                type="button"
                className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--outlined"]}`}
              >
                <Icon name="Book" size={16} />
                <span>Cách kiếm Badge</span>
              </button>
            </div>
          </div>

          {/* Right Gamification Showcase Card */}
          <div className={styles["badge-hero__showcase"]}>
            <div className={`${styles["badge-showcase__card"]} reveal-card`}>
              <div className={styles["badge-showcase__badge-header"]}>
                <div className={styles["badge-showcase__medal-box"]}>
                  <span className={styles["badge-showcase__medal-emoji"]}>🥇</span>
                </div>
                <div className={styles["badge-showcase__badge-meta"]}>
                  <span className={styles["badge-showcase__rank-badge"]}>LEVEL 12 MASTER</span>
                  <h3 className={styles["badge-showcase__badge-name"]}>Legend Coder Badge</h3>
                </div>
              </div>

              {/* XP Progress */}
              <div className={styles["badge-showcase__xp-wrapper"]}>
                <div className={styles["badge-showcase__xp-info"]}>
                  <span className={styles["badge-showcase__xp-label"]}>
                    Tiến độ kinh nghiệm (XP)
                  </span>
                  <span className={styles["badge-showcase__xp-val"]}>4,850 / 5,000 XP</span>
                </div>
                <div className={styles["badge-showcase__xp-bar"]}>
                  <div className={styles["badge-showcase__xp-fill"]} style={{ width: "97%" }} />
                </div>
              </div>

              {/* Achievement Chips */}
              <div className={styles["badge-showcase__chips"]}>
                <div
                  className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--flame"]}`}
                >
                  <span>🔥 7 Ngày Streak</span>
                </div>
                <div
                  className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--gold"]}`}
                >
                  <span>⚡ Top 1% Coders</span>
                </div>
                <div
                  className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--emerald"]}`}
                >
                  <span>🎯 50+ Labs Done</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BadgeHero;
