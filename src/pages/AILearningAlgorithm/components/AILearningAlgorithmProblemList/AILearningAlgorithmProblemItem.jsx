import { Link } from "react-router";
import styles from "./AILearningAlgorithmProblemList.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Badge, Button } from "~/components/ui";

const DIFFICULTY_VARIANT_MAP = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

function AILearningAlgorithmProblemItem({ problem }) {
  const diffVariant = DIFFICULTY_VARIANT_MAP[problem.difficulty] || "warning";

  return (
    <Card hoverable className={`${styles.problem_card} reveal-card`}>
      <div className={styles.card_main}>
        {/* Title and Difficulty Badge */}
        <div className={styles.title_row}>
          <h3 className={styles.problem_title}>{problem.title}</h3>
          <Badge variant={diffVariant} size="sm" className={styles.diff_badge}>
            {problem.difficulty}
          </Badge>
        </div>

        {/* Tags Row */}
        {problem.tags && problem.tags.length > 0 && (
          <div className={styles.tags_row}>
            {problem.tags.map((tag) => (
              <Badge key={tag} variant="neutral" size="sm" className={styles.problem_tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Possible Weakness Box */}
        {problem.possibleWeakness && (
          <div className={styles.weakness_banner}>
            <Icon name="Target" size={14} className={styles.target_icon} />
            <span className={styles.weakness_text}>
              Possible weakness: <strong>{problem.possibleWeakness}</strong>
            </span>
          </div>
        )}
      </div>

      <div className={styles.card_side}>
        {/* Right Stats: WA and Solved */}
        <div className={styles.stats_counts}>
          <span className={styles.wa_count}>
            <Icon name="X" size={13} />
            <span>WA: {problem.waCount}</span>
          </span>
          <span className={`${styles.solved_count} ${problem.solvedCount > 0 ? styles["solved_count--active"] : ""}`}>
            <Icon name="Check" size={13} />
            <span>Solved: {problem.solvedCount}</span>
          </span>
        </div>

        {/* Action Button: View Submissions */}
        <Link to={`/ai-learning/problem/${problem.id}`} className={styles.view_link_wrapper}>
          <Button
            variant="outlined"
            size="sm"
            rightIcon="ArrowRight"
            className={styles.view_submissions_btn}
          >
            View Submissions
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default AILearningAlgorithmProblemItem;
