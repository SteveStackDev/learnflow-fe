import styles from "./AIDiagnosisPanel.module.css";
import Icon from "~/components/Icon/Icon";
import { Card, Button } from "~/components/ui";
import AIDiagnosisCard from "./AIDiagnosisCard";
import ConceptsReviewCard from "./ConceptsReviewCard";
import RecommendedLearningCard from "./RecommendedLearningCard";

function AIDiagnosisPanel({ analysisState, aiAnalysis, onAnalyze }) {
  // ---- 1. Idle State: Show prominent CTA ----
  if (analysisState === "idle") {
    return (
      <Card hoverable className={styles.cta_card}>
        <div className={styles.cta_icon_box}>
          <Icon name="Sparkles" size={24} />
        </div>
        <h3 className={styles.cta_title}>Ready to find out what went wrong?</h3>
        <p className={styles.cta_desc}>
          FySet will look at the problem, your code, and the failed test case above to explain
          the likely cause — not just tell you that it&apos;s wrong.
        </p>
        <Button
          variant="gradient"
          size="md"
          leftIcon="Sparkles"
          className={styles.cta_analyze_btn}
          onClick={onAnalyze}
        >
          Analyze with AI
        </Button>
      </Card>
    );
  }

  // ---- 2. Loading State ----
  if (analysisState === "loading") {
    return (
      <Card className={styles.loading_card}>
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.loading_text}>AI is analyzing your submission…</p>
        <p className={styles.loading_sub}>Reading the problem, your code, and the failed case</p>
      </Card>
    );
  }

  // ---- 3. Result State ----
  if (!aiAnalysis) return null;

  return (
    <div className={styles.diagnosis_stack}>
      {/* 1. Possible Cause Main Diagnosis Card */}
      <AIDiagnosisCard aiAnalysis={aiAnalysis} />

      {/* 2. Concepts to Review Card */}
      <ConceptsReviewCard concepts={aiAnalysis.concepts} />

      {/* 3. Recommended Learning Card */}
      <RecommendedLearningCard recommendations={aiAnalysis.recommendations} />
    </div>
  );
}

export default AIDiagnosisPanel;
