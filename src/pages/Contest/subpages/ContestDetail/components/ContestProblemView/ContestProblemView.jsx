import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestProblemView.module.css";

export function ContestProblemView({ problem }) {
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'solution' | 'discussion'
  const [upvotes, setUpvotes] = useState(15400);
  const [hasVoted, setHasVoted] = useState(false);

  if (!problem) return null;

  const handleVote = () => {
    if (!hasVoted) {
      setUpvotes((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <main className={styles.panel}>
      {/* Tab Navigation Toolbar */}
      <div className={styles.tabs_nav}>
        <button
          type="button"
          onClick={() => setActiveTab("desc")}
          className={`${styles.tab_btn} ${activeTab === "desc" ? styles["tab_btn--active"] : ""}`}
        >
          <Icon name="FileText" size={16} />
          <span>Mô tả</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("solution")}
          className={`${styles.tab_btn} ${
            activeTab === "solution" ? styles["tab_btn--active"] : ""
          }`}
        >
          <Icon name="FlaskConical" size={16} />
          <span>Giải pháp</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("discussion")}
          className={`${styles.tab_btn} ${
            activeTab === "discussion" ? styles["tab_btn--active"] : ""
          }`}
        >
          <Icon name="MessageSquare" size={16} />
          <span>Thảo luận</span>
        </button>
      </div>

      {/* Main Scroll Content */}
      <div className={styles.content_scroll}>
        {activeTab === "desc" && (
          <>
            {/* Title & Metadata */}
            <h2 className={styles.title}>{problem.title}</h2>

            <div className={styles.meta_row}>
              <span className={styles.level_badge}>Dễ</span>

              <button type="button" onClick={handleVote} className={styles.vote_btn}>
                <Icon name="ThumbsUp" size={14} />
                <span>{(upvotes / 1000).toFixed(1)}K</span>
              </button>

              <button type="button" className={styles.vote_btn}>
                <Icon name="ThumbsDown" size={14} />
                <span>203</span>
              </button>

              <span className={styles.chip}>Time Limit: {problem.timeLimit}</span>
              <span className={styles.chip}>Memory Limit: {problem.memoryLimit}</span>
              <span className={`${styles.chip} ${styles.chip_points}`}>{problem.points} pt</span>
            </div>

            {/* Problem Statement */}
            <div className={styles.statement}>{problem.statement}</div>

            {problem.statementNotes &&
              problem.statementNotes.map((note, idx) => (
                <p key={idx} className={styles.statement_note}>
                  {note}
                </p>
              ))}

            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
              <>
                <h3 className={styles.section_heading}>Ví dụ:</h3>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className={styles.example_card}>
                    <div className={styles.example_title}>Ví dụ {idx + 1}:</div>
                    <div className={styles.code_box}>
                      <span className={styles.box_label}>Input:</span>
                      {ex.input}
                    </div>
                    <div className={styles.code_box}>
                      <span className={styles.box_label}>Output:</span>
                      {ex.output}
                    </div>
                    {ex.explanation && (
                      <div className={styles.explanation}>
                        <strong>Giải thích:</strong> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <>
                <h3 className={styles.section_heading}>Giới hạn dữ liệu:</h3>
                <ul className={styles.constraints_list}>
                  {problem.constraints.map((c, idx) => (
                    <li key={idx} className={styles.constraint_item}>
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {activeTab === "solution" && (
          <div>
            <h3 className={styles.section_heading}>Giải pháp & Thuật toán đề xuất</h3>
            <p className={styles.statement}>
              Bài toán có thể được giải bằng cách duyệt cây nhị phân (DFS hoặc BFS) và kiểm tra điều
              kiện giá trị của từng node trong khoảng [min, max] hợp lệ.
            </p>
          </div>
        )}

        {activeTab === "discussion" && (
          <div>
            <h3 className={styles.section_heading}>Thảo luận cộng đồng</h3>
            <p className={styles.statement}>
              Chưa có bình luận nào. Hãy trao đổi thắc mắc hoặc ý tưởng giải của bạn!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ContestProblemView;
