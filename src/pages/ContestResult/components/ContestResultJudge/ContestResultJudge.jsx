import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestResultJudge.module.css";
import { defaultSubtasksData } from "~/constants/mockProblemResult";

// Central Status Specification Registry
const JUDGE_STATUS_MAP = {
  AC: {
    code: "AC",
    badgeClass: "ac",
    statusLabel: "Chấp nhận (Accepted)",
    statusDescription: "Chúc mừng! Mã nguồn của bạn đã vượt qua 100% test cases trong thời gian quy định.",
    iconName: "CheckCircle",
    colorTheme: "#10b981",
  },
  WA: {
    code: "WA",
    badgeClass: "wa",
    statusLabel: "Kết quả sai (Wrong Answer)",
    statusDescription: "Bài làm của bạn cho ra kết quả thực tế khác với đáp án chuẩn trên một số Subtask / Testcase.",
    iconName: "XCircle",
    colorTheme: "#ef4444",
  },
  TLE: {
    code: "TLE",
    badgeClass: "tle",
    statusLabel: "Vượt quá thời gian (Time Limit Exceeded)",
    statusDescription: "Chương trình của bạn chạy vượt quá thời gian tối đa cho phép (Exit code 124 hoặc > 2.0s).",
    iconName: "Clock",
    colorTheme: "#f59e0b",
  },
  RE: {
    code: "RE",
    badgeClass: "re",
    statusLabel: "Lỗi thực thi (Runtime Error)",
    statusDescription: "Chương trình bị dừng đột ngột do gặp sự cố nghiêm trọng trong quá trình chạy (Exit code != 0 & != 124).",
    iconName: "AlertTriangle",
    colorTheme: "#8b5cf6",
  },
  CE: {
    code: "CE",
    badgeClass: "ce",
    statusLabel: "Lỗi biên dịch (Compilation Error)",
    statusDescription: "Trình biên dịch (g++ / javac / python) báo lỗi syntax khi xây dựng mã nguồn (Exit code != 0).",
    iconName: "Code",
    colorTheme: "#dc2626",
  },
};

const resolveStatusKey = (status) => {
  if (!status) return "AC";
  const s = String(status).toUpperCase();
  if (s.includes("ACCEPTED") || s === "AC") return "AC";
  if (s.includes("WRONG") || s === "WA") return "WA";
  if (s.includes("TIME") || s.includes("LIMIT") || s === "TLE") return "TLE";
  if (s.includes("RUNTIME") || s === "RE") return "RE";
  if (s.includes("COMPILATION") || s === "CE") return "CE";
  return "AC";
};

