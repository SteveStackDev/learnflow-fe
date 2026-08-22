import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./AdminContestProblemsTab.module.css";

export default function AdminContestProblemsTab({ contestState, setContestState }) {
  const { toast } = useToast();
  const problems = contestState.problems || [];

  const handleAddProblem = () => {
    const newProb = {
      id: `p-${Date.now()}`,
      code: `PROB-00${problems.length + 1}`,
      title: "New Assigned Problem",
      score: 100,
      difficulty: "Medium",
    };
    const updated = [...problems, newProb];
    setContestState({ ...contestState, problems: updated });
    toast.success("Đã gán thêm bài tập mới vào Contest", "Thành công");
  };

  const handleRemoveProblem = (id) => {
    const updated = problems.filter((p) => p.id !== id);
    setContestState({ ...contestState, problems: updated });
    toast.info("Đã xóa bài tập khỏi Contest");
  };

  const getDiffVariant = (diff) => {
    if (diff === "Easy") return "success";
    if (diff === "Medium") return "warning";
    return "danger";
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h3 className={styles.card_title}>
          <Icon name="Layers" size={18} /> Assigned Problems ({problems.length})
        </h3>
        <Button variant="primary" size="sm" onClick={handleAddProblem}>
          <Icon name="Plus" size={16} /> Add Problem
        </Button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Problem Code</th>
            <th>Problem Title</th>
            <th>Max Score</th>
            <th>Difficulty</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((prob, idx) => (
            <tr key={prob.id}>
              <td>#{idx + 1}</td>
              <td><span className={styles.code_badge}>{prob.code}</span></td>
              <td style={{ fontWeight: 700 }}>{prob.title}</td>
              <td><span className={styles.score_badge}>{prob.score} pts</span></td>
              <td>
                <Badge variant={getDiffVariant(prob.difficulty)} size="sm">
                  {prob.difficulty}
                </Badge>
              </td>
              <td>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.danger_btn}`}
                    title="Gỡ bài tập"
                    onClick={() => handleRemoveProblem(prob.id)}
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
