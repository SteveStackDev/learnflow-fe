import React from "react";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./SubmissionsTable.module.css";

const STATUS_BADGE_MAP = {
  Accepted: { variant: "success", label: "Accepted" },
  AC: { variant: "success", label: "Accepted" },
  "Wrong Answer": { variant: "error", label: "Wrong Answer" },
  WA: { variant: "error", label: "Wrong Answer" },
  "Time Limit Exceeded": { variant: "warning", label: "Time Limit Exceeded" },
  TLE: { variant: "warning", label: "Time Limit Exceeded" },
  "Runtime Error": { variant: "info", label: "Runtime Error" },
  RE: { variant: "info", label: "Runtime Error" },
  "Compilation Error": { variant: "secondary", label: "Compilation Error" },
  CE: { variant: "secondary", label: "Compilation Error" },
};

export function SubmissionsTable({ submissions, scopeType, isLoading = false }) {
  const navigate = useNavigate();

  const handleRowClick = (sub) => {
    const pId = sub.problemId?._id || sub.problemId?.id || sub.problemId || sub.id || 1;
    const pTitle = sub.problemTitle || sub.title || (sub.problemId?.title ? `#${sub.problemId.code || '01'}: ${sub.problemId.title}` : "Bài tập thuật toán");
    const pDiff = sub.difficultyLabel || sub.difficulty || sub.problemId?.difficultyLabel || "Dễ";

    if (scopeType === "contest" || sub.contestId) {
      navigate(`/contest/${sub.contestId || sub.problemId || "B"}/result`, {
        state: {
          submissionResult: {
            id: sub.id || sub._id,
            problemId: pId,
            problemTitle: pTitle,
            difficultyLabel: pDiff,
            status: sub.status || "AC",
            score: sub.score ?? 0,
            max_score: sub.maxScore ?? sub.max_score ?? 100,
            executionTime: sub.executionTime ?? sub.runtime ?? 0,
            memory: sub.memoryUsed ? `${sub.memoryUsed} MB` : (sub.memory || "2.4 MB"),
            memoryUsed: sub.memoryUsed ?? 2.4,
            language: sub.language || "C++",
            submittedCode: sub.sourceCode || sub.submittedCode || sub.code || "",
            testResults: sub.testResults || [],
            subtasks: sub.subtasksResult || sub.subtasks || [],
            passedTests: sub.passedTests ?? (sub.status === "AC" ? 5 : 0),
            totalTests: sub.totalTests ?? 5,
            logs: sub.logs || [],
          },
        },
      });
    } else {
      navigate(`/problem/${sub.problemId?.slug || sub.problemSlug || pId}/result`, {
        state: {
          submissionResult: {
            id: sub.id || sub._id,
            problemId: pId,
            problemTitle: pTitle,
            difficultyLabel: pDiff,
            status: sub.status || "AC",
            score: sub.score ?? 0,
            max_score: sub.maxScore ?? sub.max_score ?? 100,
            executionTime: sub.executionTime ?? sub.runtime ?? 0,
            memory: sub.memoryUsed ? `${sub.memoryUsed} MB` : (sub.memory || "2.4 MB"),
            memoryUsed: sub.memoryUsed ?? 2.4,
            language: sub.language || "C++",
            submittedCode: sub.sourceCode || sub.submittedCode || sub.code || "",
            testResults: sub.testResults || [],
            subtasks: sub.subtasksResult || sub.subtasks || [],
            passedTests: sub.passedTests ?? (sub.status === "AC" ? 5 : 0),
            totalTests: sub.totalTests ?? 5,
            logs: sub.logs || [],
          },
        },
      });
    }
  };

  return (
    <div className={styles.table_card}>
      <div className={styles.table_responsive}>
        <table className={styles.submissions_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN BÀI TẬP</th>
              {scopeType !== "contest" && <th>CUỘC THI</th>}
              <th>TRẠNG THÁI</th>
              <th>NGÔN NGỮ</th>
              <th>THỜI GIAN CHẠY</th>
              <th>BỘ NHỚ</th>
              <th>THỜI GIAN NỘP</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={scopeType !== "contest" ? 8 : 7} className={styles.empty_cell}>
                  <div className={styles.empty_state}>
                    <Icon name="Loader2" size={28} className="animate-spin" />
                    <p>Đang tải danh sách bài nộp...</p>
                  </div>
                </td>
              </tr>
            ) : submissions && submissions.length > 0 ? (
              submissions.map((sub) => {
                const badgeSpec = STATUS_BADGE_MAP[sub.status] || {
                  variant: "secondary",
                  label: sub.status,
                };

                return (
                  <tr
                    key={sub.id}
                    onClick={() => handleRowClick(sub)}
                    className={styles.clickable_row}
                  >
                    <td className={styles.id_cell}>{sub.id}</td>

                    <td className={styles.title_cell}>
                      <span className={styles.problem_name_text}>
                        {sub.problemTitle}
                      </span>
                    </td>

                    {scopeType !== "contest" && (
                      <td className={styles.contest_cell}>
                        {sub.contestTitle ? (
                          <span className={styles.contest_tag}>{sub.contestTitle}</span>
                        ) : (
                          <span className={styles.muted_text}>—</span>
                        )}
                      </td>
                    )}

                    <td>
                      <Badge variant={badgeSpec.variant}>{badgeSpec.label}</Badge>
                    </td>

                    <td>
                      <span className={styles.lang_pill}>{sub.language}</span>
                    </td>

                    <td className={styles.meta_cell}>{sub.runtime}</td>
                    <td className={styles.meta_cell}>{sub.memory}</td>
                    <td className={styles.time_cell}>{sub.submittedAt}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={scopeType !== "contest" ? 8 : 7} className={styles.empty_cell}>
                  <div className={styles.empty_state}>
                    <Icon name="Inbox" size={32} />
                    <p>Không tìm thấy bài nộp nào phù hợp.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionsTable;
