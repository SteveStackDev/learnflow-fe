import { Link } from "react-router";
import styles from "./AILearningSubmissionsList.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Badge, Button } from "~/components/ui";

const TAG_VARIANT_MAP = {
  latest: "success",
  "test-error": "error",
  first: "neutral",
};

function AILearningSubmissionItem({ submission, onViewCode }) {
  const isAC = submission.status === "AC";
  const isWA = submission.status === "WA";

  return (
    <Card
      hoverable
      className={`${styles.submission_card} ${isAC ? styles["submission_card--ac"] : ""
        } reveal-card`}
    >
      {/* Left Status Icon & Main Information */}
      <div className={styles.card_left}>
        {/* Circle Status Icon */}
        <div
          className={`${styles.status_circle} ${isAC ? styles["status_circle--ac"] : styles["status_circle--wa"]
            }`}
        >
          {isAC ? (
            <Icon name="Check" size={16} />
          ) : (
            <Icon name="X" size={16} />
          )}
        </div>

        {/* Content Info */}
        <div className={styles.info_block}>
          {/* Status Title & Pill Tag */}
          <div className={styles.status_title_row}>
            <span
              className={`${styles.status_name} ${isAC ? styles["status_name--ac"] : styles["status_name--wa"]
                }`}
            >
              {submission.statusLabel || (isAC ? "AC - Accepted" : "WA - Wrong Answer")}
            </span>

            {submission.tag && (
              <Badge
                variant={TAG_VARIANT_MAP[submission.tagType] || "neutral"}
                size="sm"
                className={styles.tag_badge}
              >
                {submission.tag}
              </Badge>
            )}
          </div>

          {/* Metadata Row */}
          <div className={styles.meta_row}>
            <span className={styles.meta_item}>
              <Icon name="Clock" size={13} />
              <span>{submission.submittedAt}</span>
            </span>

            <span className={styles.meta_dot}>•</span>

            <span className={styles.meta_item}>
              <Icon name="Code" size={13} />
              <span>{submission.language || "C++"}</span>
            </span>

            {submission.runtime && (
              <>
                <span className={styles.meta_dot}>•</span>
                <span className={styles.meta_item}>
                  <span>Thời gian: {submission.runtime}</span>
                </span>
              </>
            )}

            {submission.memory && (
              <>
                <span className={styles.meta_dot}>•</span>
                <span className={styles.meta_item}>
                  <span>Bộ nhớ: {submission.memory}</span>
                </span>
              </>
            )}

            {submission.errorNote && (
              <>
                <span className={styles.meta_dot}>•</span>
                <span className={styles.error_note}>
                  {submission.errorNote}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className={styles.card_right}>
        {/* 1. Analyze Button (WA AI Diagnosis) */}
        {submission.canAnalyze && (
          <Link
            to={`/ai-learning/submission/${submission.id}`}
            className={styles.analyze_link_wrapper}
          >
            <Button
              variant="gradient"
              size="sm"
              leftIcon="Sparkles"
              className={styles.analyze_btn}
            >
              Analyze
            </Button>
          </Link>
        )}

        {/* 2. View Code Button (Accepted) */}
        {submission.canViewCode && (
          <Button
            variant="outlined"
            size="sm"
            onClick={() => onViewCode && onViewCode(submission)}
            className={styles.view_code_btn}
          >
            Xem mã nguồn
          </Button>
        )}

        {/* 3. Detail Button */}
        {submission.canViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewCode && onViewCode(submission)}
            className={styles.details_btn}
          >
            Chi tiết
          </Button>
        )}

        {/* 4. More Options Button (Three Dots) */}
        {(submission.canViewCode || submission.canViewDetails) && (
          <button
            type="button"
            onClick={() => onViewCode && onViewCode(submission)}
            className={styles.more_btn}
            title="Thao tác khác"
            aria-label="More actions"
          >
            <Icon name="MoreHorizontal" size={16} />
          </button>
        )}
      </div>
    </Card>
  );
}

export default AILearningSubmissionItem;
