import styles from "./AILearningAlgorithmSidebar.module.css";
import AIPatternDiagnosisCard from "./AIPatternDiagnosisCard";
import QuickPracticeCard from "./QuickPracticeCard";

function AILearningAlgorithmSidebar({
  diagnosis,
  quickPractice,
  algorithmName = "Binary Search",
  guideRef,
}) {
  return (
    <aside className={styles.sidebar_container} ref={guideRef}>
      {/* 1. AI Pattern Diagnosis Card (Deep Navy) */}
      <AIPatternDiagnosisCard
        diagnosis={diagnosis}
        algorithmName={algorithmName}
      />

      {/* 2. Quick Practice Action Card */}
      <QuickPracticeCard practice={quickPractice} />
    </aside>
  );
}

export default AILearningAlgorithmSidebar;
