import { useState } from "react";
import styles from "./ProblemDetailDescription.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import { ScrollArea } from "~/components/ui";

function ProblemDetailDescription({ problem, onSelectUser }) {
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
      <ScrollArea className={styles.content_scroll}>
        {activeTab === "desc" && (
          <>
            {/* Title & Metadata */}
            <h1 className={styles.title}>
              Bài {problem.number || 1}: {problem.title}
            </h1>

            <div className={styles.meta_row}>
              <span className={styles.level_badge}>{problem.level}</span>
              <span className={styles.author_badge}>Tác giả: {problem.author}</span>

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

            {/* 1. Problem Statement (Mô tả bài toán) */}
            <div className={styles.statement}>{problem.statement}</div>

            {problem.statementNotes &&
              problem.statementNotes.map((note, idx) => (
                <p key={idx} className={styles.statement_note}>
                  {note}
                </p>
              ))}

            {/* 2. Input Format (Đầu vào) */}
            {(problem.inputFormat || problem.input_format) && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Đầu vào</h3>
                <ul className={styles.format_list}>
                  {Array.isArray(problem.inputFormat || problem.input_format) ? (
                    (problem.inputFormat || problem.input_format).map((line, idx) => (
                      <li key={idx} className={styles.format_item}>{line}</li>
                    ))
                  ) : (
                    <li className={styles.format_item}>{problem.inputFormat || problem.input_format}</li>
                  )}
                </ul>
              </div>
            )}

            {/* 3. Output Format (Đầu ra) */}
            {(problem.outputFormat || problem.output_format) && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Đầu ra</h3>
                <ul className={styles.format_list}>
                  {Array.isArray(problem.outputFormat || problem.output_format) ? (
                    (problem.outputFormat || problem.output_format).map((line, idx) => (
                      <li key={idx} className={styles.format_item}>{line}</li>
                    ))
                  ) : (
                    <li className={styles.format_item}>{problem.outputFormat || problem.output_format}</li>
                  )}
                </ul>
              </div>
            )}

            {/* 4. Constraints (Ràng buộc) */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div className={styles.section_block}>
                <h3 className={styles.section_heading}>Ràng buộc</h3>
                <ul className={styles.constraints_list}>
                  {Array.isArray(problem.constraints) ? (
                    problem.constraints.map((c, idx) => (
                      <li key={idx} className={styles.constraint_item}>
                        <code>{c}</code>
                      </li>
                    ))
                  ) : (
                    problem.constraints.split("\n").map((c, idx) => (
                      <li key={idx} className={styles.constraint_item}>
                        <code>{c}</code>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}

            {/* 5. Examples (Chỉ hiển thị Ví dụ 1:, Ví dụ 2:, không lặp lại tiêu đề Ví dụ mẫu) */}
            {problem.examples && problem.examples.length > 0 && (
              <div className={styles.section_block} style={{ marginTop: 16 }}>
                {problem.examples.map((ex, idx) => (
                  <div key={ex.id || idx} className={styles.example_block}>
                    <div className={styles.example_title}>{ex.title || `Ví dụ ${idx + 1}:`}</div>
                    <div className={styles.example_grid}>
                      <div className={styles.code_box}>
                        <div className={styles.box_label}>INPUT:</div>
                        <pre className={styles.pre_code}>{ex.input}</pre>
                      </div>
                      <div className={styles.code_box}>
                        <div className={styles.box_label}>OUTPUT:</div>
                        <pre className={styles.pre_code}>{ex.output}</pre>
                      </div>
                    </div>
                    {ex.explanation && (
                      <div className={styles.explanation_box}>
                        <span className={styles.explanation_label}>Giải thích:</span> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Related Topics */}
            {problem.tags && problem.tags.length > 0 && (
              <div className={styles.tags_section}>
                <div className={styles.tags_title}>
                  <Icon name="Tag" size={16} />
                  <span>Chủ đề liên quan</span>
                </div>
                <div className={styles.tags_wrap}>
                  {problem.tags.map((tag) => (
                    <span key={tag} className={styles.tag_chip}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "solution" && (
          <div>
            <h3 className={styles.section_heading}>Giải pháp & Thuật toán đề xuất</h3>
            <p className={styles.statement}>
              Sử dụng giải thuật Tham ăn (Greedy) kết hợp Sắp xếp (Sorting) để ưu tiên chọn công nhân có mức tiền công nhỏ nhất trước, giúp tối đa hóa số lượng công nhân được thuê với chi phí không quá T.
            </p>
          </div>
        )}

        {activeTab === "discussion" && (
          <div>
            <h3 className={styles.section_heading}>Thảo luận cộng đồng</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {[
                { name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", time: "2 giờ trước", text: "Bài này giải thuật Greedy sắp xếp tăng dần mảng a[i] là tối ưu nhất nha mọi người!" },
                { name: "Michael Steve", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", time: "5 giờ trước", text: "Lưu ý trường hợp T lớn (10^12) nên dùng kiểu long long trong C++ nhé." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(169,183,203,0.2)",
                  }}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{ width: 36, height: 36, borderRadius: "50%", cursor: "pointer", objectFit: "cover" }}
                    onClick={() =>
                      onSelectUser?.({
                        id: "user-02",
                        username: item.name,
                        handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                        avatar: item.avatar,
                        bio: "Thí sinh năng nổ giải thuật toán tại FySet.",
                      })
                    }
                    title="Click để xem Profile"
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{ fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}
                        onClick={() =>
                          onSelectUser?.({
                            id: "user-02",
                            username: item.name,
                            handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                            avatar: item.avatar,
                            bio: "Thí sinh năng nổ giải thuật toán tại FySet.",
                          })
                        }
                        title="Click để xem Profile"
                      >
                        {item.name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.time}</span>
                    </div>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.875rem", lineHeight: 1.5 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ProblemDetailDescription;
