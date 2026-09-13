import styles from "./AIDiagnosisPanel.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Badge } from "~/components/ui";

const CONFIDENCE_VARIANT_MAP = {
  High: "success",
  Medium: "warning",
  Low: "neutral",
};

function AIDiagnosisCard({ aiAnalysis }) {
  if (!aiAnalysis) return null;

  const {
    diagnosis = "Boundary Condition",
    confidence = "High",
    suspectedLines = [],
    explanation = "",
    evidence = "",
  } = aiAnalysis;

  const confVariant = CONFIDENCE_VARIANT_MAP[confidence] || "success";

  return (
    <Card hoverable className={styles.diagnosis_card}>
      {/* Eyebrow & Confidence Badge */}
      <div className={styles.eyebrow_row}>
        <div className={styles.possible_cause_eyebrow}>
          <Icon name="Target" size={14} className={styles.target_icon} />
          <span>POSSIBLE CAUSE</span>
        </div>

        <Badge variant={confVariant} size="sm" className={styles.confidence_badge}>
          {confidence} confidence
        </Badge>
      </div>

      {/* Main Diagnosis Title */}
      <h3 className={styles.diagnosis_title}>{diagnosis}</h3>

      {/* Suspected Lines Location Badge */}
      {suspectedLines.length > 0 && (
        <div className={styles.suspected_location_chip}>
          <Icon name="AlertCircle" size={13} />
          <span>
            Suspected location: Lines {suspectedLines.join("–")}
          </span>
        </div>
      )}

      <div className={styles.card_divider} />

      {/* Why This Happens Block */}
      {explanation && (
        <div className={styles.section_block}>
          <h4 className={styles.section_heading}>WHY THIS HAPPENS</h4>
          <p className={styles.section_text}>{explanation}</p>
        </div>
      )}

      {/* What Happened On Failed Test Case Block */}
      {evidence && (
        <div className={styles.section_block}>
          <h4 className={styles.section_heading}>WHAT HAPPENED ON THE FAILED TEST CASE?</h4>
          <p className={styles.section_text}>{evidence}</p>
        </div>
      )}

      {/* AI Disclaimer Footnote */}
      <div className={styles.disclaimer_row}>
        <Icon name="Info" size={14} className={styles.info_icon} />
        <p className={styles.disclaimer_text}>
          AI-generated explanation — it may not be 100% accurate. Use it as a lead, not a
          verdict.
        </p>
      </div>
    </Card>
  );
}

export default AIDiagnosisCard;
