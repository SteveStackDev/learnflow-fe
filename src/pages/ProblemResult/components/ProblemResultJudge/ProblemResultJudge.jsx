import { useState } from "react";
import { Link } from "react-router";
import styles from "./ProblemResultJudge.module.css";
import Icon from "~/components/Icon/Icon";

function ProblemResultJudge({ resultData }) {
  const [selectedCaseId, setSelectedCaseId] = useState(1);

  const activeTestCase =
    resultData.testCases.find((tc) => tc.id === selectedCaseId) || resultData.testCases[0];

  return (
    <div className={styles.result_judge_card}>
      {/* Overall Acceptance Status Banner */}
      <div className={styles.status_banner}>
        <div className={styles.status_badge_wrap}>
          <div className={styles.status_icon_wrap}>
            <Icon name="CheckCircle" size={24} />
          </div>
          <div>
            <h2 className={styles.status_title}>{resultData.statusLabel}</h2>
            <p className={styles.status_desc}>{resultData.statusDescription}</p>
          </div>
        </div>

        <div className={styles.action_btn_group}>
          <Link to={`/problem/${resultData.id}`} className={styles.retry_btn}>
            <Icon name="RotateCcw" size={16} />
            <span>Thử lại bài này</span>
          </Link>
          <Link to="/problem/list" className={styles.next_btn}>
            <span>Bài tập tiếp theo</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className={styles.metrics_grid}>
        {/* Metric 1: Runtime */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Clock" size={18} />
            <span>Thời gian chạy (Runtime)</span>
          </div>
          <div className={styles.metric_value}>{resultData.runtime}</div>
          <div className={styles.metric_percentile}>{resultData.runtimePercentile}</div>
        </div>

        {/* Metric 2: Memory */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Cpu" size={18} />
            <span>Bộ nhớ (Memory)</span>
          </div>
          <div className={styles.metric_value}>{resultData.memory}</div>
          <div className={styles.metric_percentile}>{resultData.memoryPercentile}</div>
        </div>

        {/* Metric 3: Testcases */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="CheckSquare" size={18} />
            <span>Testcases vượt qua</span>
          </div>
          <div className={styles.metric_value}>
            {resultData.passedTestCases}/{resultData.totalTestCases}
          </div>
          <div className={styles.metric_percentile}>100% Test cases passed</div>
        </div>
      </div>

      {/* Test Case Inspection Section */}
      <div className={styles.testcase_section}>
        <h3 className={styles.section_title}>Chi tiết các Test Cases mẫu</h3>

        {/* Case Tabs */}
        <div className={styles.case_tabs}>
          {resultData.testCases.map((tc) => (
            <button
              key={tc.id}
              type="button"
              onClick={() => setSelectedCaseId(tc.id)}
              className={`${styles.case_tab_btn} ${
                selectedCaseId === tc.id ? styles["case_tab_btn--active"] : ""
              }`}
            >
              <span className={styles.tab_dot} />
              <span>{tc.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Breakdown */}
        {activeTestCase && (
          <div className={styles.case_details_box}>
            <div className={styles.detail_group}>
              <label className={styles.detail_label}>Đầu vào (Input):</label>
              <div className={styles.code_box}>{activeTestCase.input}</div>
            </div>

            <div className={styles.outputs_grid}>
              <div className={styles.detail_group}>
                <label className={styles.detail_label}>Kết quả mong muốn (Expected):</label>
                <div className={styles.code_box}>{activeTestCase.expectedOutput}</div>
              </div>

              <div className={styles.detail_group}>
                <label className={styles.detail_label}>Kết quả thực tế (Actual Output):</label>
                <div className={`${styles.code_box} ${styles.code_box_success}`}>
                  {activeTestCase.actualOutput}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemResultJudge;
