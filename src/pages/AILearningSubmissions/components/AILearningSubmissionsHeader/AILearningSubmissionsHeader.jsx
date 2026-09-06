import { Link } from "react-router";
import styles from "./AILearningSubmissionsHeader.module.css";
import Icon from "~/components/Icon/Icon";

function AILearningSubmissionsHeader({
  problemTitle = "Binary Search On Answer",
  problemCode = "#BS-102",
  difficultyLabel = "Trung bình (Medium)",
  subtitle = "Lịch sử các lần nộp bài (Your Submission History) & phân tích thông minh từ AI Mentor",
}) {
  return (
    <div className={styles.header_section}>
      {/* Top Navigation Row: Back Button */}
      <div className={styles.top_nav}>
        <Link to="/ai-learning" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={15} />
          <span>Quay lại AI Learning</span>
        </Link>
      </div>

      {/* Main Title Row with Badges */}
      <div className={styles.title_row}>
        <h1 className={styles.title}>{problemTitle}</h1>
        <div className={styles.badge_group}>
          <span className={styles.difficulty_badge}>
            {difficultyLabel}
          </span>
          <span className={styles.code_badge}>
            {problemCode}
          </span>
        </div>
      </div>

      {/* Subtitle Description */}
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

export default AILearningSubmissionsHeader;
