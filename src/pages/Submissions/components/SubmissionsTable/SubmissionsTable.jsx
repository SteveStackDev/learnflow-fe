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

export function SubmissionsTable({ submissions, scopeType }) {
  const navigate = useNavigate();

  const handleRowClick = (sub) => {
    if (scopeType === "contest" || sub.contestId) {
      navigate(`/contest/${sub.problemId || "B"}/result`);
    } else {
      navigate(`/problem/${sub.problemId || 1}/result`);
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
            {submissions && submissions.length > 0 ? (
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
