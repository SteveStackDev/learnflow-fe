import { Link } from "react-router";
import styles from "./AILearningAlgorithmSidebar.module.css";
import { Card, Badge, Button } from "~/components/ui";

function QuickPracticeCard({ practice }) {
  if (!practice) return null;

  const {
    title = "Thực hành giải quyết lỗi ngay",
    description = "Làm lại bài Lower Bound ngay bây giờ với gợi ý từng bước từ trợ lý AI.",
    problemId = "lower-bound",
    rewardBadge = "+35 Điểm năng lực",
    actionLabel = "Bắt đầu fix",
  } = practice;

  return (
    <Card hoverable className={styles.practice_card}>
      <h3 className={styles.practice_title}>{title}</h3>
      <p className={styles.practice_description}>{description}</p>

      <div className={styles.practice_footer}>
        <Badge variant="success" size="sm" className={styles.reward_badge}>
          {rewardBadge}
        </Badge>

        <Link to={`/ai-learning/problem/${problemId}`} className={styles.fix_link_wrapper}>
          <Button variant="dark" size="sm" className={styles.start_fix_btn}>
            {actionLabel}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default QuickPracticeCard;
