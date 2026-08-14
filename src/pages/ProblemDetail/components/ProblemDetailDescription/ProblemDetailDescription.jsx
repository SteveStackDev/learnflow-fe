import { useState } from "react";
import styles from "./ProblemDetailDescription.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import { ChatInput } from "~/components/ui";

function ProblemDetailDescription({ problem }) {
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'solution' | 'discussion'
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes || "15.4K");
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleVote = (type) => {
    if (!hasVoted) {
      setHasVoted(true);
      if (type === "up") {
        setUpvoteCount((prev) => (typeof prev === "number" ? prev + 1 : prev));
      }
      toast.success(
        `Cảm ơn bạn đã đánh giá ${type === "up" ? "hữu ích" : "chưa hữu ích"} cho bài tập này!`,
        "Đánh giá",
      );
    }
  };

  return (
    <div className={styles.desc_panel}>
      {/* Tab Navigation Bar */}
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

      {/* Main Content Area */}
      <div className={styles.content_scroll}>
        {activeTab === "desc" && (
          <>
            {/* Title & Metadata */}
            <h1 className={styles.title}>
              {problem.number}. {problem.title}
            </h1>

            <div className={styles.meta_row}>
              <span className={styles.level_badge}>{problem.level}</span>

              <button
                type="button"
                onClick={() => handleVote("up")}
                className={styles.vote_btn}
                title="Hữu ích"
              >
                <Icon name="ThumbsUp" size={14} />
                <span>{upvoteCount}</span>
              </button>

              <button
                type="button"
                onClick={() => handleVote("down")}
                className={styles.vote_btn}
                title="Chưa hữu ích"
              >
                <Icon name="ThumbsDown" size={14} />
                <span>{problem.downvotes}</span>
              </button>
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
            {problem.examples &&
              problem.examples.map((ex) => (
                <div key={ex.id} className={styles.example_block}>
                  <div className={styles.example_title}>{ex.title}</div>
                  <div className={styles.example_box}>
                    <div className={styles.example_line}>
                      <span className={styles.example_label}>Input: </span>
                      {ex.input}
                    </div>
                    <div className={styles.example_line}>
                      <span className={styles.example_label}>Output: </span>
                      {ex.output}
                    </div>
                    {ex.explanation && (
                      <div className={styles.example_line}>
                        <span className={styles.example_label}>Giải thích: </span>
                        {ex.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {/* Constraints */}
            <div className={styles.section_heading}>Ràng buộc (Constraints):</div>
            <ul className={styles.constraints_list}>
              {problem.constraints &&
                problem.constraints.map((c, idx) => (
                  <li key={idx} className={styles.constraint_item}>
                    <code>{c}</code>
                  </li>
                ))}
            </ul>

            {/* Related Topics */}
            <div className={styles.tags_section}>
              <div className={styles.tags_title}>
                <Icon name="Tag" size={16} />
                <span>Chủ đề liên quan</span>
              </div>
              <div className={styles.tags_wrap}>
                {problem.tags &&
                  problem.tags.map((tag) => (
                    <span key={tag} className={styles.tag_chip}>
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "solution" && (
          <div>
            <h2 className={styles.title}>Giải pháp đề xuất</h2>
            <div className={styles.solution_card}>
              <div className={styles.example_title}>{problem.solution.approach}</div>
              <div className={styles.statement_note}>
                <strong>Độ phức tạp thời gian: </strong>
                <code>{problem.solution.complexity.time}</code>
              </div>
              <div className={styles.statement_note}>
                <strong>Độ phức tạp bộ nhớ: </strong>
                <code>{problem.solution.complexity.space}</code>
              </div>
              <p className={styles.discussion_text}>{problem.solution.explanation}</p>
            </div>
          </div>
        )}

        {activeTab === "discussion" && (
          <div>
            <h2 className={styles.title}>Thảo luận từ cộng đồng</h2>
            {problem.discussions.map((d) => (
              <div key={d.id} className={styles.discussion_card}>
                <div>
                  <span className={styles.discussion_author}>{d.author}</span>
                  <span className={styles.discussion_time}>{d.time}</span>
                </div>
                <p className={styles.discussion_text}>{d.content}</p>
              </div>
            ))}
            <div style={{ marginTop: "20px" }}>
              <ChatInput
                placeholder="Viết bình luận hoặc câu hỏi của bạn..."
                onSend={({ text }) => {
                  if (text) {
                    toast.success("Đã gửi bình luận của bạn!", "Thảo luận");
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemDetailDescription;
