import { Link } from "react-router";
import styles from "./AILearningAlgorithmHeader.module.css";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

function AILearningAlgorithmHeader({
  name = "Binary Search",
  statusLabel = "Cần củng cố",
  subtitle = "Problems where you received Wrong Answer",
  aiAnalysisUpdated = "12 phút trước",
}) {
  return (
    <div className={styles.header_wrapper}>
      {/* Top Bar Navigation */}
      <div className={styles.top_nav}>
        <Link to="/ai-learning" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={15} />
          <span>Back to AI Learning</span>
        </Link>

        {aiAnalysisUpdated && (
          <div className={styles.ai_status_chip}>
            <span className={styles.green_pulse_dot} />
            <span className={styles.ai_status_text}>
              <strong>AI</strong> phân tích cập nhật {aiAnalysisUpdated}
            </span>
          </div>
        )}
      </div>

      {/* Main Title Row */}
      <div className={styles.title_row}>
        <h1 className={styles.title}>{name}</h1>
        {statusLabel && (
          <Badge variant="warning" size="md" className={styles.status_badge}>
            {statusLabel}
          </Badge>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

export default AILearningAlgorithmHeader;
