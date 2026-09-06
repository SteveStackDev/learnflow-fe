import { useState, useMemo } from "react";
import styles from "./AILearningAlgorithmProblemList.module.css";
import { Badge, DropdownMenu } from "~/components/ui";
import { EmptyState } from "~/components/EmptyState/EmptyState";
import AILearningAlgorithmProblemItem from "./AILearningAlgorithmProblemItem";

const SORT_OPTIONS = [
  { value: "wa-desc", label: "Số lần WA nhiều nhất" },
  { value: "difficulty", label: "Độ khó" },
  { value: "title-asc", label: "Tên bài toán (A-Z)" },
  { value: "solved-desc", label: "Đã AC nhiều nhất" },
];

const DIFFICULTY_WEIGHT = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

function AILearningAlgorithmProblemList({ problems = [] }) {
  const [sortBy, setSortBy] = useState("wa-desc");

  const sortedProblems = useMemo(() => {
    const list = [...problems];
    switch (sortBy) {
      case "wa-desc":
        return list.sort((a, b) => (b.waCount || 0) - (a.waCount || 0));
      case "difficulty":
        return list.sort(
          (a, b) =>
            (DIFFICULTY_WEIGHT[b.difficulty] || 0) -
            (DIFFICULTY_WEIGHT[a.difficulty] || 0)
        );
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "solved-desc":
        return list.sort((a, b) => (b.solvedCount || 0) - (a.solvedCount || 0));
      default:
        return list;
    }
  }, [problems, sortBy]);

  return (
    <div className={styles.problem_list_section}>
      {/* Top Controls: Counter + Sort Dropdown */}
      <div className={styles.list_header}>
        <div className={styles.list_title_wrap}>
          <h2 className={styles.list_title}>Danh sách bài toán</h2>
          <Badge variant="neutral" size="sm" className={styles.count_badge}>
            {problems.length}
          </Badge>
        </div>

        <div className={styles.sort_wrapper}>
          <DropdownMenu
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={setSortBy}
            prefix="Sắp xếp theo:"
            size="sm"
          />
        </div>
      </div>

      {/* Problems Container */}
      {sortedProblems.length === 0 ? (
        <EmptyState
          iconName="CheckCircle2"
          title="Không có bài nộp nào bị lỗi"
          description="Tuyệt vời — bạn chưa có bài nộp Wrong Answer nào cho thuật toán này."
        />
      ) : (
        <div className={styles.problems_stack}>
          {sortedProblems.map((problem) => (
            <AILearningAlgorithmProblemItem
              key={problem.id}
              problem={problem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AILearningAlgorithmProblemList;
