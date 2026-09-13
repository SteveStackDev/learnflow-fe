import { Link } from "react-router";
import styles from "./AILearningSubmissionsAIMentorCard.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Badge } from "~/components/ui";

function AILearningSubmissionsAIMentorCard({ diagnosis }) {
  const {
    title = "Chẩn đoán tiến trình từ AI Mentor",
    tag = "Tự động tóm tắt",
    updatedAt = "Cập nhật 5 phút trước",
    textBefore1 = "AI đã phát hiện bạn gặp lỗi lặp vô hạn ở 3 lần nộp trước vì tính toán ",
    codeChip1 = "mid = (l + r) / 2",
    textBefore2 = " khi điều kiện thu hẹp cận dưới ",
    codeChip2 = "l = mid",
    textBefore3 = ". Ở lần nộp thứ 4 (AC), bạn đã chuẩn hóa thành công công thức làm tròn lên ",
    codeChip3 = "mid = l + (r - l + 1) / 2",
    textAfter = ".",
    reinforcedKnowledge = "Lựa chọn cận làm tròn trong Tìm kiếm nhị phân",
    deepDiagnosticSubmissionId = "12345",
  } = diagnosis || {};

  return (
    <Card hoverable className={`${styles.ai_mentor_card} reveal-card`}>
      {/* Top Header Row */}
      <div className={styles.card_header}>
        <div className={styles.header_left}>
          <div className={styles.ai_icon_box}>
            <Icon name="Sparkles" size={20} />
          </div>
          <div className={styles.header_titles}>
            <div className={styles.title_badge_wrap}>
              <h3 className={styles.title}>{title}</h3>
              {tag && (
                <Badge variant="primary" size="sm" className={styles.summary_tag}>
                  {tag}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <span className={styles.update_time}>{updatedAt}</span>
      </div>

      {/* Diagnostic Narrative Text with Inline Code Chips */}
      <div className={styles.card_body}>
        <p className={styles.narrative_text}>
          {textBefore1}
          <code className={styles.code_chip}>{codeChip1}</code>
          {textBefore2}
          <code className={styles.code_chip}>{codeChip2}</code>
          {textBefore3}
          <code className={styles.code_chip}>{codeChip3}</code>
          {textAfter}
        </p>
      </div>

      {/* Footer Insight & Deep Diagnostic Link */}
      <div className={styles.card_footer}>
        <div className={styles.reinforced_knowledge}>
          <span className={styles.green_dot} />
          <span className={styles.knowledge_label}>Kiến thức củng cố:</span>
          <span className={styles.knowledge_value}>{reinforcedKnowledge}</span>
        </div>

        <Link
          to={`/ai-learning/submission/${deepDiagnosticSubmissionId}`}
          className={styles.deep_diagnostic_link}
        >
          <span>Xem báo cáo phân tích sâu (Deep Diagnostic)</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
    </Card>
  );
}

export default AILearningSubmissionsAIMentorCard;
