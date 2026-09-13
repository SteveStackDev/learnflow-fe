import styles from "./AILearningAlgorithmSidebar.module.css";
import { Button } from "~/components/ui";

function AIPatternDiagnosisCard({ diagnosis, algorithmName = "Binary Search" }) {
  if (!diagnosis) return null;

  const {
    tag = "AI PATTERN DIAGNOSIS",
    question = `Tại sao bạn thường gặp WA ở ${algorithmName}?`,
    narrative = "AI đã duyệt qua 11 lần nộp bài của bạn và phát hiện 82% lỗi xuất phát từ việc tính toán cận giữa hoặc gán lại biến mid gây lặp vô tận / bỏ sót phần tử cận biên.",
    keyTakeaways = [],
    ctaButtonLabel = "Mở bài giảng chuyên sâu: Xóa bỏ bẫy biên",
  } = diagnosis;

  return (
    <div className={styles.diagnosis_card}>
      {/* Top Header Pill */}
      <div className={styles.tag_header}>
        <span className={styles.tag_blue_dot} />
        <span className={styles.tag_text}>{tag}</span>
      </div>

      {/* Main Question Title */}
      <h3 className={styles.question_title}>{question}</h3>

      {/* Narrative Summary */}
      <p className={styles.narrative}>{narrative}</p>

      {/* Key Takeaways Numbered List */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className={styles.takeaways_list}>
          {keyTakeaways.map((item) => (
            <div key={item.id} className={styles.takeaway_item}>
              <span className={styles.item_number}>{item.id}.</span>
              <div className={styles.item_content}>
                <span>{item.textBefore}</span>
                {item.code1 && <code className={styles.code_chip}>{item.code1}</code>}
                <span>{item.textMiddle}</span>
                {item.code2 && <code className={styles.code_chip}>{item.code2}</code>}
                <span>{item.textAfter}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <Button
        variant="contained"
        size="md"
        className={styles.cta_lecture_btn}
        onClick={() => {
          alert("Tính năng mở bài giảng chuyên sâu đang được chuẩn bị!");
        }}
      >
        {ctaButtonLabel}
      </Button>
    </div>
  );
}

export default AIPatternDiagnosisCard;
