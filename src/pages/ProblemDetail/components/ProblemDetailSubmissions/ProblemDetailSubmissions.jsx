import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import styles from "./ProblemDetailSubmissions.module.css";
import Icon from "~/components/Icon/Icon";
import { Badge, Button } from "~/components/ui";
import { problemService } from "~/services/problemService";
import { useToast } from "~/context/ToastContext.jsx";

function ProblemDetailSubmissions({ problem }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSubId, setExpandedSubId] = useState(null);

  const pId = String(problem?._id || problem?.id || "");
  const pCode = String(problem?.code || "");
  const pTitle = String(problem?.title || "").trim().toLowerCase();
  const pSlug = String(problem?.slug || "").trim().toLowerCase();

  const loadSubmissions = useCallback(async () => {
    if (!problem) return;
    setIsLoading(true);

    try {
      const data = await problemService.getUserProblems();
      const apiSubmissions = Array.isArray(data) ? data : [];

      // Lọc các bài nộp của chính bài tập hiện tại từ CSDL Backend
      const filtered = apiSubmissions.filter((item) => {
        const itemP = item.problemId || {};
        const itemId = String(itemP._id || itemP.id || item.problemId || item.id || "");
        const itemCode = String(itemP.code || item.code || "");
        const itemTitle = String(itemP.title || item.title || "").trim().toLowerCase();
        const itemSlug = String(itemP.slug || item.slug || "").trim().toLowerCase();

        // 1. Khớp MongoDB ID / Problem ID
        if (pId && (itemId === pId || String(item._id) === pId || String(item.id) === pId)) return true;

        // 2. Khớp Slug
        if (pSlug && (itemSlug === pSlug || itemId === pSlug)) return true;

        // 3. Khớp Tiêu đề bài tập
        if (pTitle && (itemTitle === pTitle || itemTitle.includes(pTitle) || pTitle.includes(itemTitle))) return true;

        // 4. Khớp Code tịnh tiến (#01, #02...)
        if (pCode && itemCode) {
          if (itemCode === pCode) return true;
          if (/^\d+$/.test(itemCode) && /^\d+$/.test(pCode) && Number(itemCode) === Number(pCode)) return true;
        }

        return false;
      });

      // Sắp xếp bài nộp mới nhất lên đầu
      filtered.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

      setSubmissions(filtered);
    } catch (err) {
      console.warn("Lỗi tải lịch sử nộp bài của bài tập:", err);
      toast.error("Không thể tải danh sách bài nộp!", "Lịch sử nộp bài");
    } finally {
      setIsLoading(false);
    }
  }, [pId, pCode, pTitle, pSlug, problem, toast]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const handleRowClick = (sub) => {
    setExpandedSubId((prev) => (prev === sub.id ? null : sub.id));
  };

  const handleViewResult = (e, sub) => {
    e.stopPropagation();
    const pDisplayCode = problem.code || (problem.id ? String(problem.id).padStart(2, "0") : "01");
    const problemFullTitle = `#${pDisplayCode}: ${problem.title || "Bài tập thuật toán"}`;
    const pDiffLabel = problem.difficultyLabel || problem.difficulty || "Dễ";

    navigate(`/problem/${problem.slug || problem.id || pId}/result`, {
      state: {
        submissionResult: {
          id: sub.id || sub._id,
          problemId: problem.id || pId,
          problemTitle: problemFullTitle,
          difficultyLabel: pDiffLabel,
          status: sub.status || "AC",
          score: sub.score ?? 0,
          max_score: sub.maxScore ?? problem.points ?? 100,
          executionTime: sub.executionTime ?? 0.024,
          memory: sub.memoryUsed ? `${sub.memoryUsed} MB` : (sub.memory || "2.4 MB"),
          memoryUsed: sub.memoryUsed ?? 2.4,
          language: sub.language || "C++",
          submittedCode: sub.sourceCode || sub.submittedCode || "",
          testResults: sub.testResults || [],
          subtasks: sub.subtasksResult || sub.subtasks || [],
          passedTests: sub.passedTests ?? (sub.status === "AC" ? 5 : 0),
          totalTests: sub.totalTests ?? 5,
          logs: sub.logs || [],
        },
      },
    });
  };

  const getStatusBadge = (status) => {
    const s = String(status || "").toUpperCase();
    if (s === "AC" || s === "ACCEPTED" || s === "SOLVED") {
      return (
        <Badge variant="success" className={styles.badge_ac}>
          <Icon name="CheckCircle2" size={14} />
          <span>Accepted</span>
        </Badge>
      );
    }
    if (s === "WA" || s === "WRONG ANSWER" || s === "WRONG") {
      return (
        <Badge variant="error" className={styles.badge_wa}>
          <Icon name="XCircle" size={14} />
          <span>Wrong Answer</span>
        </Badge>
      );
    }
    if (s === "TLE" || s === "TIME LIMIT EXCEEDED") {
      return (
        <Badge variant="warning" className={styles.badge_tle}>
          <Icon name="Clock" size={14} />
          <span>Time Limit</span>
        </Badge>
      );
    }
    if (s === "RE" || s === "RUNTIME ERROR") {
      return (
        <Badge variant="info" className={styles.badge_re}>
          <Icon name="AlertTriangle" size={14} />
          <span>Runtime Error</span>
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className={styles.badge_other}>
        <Icon name="FileCode" size={14} />
        <span>{status || "Submitted"}</span>
      </Badge>
    );
  };

  const formatTime = (time) => {
    if (!time) return "Vừa xong";
    try {
      const d = new Date(time);
      if (isNaN(d.getTime())) return "Vừa xong";
      return d.toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "Vừa xong";
    }
  };

  return (
    <div className={styles.submissions_container}>
      {/* Header Bar */}
      <div className={styles.header_bar}>
        <div className={styles.header_info}>
          <h2 className={styles.header_title}>
            <Icon name="History" size={18} className={styles.header_icon} />
            <span>Lịch sử nộp bài</span>
          </h2>
          <span className={styles.header_badge}>{submissions.length} lần nộp</span>
        </div>

        <button
          type="button"
          onClick={loadSubmissions}
          disabled={isLoading}
          className={styles.refresh_btn}
          title="Tải lại lịch sử nộp bài"
        >
          <Icon name="RotateCcw" size={15} className={isLoading ? "animate-spin" : ""} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className={styles.loading_state}>
          <Icon name="Loader2" size={26} className="animate-spin" />
          <span>Đang tải lịch sử các lần nộp bài của bạn...</span>
        </div>
      ) : submissions.length === 0 ? (
        <div className={styles.empty_state}>
          <div className={styles.empty_icon_wrap}>
            <Icon name="Inbox" size={36} />
          </div>
          <h3 className={styles.empty_title}>Chưa có bài nộp nào</h3>
          <p className={styles.empty_desc}>
            Bạn chưa gửi bài làm nào cho bài tập <strong>#{problem.code || problem.id}: {problem.title}</strong>.
            Hãy viết mã nguồn tại khung soạn thảo bên phải và bấm <strong>Nộp bài</strong> để chấm điểm tự động!
          </p>
        </div>
      ) : (
        <div className={styles.submissions_list}>
          {submissions.map((sub, idx) => {
            const isExpanded = expandedSubId === sub.id;
            const runtimeMs = sub.executionTime
              ? (Number(sub.executionTime) < 1 ? Math.round(Number(sub.executionTime) * 1000) : Math.round(Number(sub.executionTime)))
              : (sub.runtime || 24);
            const memoryMb = sub.memoryUsed || sub.memory || "2.4";
            const scoreVal = sub.score ?? (sub.status === "AC" ? (problem.points || 500) : 0);
            const maxScoreVal = sub.maxScore ?? (problem.points || 500);

            return (
              <div
                key={sub.id || sub._id || idx}
                className={`${styles.submission_card} ${isExpanded ? styles["submission_card--expanded"] : ""}`}
                onClick={() => handleRowClick(sub)}
              >
                {/* Top Row: Status + Score + Actions */}
                <div className={styles.card_header}>
                  <div className={styles.card_status_group}>
                    {getStatusBadge(sub.status)}
                    <span className={styles.score_text}>
                      <strong>{scoreVal}</strong> / {maxScoreVal} pt
                    </span>
                  </div>

                  <div className={styles.card_actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleViewResult(e, sub)}
                      className={styles.result_btn}
                    >
                      <Icon name="Eye" size={14} />
                      <span>Chi tiết</span>
                    </Button>
                    <button
                      type="button"
                      className={styles.toggle_expand_btn}
                      title={isExpanded ? "Thu gọn mã nguồn" : "Xem mã nguồn"}
                    >
                      <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={16}
                      />
                    </button>
                  </div>
                </div>

                {/* Metadata Row: Language, Time, Memory, Timestamp */}
                <div className={styles.card_meta}>
                  <span className={styles.meta_pill}>
                    <Icon name="Code" size={13} />
                    <span>{sub.language || "C++"}</span>
                  </span>

                  <span className={styles.meta_pill}>
                    <Icon name="Clock" size={13} />
                    <span>{runtimeMs} ms</span>
                  </span>

                  <span className={styles.meta_pill}>
                    <Icon name="Cpu" size={13} />
                    <span>{memoryMb} MB</span>
                  </span>

                  <span className={styles.meta_time}>
                    {formatTime(sub.createdAt)}
                  </span>
                </div>

                {/* Expanded Source Code View */}
                {isExpanded && (
                  <div
                    className={styles.code_drawer}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.code_drawer_header}>
                      <span className={styles.code_drawer_title}>
                        <Icon name="FileCode" size={14} />
                        <span>Mã nguồn đã nộp ({sub.language || "C++"})</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (sub.sourceCode || sub.submittedCode) {
                            navigator.clipboard.writeText(sub.sourceCode || sub.submittedCode);
                            toast.success("Đã sao chép mã nguồn vào clipboard!", "Sao chép");
                          }
                        }}
                        className={styles.copy_btn}
                      >
                        <Icon name="Copy" size={13} />
                        <span>Sao chép code</span>
                      </button>
                    </div>

                    <pre className={styles.code_block}>
                      <code>{sub.sourceCode || sub.submittedCode || "// Không có nội dung mã nguồn được lưu trữ"}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProblemDetailSubmissions;
