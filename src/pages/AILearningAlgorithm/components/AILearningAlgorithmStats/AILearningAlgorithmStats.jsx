import styles from "./AILearningAlgorithmStats.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function AILearningAlgorithmStats({
  problemsCount = 3,
  waTotalCount = 11,
  mainWeakness = "Boundary & Off-by-one",
  guideRecommendation = "Đọc Mini-Guide bên dưới",
  onScrollToGuide,
}) {
  return (
    <div className={styles.stats_grid}>
      {/* 1. Bài cần làm lại */}
      <Card hoverable className={styles.stat_card}>
        <span className={styles.stat_label}>BÀI CẦN LÀM LẠI</span>
        <div className={styles.stat_value_row}>
          <span className={`${styles.stat_value} ${styles["stat_value--danger"]}`}>
            {problemsCount} bài
          </span>
          <span className={styles.stat_subtext}>có lần nộp WA</span>
        </div>
      </Card>

      {/* 2. Tổng số lượt WA */}
      <Card hoverable className={styles.stat_card}>
        <span className={styles.stat_label}>TỔNG SỐ LƯỢT WA</span>
        <div className={styles.stat_value_row}>
          <span className={`${styles.stat_value} ${styles["stat_value--danger"]}`}>
            {waTotalCount} lần
          </span>
          <span className={styles.stat_subtext}>trong 7 ngày</span>
        </div>
      </Card>

      {/* 3. Điểm yếu chính */}
      <Card hoverable className={styles.stat_card}>
        <span className={styles.stat_label}>ĐIỂM YẾU CHÍNH</span>
        <div className={styles.stat_value_row}>
          <span className={`${styles.stat_value} ${styles["stat_value--warning"]}`}>
            {mainWeakness}
          </span>
        </div>
      </Card>

      {/* 4. Đề xuất học tập */}
      <Card
        hoverable
        className={`${styles.stat_card} ${styles["stat_card--action"]}`}
        onClick={onScrollToGuide}
      >
        <span className={styles.stat_label}>ĐỀ XUẤT HỌC TẬP</span>
        <div className={styles.stat_action_row}>
          <span className={styles.stat_action_text}>{guideRecommendation}</span>
          <Icon name="ChevronDown" size={15} />
        </div>
      </Card>
    </div>
  );
}

export default AILearningAlgorithmStats;
