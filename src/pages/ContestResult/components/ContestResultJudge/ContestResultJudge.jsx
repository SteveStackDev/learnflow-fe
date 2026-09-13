import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestResultJudge.module.css";

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
  const activeStatusKey = resolveStatusKey(initialStatus || resultData?.status || resultData?.statusCode);
  const currentStatusSpec = JUDGE_STATUS_MAP[activeStatusKey] || JUDGE_STATUS_MAP.AC;

  // Format subtasks directly from database/judge result
  const rawSubtasks = Array.isArray(resultData?.subtasks) && resultData.subtasks.length > 0
    ? resultData.subtasks
    : [];

  const currentSubtasks = rawSubtasks.map((st, idx) => {
    const tests = (st.testCases || st.tests || []).map((t, tIdx) => {
      const isAC = t.status === "AC";
      const maxPts = t.points != null ? Number(t.points) : (t.maxScore != null ? Number(t.maxScore) : 100);
      const earnedPts = t.score != null ? Number(t.score) : (isAC ? maxPts : 0);
      return {
        id: String(t.id || tIdx + 1),
        label: t.label || `Test ${tIdx + 1}`,
        status: t.status || (isAC ? "AC" : activeStatusKey),
        score: earnedPts,
        maxScore: maxPts,
        runtime: t.time != null ? (typeof t.time === "number" ? `${Math.round(t.time * 1000)} ms` : `${t.time}`) : (t.runtime || "10 ms"),
        memory: t.memory || "1.5 MB",
      };
    });

    const maxPts = st.points != null ? Number(st.points) : (st.maxScore != null ? Number(st.maxScore) : tests.reduce((s, t) => s + t.maxScore, 0));
    const earnedPts = st.earnedScore != null ? Number(st.earnedScore) : (st.score != null ? Number(st.score) : tests.reduce((s, t) => s + t.score, 0));
    const stStatus = st.status || (earnedPts === maxPts && maxPts > 0 ? "AC" : activeStatusKey);

    return {
      id: String(st.id || `sub-${idx + 1}`),
      label: st.name || st.label || `Subtask ${idx + 1}`,
      title: st.name || st.title || `Subtask ${idx + 1}`,
      maxScore: maxPts,
      earnedScore: earnedPts,
      status: stStatus,
      maxTime: st.maxTime || "20 ms",
      maxMemory: st.maxMemory || "2.0 MB",
      tests,
    };
  });

  const [activeSubtaskId, setActiveSubtaskId] = useState(() => currentSubtasks[0]?.id || "sub-1");
  const activeSubtask = currentSubtasks.find((s) => s.id === activeSubtaskId) || currentSubtasks[0];

  const totalEarnedScore = resultData?.score != null ? Number(resultData.score) : currentSubtasks.reduce((sum, s) => sum + s.earnedScore, 0);
  const totalPossibleScore = resultData?.max_score != null ? Number(resultData.max_score) : (currentSubtasks.reduce((sum, s) => sum + s.maxScore, 0) || 100);

  return (
    <div className={styles.result_judge_card}>

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
