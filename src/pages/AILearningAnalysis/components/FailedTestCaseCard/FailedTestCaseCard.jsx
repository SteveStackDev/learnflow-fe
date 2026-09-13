import styles from "./FailedTestCaseCard.module.css";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";

function FailedTestCaseCard({ failedTestCase }) {
  if (!failedTestCase) return null;

  const { input = "", expected = "", actual = "" } = failedTestCase;

  return (
    <Card hoverable className={styles.testcase_card}>
      {/* Header */}
      <div className={styles.header}>
        <Icon name="AlertCircle" size={17} className={styles.header_icon} />
        <h3 className={styles.title}>Failed Test Case</h3>
      </div>

      <div className={styles.body}>
        {/* Input Box */}
        <div className={styles.detail_group}>
          <label className={styles.detail_label}>INPUT</label>
          <pre className={styles.input_box}>{input}</pre>
        </div>

        {/* Outputs Comparison Grid */}
        <div className={styles.outputs_grid}>
          {/* Expected Output (Green) */}
          <div className={styles.detail_group}>
            <label className={styles.detail_label}>EXPECTED OUTPUT</label>
            <pre className={`${styles.output_box} ${styles["output_box--expected"]}`}>
              {expected}
            </pre>
          </div>

          {/* Your Output (Red) */}
          <div className={styles.detail_group}>
            <label className={styles.detail_label}>YOUR OUTPUT</label>
            <pre className={`${styles.output_box} ${styles["output_box--actual"]}`}>
              {actual}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FailedTestCaseCard;
