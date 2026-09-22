import { useState, useEffect } from "react";
import styles from "./ProblemDetailDescription.module.css";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import { ScrollArea, ChatInput } from "~/components/ui";

const mockProblemDiscussions = [
  {
    id: "c-1",
    name: "Elena Rostova",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    time: "2 giờ trước",
    text: "Bài này giải thuật Greedy sắp xếp tăng dần mảng a[i] là tối ưu nhất nha mọi người!",
  },
  {
    id: "c-2",
    name: "Michael Steve",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    time: "5 giờ trước",
    text: "Lưu ý trường hợp T lớn (10^12) nên dùng kiểu long long trong C++ nhé.",
  },
];

function ProblemDetailDescription({ problem, onSelectUser }) {
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'solution' | 'discussion'
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes ?? 0);
  const [downvoteCount, setDownvoteCount] = useState(problem.downvotes ?? 0);
  const [userVote, setUserVote] = useState(null); // 'up' | 'down' | null
  const [discussions, setDiscussions] = useState(mockProblemDiscussions);
  const { toast } = useToast();

  useEffect(() => {
    setUpvoteCount(problem.upvotes ?? 0);
    setDownvoteCount(problem.downvotes ?? 0);
    setUserVote(null);
  }, [problem?.id, problem?._id, problem?.code, problem?.upvotes, problem?.downvotes]);

  const handleSendDiscussion = ({ text, attachment }) => {
    if (!text && !attachment) return;

    let savedUser = null;
    try {
      savedUser = JSON.parse(localStorage.getItem("fySet_user"));
    } catch {
      // ignore parse error
    }

    const currentUserName = savedUser?.name || savedUser?.username || "Bạn";
    const currentUserAvatar =
      savedUser?.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName}`;

    const newComment = {
      id: `c-${Date.now()}`,
      name: currentUserName,
      avatar: currentUserAvatar,
      time: "Vừa xong",
      text: text + (attachment ? ` [Đính kèm: ${attachment}]` : ""),
    };

    setDiscussions((prev) => [newComment, ...prev]);
    toast.success("Đã gửi thảo luận bài tập thành công!", "Thảo luận");
  };

  const authorName =
    typeof problem.author === "object"
      ? problem.author?.name || "FySet DevTeam"
      : problem.author || "FySet DevTeam";

  const handleVote = (type) => {
    if (userVote === type) {
      // Hủy bình chọn
      setUserVote(null);
      if (type === "up") {
        setUpvoteCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : 0));
      } else {
        setDownvoteCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : 0));
      }
    } else {
      if (type === "up") {
        setUpvoteCount((prev) => (typeof prev === "number" ? prev + 1 : 1));
        if (userVote === "down") {
          setDownvoteCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : 0));
        }
        toast.success("Cảm ơn bạn đã đánh giá hữu ích cho bài tập này!", "Đánh giá");
      } else {
        setDownvoteCount((prev) => (typeof prev === "number" ? prev + 1 : 1));
        if (userVote === "up") {
          setUpvoteCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : 0));
        }
        toast.info("Đã ghi nhận phản hồi của bạn!", "Đánh giá");
      }
      setUserVote(type);
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
            {/* Title & Vote Actions Row */}
            <div className={styles.title_header_row}>
              <h1 className={styles.title}>
                #{problem.code || problem.number || problem.id}: {problem.title}
              </h1>

              <div className={styles.vote_group}>
                <button
                  type="button"
                  onClick={() => handleVote("up")}
                  className={`${styles.vote_btn} ${userVote === "up" ? styles.vote_btn_active_up : ""}`}
                  title="Hữu ích"
                >
                  <Icon name="ThumbsUp" size={14} />
                  <span>{upvoteCount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVote("down")}
                  className={`${styles.vote_btn} ${userVote === "down" ? styles.vote_btn_active_down : ""}`}
                  title="Chưa hữu ích"
                >
                  <Icon name="ThumbsDown" size={14} />
                  <span>{downvoteCount}</span>
                </button>
              </div>
            </div>

            {/* Metadata Badges Row */}
            <div className={styles.meta_row}>
              {(() => {
                const diffVal = String(problem.difficulty || problem.level || problem.difficultyLabel || "").toLowerCase();
                let diffText = problem.difficultyLabel || problem.level || "Dễ";
                let diffClass = styles["level_badge--easy"];

                if (diffVal === "hard" || diffVal === "khó") {
                  diffText = "Khó";
                  diffClass = styles["level_badge--hard"];
                } else if (diffVal === "medium" || diffVal === "trung bình") {
                  diffText = "Trung bình";
                  diffClass = styles["level_badge--medium"];
                } else {
                  diffText = "Dễ";
                  diffClass = styles["level_badge--easy"];
                }

                return (
                  <span className={`${styles.level_badge} ${diffClass}`}>
                    {diffText}
                  </span>
                );
              })()}

              {/* Time Limit */}
              <span className={styles.limit_badge} title="Giới hạn thời gian chạy">
                <Icon name="Clock" size={13} />
                <span>{problem.timeLimit || "2.0s"}</span>
              </span>

              {/* Memory Limit */}
              <span className={styles.limit_badge} title="Giới hạn bộ nhớ sử dụng">
                <Icon name="Cpu" size={13} />
                <span>{problem.memoryLimit || "256MB"}</span>
              </span>

              {/* Author Badge */}
              <span
                className={styles.author_badge}
                onClick={() => {
                  if (typeof problem.author === "object" && onSelectUser) {
                    onSelectUser(problem.author);
                  }
                }}
                style={{ cursor: typeof problem.author === "object" ? "pointer" : "default" }}
                title={typeof problem.author === "object" ? "Click để xem hồ sơ tác giả" : undefined}
              >
                Tác giả: {authorName}
              </span>
            </div>

            {/* 1. Problem Statement (Mô tả bài toán) */}
            <div className={styles.statement}>{problem.statement || problem.description}</div>

            {/* Illustration Image (Nếu bài toán có hình ảnh minh họa) */}
            {(problem.imageDescription || problem.image_description) && (
              <div className={styles.image_wrapper}>
                <img
                  src={problem.imageDescription || problem.image_description}
                  alt="Minh họa bài toán"
                  className={styles.illustration_img}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

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

            {/* 5. Examples (Ví dụ 1:, Ví dụ 2: - Giống hệt Contest layout) */}
            {problem.examples && problem.examples.length > 0 && (
              <div className={styles.section_block} style={{ marginTop: 16 }}>
                {problem.examples.map((ex, idx) => (
                  <div key={ex.id || idx} className={styles.example_card}>
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

            {/* 6. Subtasks Specification (Nếu có) */}
            {problem.subtasks && Array.isArray(problem.subtasks) && problem.subtasks.length > 0 && (
              <div className={styles.section_block} style={{ marginTop: 16 }}>
                <h3 className={styles.section_heading}>
                  Subtasks & Phân bổ điểm ({problem.subtasks.length} Subtasks)
                </h3>
                <div className={styles.subtasks_table_wrapper}>
                  <table className={styles.subtasks_table}>
                    <thead>
                      <tr>
                        <th>Tên Subtask</th>
                        <th>Điểm số</th>
                        <th>Ràng buộc / Chi tiết</th>
                        <th>Số Test Cases</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problem.subtasks.map((st, sIdx) => (
                        <tr key={st.id || sIdx}>
                          <td>
                            <strong>{st.name || `Subtask ${sIdx + 1}`}</strong>
                          </td>
                          <td>
                            <span className={styles.subtask_pts}>{st.points || 0} pt</span>
                          </td>
                          <td>
                            {st.constraints ? (
                              <code>{st.constraints}</code>
                            ) : (
                              <span className={styles.subtask_no_constraint}>Không có ràng buộc phụ</span>
                            )}
                          </td>
                          <td>
                            {st.testCases?.length || 0} test(s)
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 className={styles.section_heading} style={{ margin: 0 }}>Thảo luận cộng đồng ({discussions.length})</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {discussions.map((item, idx) => (
                <div
                  key={item.id || idx}
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
                        id: item.raw?.authorId?._id || "user-02",
                        username: item.name,
                        handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                        avatar: item.avatar,
                        bio: "Thí sinh giải thuật toán tại FySet.",
                      })
                    }
                    title="Click để xem Profile"
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{ fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}
                        onClick={() =>
                          onSelectUser?.({
                            id: item.raw?.authorId?._id || "user-02",
                            username: item.name,
                            handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                            avatar: item.avatar,
                            bio: "Thí sinh giải thuật toán tại FySet.",
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

      {/* Pinned Bottom ChatInput for Discussion */}
      {activeTab === "discussion" && (
        <div className={styles.discussion_footer}>
          <ChatInput
            placeholder="Chia sẻ hướng giải, thuật toán hoặc đặt câu hỏi về bài toán này..."
            onSend={handleSendDiscussion}
          />
        </div>
      )}
    </div>
  );
}

export default ProblemDetailDescription;
