import React, { useState } from "react";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestResultJudge.module.css";

export function ContestResultJudge({
  resultData,
  onRetryProblem,
  onNextProblem,
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const currentTestCase =
    resultData?.testCases && resultData.testCases[activeTabIdx]
      ? resultData.testCases[activeTabIdx]
      : null;

  return (
    <div className={styles.result_judge_card}>
      {/* Status Banner */}
      <div className={styles.status_banner}>
        <div className={styles.status_badge_wrap}>
          <div className={styles.status_icon_wrap}>
            <Icon name="Check" size={24} />
          </div>
          <div>
            <h3 className={styles.status_title}>{resultData.statusTitle}</h3>
            <p className={styles.status_desc}>{resultData.statusSubtitle}</p>
          </div>
        </div>

        <div className={styles.action_btn_group}>
          <Button variant="outlined" leftIcon="RotateCcw" onClick={onRetryProblem}>
            Thử lại bài này
          </Button>

          <Button variant="contained" rightIcon="ChevronRight" onClick={onNextProblem}>
            Bài tập tiếp theo
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metrics_grid}>
        {/* Metric 1: Runtime */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Clock" size={16} />
            <span>Thời gian chạy (Runtime)</span>
          </div>
          <div className={styles.metric_value}>{resultData.metrics.runtime}</div>
          <div className={styles.metric_percentile}>{resultData.metrics.runtimePercent}</div>
        </div>

        {/* Metric 2: Memory */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Cpu" size={16} />
            <span>Bộ nhớ (Memory)</span>
          </div>
          <div className={styles.metric_value}>{resultData.metrics.memory}</div>
          <div className={styles.metric_percentile}>{resultData.metrics.memoryPercent}</div>
        </div>

        {/* Metric 3: Testcases */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="CheckCircle" size={16} />
            <span>Testcases vượt qua</span>
          </div>
          <div className={styles.metric_value}>{resultData.metrics.testcasesPassed}</div>
          <div className={styles.metric_percentile}>{resultData.metrics.testcasesPercent}</div>
        </div>
      </div>

      {/* Testcase Inspection Tabs Section */}
      {resultData.testCases && (
        <div className={styles.testcase_section}>
          <h4 className={styles.section_title}>Chi tiết các Test Cases mẫu</h4>

          <div className={styles.case_tabs}>
            {resultData.testCases.map((tc, idx) => (
              <button
                key={tc.id}
                type="button"
                onClick={() => setActiveTabIdx(idx)}
                className={`${styles.case_tab_btn} ${
                  activeTabIdx === idx ? styles["case_tab_btn--active"] : ""
                }`}
              >
                <span className={styles.pass_dot} />
                <span>{tc.label}</span>
              </button>
            ))}
          </div>

          {currentTestCase && (
            <div className={styles.test_detail_box}>
              <div className={styles.field_box}>
                <span className={styles.field_label}>Input:</span>
                <div>{currentTestCase.input}</div>
              </div>
              <div className={styles.field_box}>
                <span className={styles.field_label}>Output thực tế:</span>
                <div>{currentTestCase.output}</div>
              </div>
              <div className={styles.field_box}>
                <span className={styles.field_label}>Expected Output:</span>
                <div>{currentTestCase.expected}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContestResultJudge;
