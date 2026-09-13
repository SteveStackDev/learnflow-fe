import { Link } from "react-router";
import styles from "./AILearningAnalysisHeader.module.css";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

function AILearningAnalysisHeader({ submission, submissionId }) {
  if (!submission) return null;

  const {
    problemId = "binary-search-on-answer",
    problemTitle = "Binary Search on Answer",
    status = "WA",
    submittedAt = "Sep 3, 18:47",
    language = "C++",
    runtime = "42 ms",
    memory = "8.4 MB",
  } = submission;

  const isWA = status === "WA";

  return (
    <div className={styles.header_section}>
      {/* Top Navigation Row */}
      <div className={styles.top_nav}>
        <Link
          to={`/ai-learning/problem/${problemId}`}
          className={styles.back_btn}
        >
          <Icon name="ArrowLeft" size={15} />
          <span>Back to Submission History</span>
        </Link>
      </div>

      {/* Category / Problem Breadcrumb Link */}
      <div className={styles.problem_link_row}>
        <Link
          to={`/ai-learning/problem/${problemId}`}
          className={styles.problem_category_link}
        >
          {problemTitle}
        </Link>
      </div>

      {/* Title & Status Badge Row */}
      <div className={styles.title_row}>
        <h1 className={styles.title}>Submission #{submissionId}</h1>
        <Badge
          variant={isWA ? "error" : "success"}
          size="md"
          icon={isWA ? "X" : "Check"}
          className={styles.status_badge}
        >
          {isWA ? "WA - Wrong Answer" : `${status} - Accepted`}
        </Badge>
      </div>

      {/* Metadata Row */}
      <div className={styles.meta_row}>
        <span className={styles.meta_item}>
          <Icon name="Clock" size={13} />
          <span>{submittedAt}</span>
        </span>

        <span className={styles.meta_dot}>•</span>

        <span className={styles.meta_item}>
          <Icon name="Code" size={13} />
          <span>{language}</span>
        </span>

        <span className={styles.meta_dot}>•</span>

        <span className={styles.meta_item}>
          <Icon name="Zap" size={13} />
          <span>{runtime}</span>
        </span>

        <span className={styles.meta_dot}>•</span>

        <span className={styles.meta_item}>
          <Icon name="HardDrive" size={13} />
          <span>{memory}</span>
        </span>
      </div>
    </div>
  );
}

export default AILearningAnalysisHeader;
