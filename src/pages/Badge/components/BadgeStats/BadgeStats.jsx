import Icon from "~/components/Icon/Icon";
import styles from "./BadgeStats.module.css";

function BadgeStats({ totalCount, receivedCount, progressPercent }) {
  return (
    <section className={styles["badge-stats"]}>
      <div className={styles["badge-stats__container"]}>
        <div className={styles["badge-stats__list"]}>
          <div className={`${styles["badge-stats__card"]} reveal-card`}>
            <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--blue"]}`}>
              <Icon name="Award" size={20} />
            </div>
            <div className={styles["badge-stats__info"]}>
              <span className={styles["badge-stats__label"]}>
                Tổng danh hiệu
              </span>
              <span className={styles["badge-stats__value"]}>{totalCount}</span>
            </div>
          </div>

          <div className={`${styles["badge-stats__card"]} reveal-card`}>
            <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--yellow"]}`}>
              <Icon name="Trophy" size={20} />
            </div>
            <div className={styles["badge-stats__info"]}>
              <span className={styles["badge-stats__label"]}>
                Đã đạt được
              </span>
              <span className={styles["badge-stats__value"]}>{receivedCount}</span>
            </div>
          </div>

          <div className={`${styles["badge-stats__card"]} reveal-card`}>
            <div className={styles["badge-stats__progress-wrapper"]}>
              <div className={styles["badge-stats__progress-info"]}>
                <span className={styles["badge-stats__label"]}>
                  Tiến độ tổng quan
                </span>
                <span className={styles["badge-stats__percent"]}>{progressPercent}%</span>
              </div>
              {/* Custom Linear Progress */}
              <div className={styles["badge-stats__progress-bar"]}>
                <div
                  className={styles["badge-stats__progress-fill"]}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BadgeStats;
