import styles from "./AILearningSubmissionsStats.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function AILearningSubmissionsStats({ stats }) {
  const {
    totalAttempts = "4 lần thử",
    totalAttemptsBadge = "#4",
    latestResult = "AC - Đã chấp nhận",
    commonError = "3x WA (Sai biên tìm kiếm)",
  } = stats || {};

  return (
    <div className={styles.stats_grid}>
      {/* Card 1: Tổng số lần nộp */}
      <Card hoverable className={`${styles.stat_card} ${styles["stat_card--attempts"]}`}>
        <div className={`${styles.icon_box} ${styles["icon_box--attempts"]}`}>
          <span className={styles.attempts_badge_text}>{totalAttemptsBadge}</span>
        </div>
        <div className={styles.stat_content}>
          <span className={styles.stat_label}>Tổng số lần nộp</span>
          <span className={styles.stat_value}>{totalAttempts}</span>
        </div>
      </Card>

      {/* Card 2: Kết quả mới nhất */}
      <Card hoverable className={`${styles.stat_card} ${styles["stat_card--success"]}`}>
        <div className={`${styles.icon_box} ${styles["icon_box--success"]}`}>
          <Icon name="Check" size={18} />
        </div>
        <div className={styles.stat_content}>
          <span className={styles.stat_label}>Kết quả mới nhất</span>
          <span className={`${styles.stat_value} ${styles["stat_value--success"]}`}>
            {latestResult}
          </span>
        </div>
      </Card>

      {/* Card 3: Lỗi phổ biến nhất */}
      <Card hoverable className={`${styles.stat_card} ${styles["stat_card--error"]}`}>
        <div className={`${styles.icon_box} ${styles["icon_box--error"]}`}>
          <Icon name="AlertTriangle" size={17} />
        </div>
        <div className={styles.stat_content}>
          <span className={styles.stat_label}>Lỗi phổ biến nhất</span>
          <span className={`${styles.stat_value} ${styles["stat_value--error"]}`}>
            {commonError}
          </span>
        </div>
      </Card>
    </div>
  );
}

export default AILearningSubmissionsStats;