export function ContestResultJudge({
  resultData,
  initialStatus,
  onRetryProblem,
  onNextProblem,
}) {
  const navigate = useNavigate();
  const [activeStatusKey, setActiveStatusKey] = useState(() =>
    resolveStatusKey(initialStatus || resultData?.status || resultData?.statusCode)
  );
  const [activeSubtaskId, setActiveSubtaskId] = useState("sub-1");

  const currentStatusSpec = JUDGE_STATUS_MAP[activeStatusKey] || JUDGE_STATUS_MAP.AC;

  // Dynamic Subtasks generator according to selected result status
  const getSubtasksForStatus = (statusKey) => {
    const baseSubtasks = resultData?.subtasks || defaultSubtasksData;

    if (statusKey === "AC") {
      return baseSubtasks;
    }
    if (statusKey === "WA") {
      return baseSubtasks.map((sub, idx) => {
        if (idx === 2) {
          return {
            ...sub,
            earnedScore: 0,
            status: "WA",
            tests: sub.tests.map((t, tIdx) =>
              tIdx === 2 ? { ...t, status: "WA", score: 0 } : t
            ),
          };
        }
        return sub;
      });
    }
    if (statusKey === "TLE") {
      return baseSubtasks.map((sub, idx) => {
        if (idx >= 1) {
          return {
            ...sub,
            earnedScore: 0,
            status: "TLE",
            maxTime: "> 2000 ms",
            tests: sub.tests.map((t) => ({ ...t, status: "TLE", score: 0, runtime: "> 2000 ms" })),
          };
        }
        return sub;
      });
    }
    if (statusKey === "RE") {
      return baseSubtasks.map((sub, idx) => {
        if (idx >= 1) {
          return {
            ...sub,
            earnedScore: 0,
            status: "RE",
            tests: sub.tests.map((t) => ({ ...t, status: "RE", score: 0 })),
          };
        }
        return sub;
      });
    }
    if (statusKey === "CE") {
      return baseSubtasks.map((sub) => ({
        ...sub,
        earnedScore: 0,
        status: "CE",
        tests: sub.tests.map((t) => ({ ...t, status: "CE", score: 0, runtime: "0 ms" })),
      }));
    }
    return baseSubtasks;
  };

  const currentSubtasks = getSubtasksForStatus(activeStatusKey);
  const activeSubtask = currentSubtasks.find((s) => s.id === activeSubtaskId) || currentSubtasks[0];

  const totalEarnedScore = currentSubtasks.reduce((sum, s) => sum + s.earnedScore, 0);
  const totalPossibleScore = currentSubtasks.reduce((sum, s) => sum + s.maxScore, 0);

  return (
    <div className={styles.result_judge_card}>
      {/* Quick Status Switcher (Interactive Demo) */}
      <div className={styles.status_switcher_bar}>
        <span className={styles.switcher_label}>
          <Icon name="Sliders" size={14} />
          <span>Thử nghiệm nhanh trạng thái máy chấm:</span>
        </span>
        <div className={styles.switcher_buttons}>
          {Object.keys(JUDGE_STATUS_MAP).map((key) => {
            const spec = JUDGE_STATUS_MAP[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveStatusKey(key);
                  setActiveSubtaskId("sub-1");
                }}
                className={`${styles.switcher_btn} ${styles[`switcher_btn--${spec.badgeClass}`]} ${
                  activeStatusKey === key ? styles["switcher_btn--active"] : ""
                }`}
              >
                <span>{key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Status Banner */}
      <div
        className={`${styles.status_banner} ${styles[`status_banner--${currentStatusSpec.badgeClass}`]}`}
      >
        <div className={styles.status_badge_wrap}>
          <div className={styles.status_icon_wrap}>
            <Icon name={currentStatusSpec.iconName} size={26} />
          </div>
          <div>
            <div className={styles.status_header_row}>
              <h2 className={styles.status_title}>{currentStatusSpec.statusLabel}</h2>
              <span className={`${styles.status_tag} ${styles[`status_tag--${currentStatusSpec.badgeClass}`]}`}>
                {totalEarnedScore}/{totalPossibleScore} Điểm
              </span>
            </div>
            <p className={styles.status_desc}>{currentStatusSpec.statusDescription}</p>
          </div>
        </div>

        <div className={styles.action_btn_group}>
          <Button variant="outlined" leftIcon="RotateCcw" onClick={onRetryProblem}>
            Thử lại bài này
          </Button>

          <Button
            variant="outlined"
            leftIcon="History"
            onClick={() => navigate(`/contest/${resultData.problemId || "A"}/submissions`)}
          >
            Bài nộp của tôi
          </Button>

          <Button variant="contained" rightIcon="ArrowRight" onClick={onNextProblem}>
            Bài tập tiếp theo
          </Button>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className={styles.metrics_grid}>
        {/* Metric 1: Runtime */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Clock" size={18} />
            <span>Thời gian chạy lớn nhất</span>
          </div>
          <div className={styles.metric_value}>
            {activeStatusKey === "TLE" ? "> 2000 ms" : "36 ms"}
          </div>
          <div className={styles.metric_percentile}>Nhanh hơn 94.2% bài nộp C++20</div>
        </div>

        {/* Metric 2: Memory */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Cpu" size={18} />
            <span>Bộ nhớ dùng tối đa</span>
          </div>
          <div className={styles.metric_value}>16.4 MB</div>
          <div className={styles.metric_percentile}>Tiết kiệm bộ nhớ hơn 88.5% C++20</div>
        </div>

        {/* Metric 3: Subtasks Score */}
        <div className={styles.metric_card}>
          <div className={styles.metric_header}>
            <Icon name="Award" size={18} />
            <span>Tổng điểm Subtasks</span>
          </div>
          <div className={styles.metric_value}>
            {totalEarnedScore}/{totalPossibleScore} pts
          </div>
          <div className={styles.metric_percentile}>
            {totalEarnedScore === totalPossibleScore ? "100% Subtasks Passed" : "Chưa hoàn thành 100%"}
          </div>
        </div>
      </div>

      {/* Subtasks Section (`Sub 1`, `Sub 2`, `Sub 3`) */}
      <div className={styles.subtask_section}>
        <div className={styles.subtask_section_header}>
          <h3 className={styles.section_title}>Chi tiết điểm các Subtasks (`Sub 1`, `Sub 2`, `Sub 3`)</h3>
          <span className={styles.subtask_count_badge}>{currentSubtasks.length} Subtasks</span>
        </div>

        {/* Subtask Tabs */}
        <div className={styles.subtask_tabs}>
          {currentSubtasks.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setActiveSubtaskId(sub.id)}
              className={`${styles.subtask_tab_btn} ${
                activeSubtaskId === sub.id ? styles["subtask_tab_btn--active"] : ""
              } ${styles[`subtask_tab_btn--${sub.status.toLowerCase()}`]}`}
            >
              <span className={styles.subtask_status_dot} />
              <span className={styles.subtask_tab_label}>{sub.label}</span>
              <span className={styles.subtask_tab_score}>
                {sub.earnedScore}/{sub.maxScore}đ
              </span>
            </button>
          ))}
        </div>

        {/* Active Subtask Breakdown */}
        {activeSubtask && (
          <div className={styles.subtask_details_card}>
            {/* Subtask Card Header */}
            <div className={styles.subtask_card_header}>
              <div>
                <h4 className={styles.subtask_card_title}>{activeSubtask.title}</h4>
                <div className={styles.subtask_meta_row}>
                  <span>Thời gian lớn nhất: <strong>{activeSubtask.maxTime}</strong></span>
                  <span>•</span>
                  <span>Bộ nhớ lớn nhất: <strong>{activeSubtask.maxMemory}</strong></span>
                </div>
              </div>

              <div className={`${styles.subtask_card_badge} ${styles[`subtask_card_badge--${activeSubtask.status.toLowerCase()}`]}`}>
                <span>{activeSubtask.status}</span>
                <span>({activeSubtask.earnedScore}/{activeSubtask.maxScore} Điểm)</span>
              </div>
            </div>

            {/* Clean Test Cases List Rows */}
            <div className={styles.tests_list_block}>
              <h5 className={styles.tests_list_title}>Kết quả từng Test thuộc {activeSubtask.label}:</h5>
              <div className={styles.test_rows_list}>
                {activeSubtask.tests.map((test) => (
                  <div key={test.id} className={styles.test_row_item}>
                    <div className={styles.test_row_left}>
                      <span className={styles.test_row_name}>{test.label}</span>
                      <span className={`${styles.test_row_badge} ${styles[`test_row_badge--${test.status.toLowerCase()}`]}`}>
                        {test.status}
                      </span>
                    </div>

                    <div className={styles.test_row_right}>
                      <span className={styles.test_row_score}>
                        Điểm: <strong>{test.score}/{test.maxScore}đ</strong>
                      </span>
                      <span className={styles.test_row_meta}>
                        <Icon name="Clock" size={13} /> {test.runtime}
                      </span>
                      <span className={styles.test_row_meta}>
                        <Icon name="Cpu" size={13} /> {test.memory}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestResultJudge;
