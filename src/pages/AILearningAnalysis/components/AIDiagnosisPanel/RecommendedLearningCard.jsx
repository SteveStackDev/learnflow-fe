import styles from "./AIDiagnosisPanel.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function RecommendedLearningCard({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <Card hoverable className={styles.recommend_card}>
      <h3 className={styles.card_title}>Recommended Learning</h3>
      <p className={styles.card_subtitle}>
        Based on this mistake, you may want to review:
      </p>

      <div className={styles.recommend_stack}>
        {recommendations.map((rec) => (
          <button
            key={rec.id}
            type="button"
            className={styles.recommend_item_btn}
            onClick={() => {
              alert(`Mở bài học: ${rec.title}`);
            }}
          >
            <Icon name="Play" size={14} className={styles.play_icon} />
            <span className={styles.recommend_title}>{rec.title}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default RecommendedLearningCard;
