import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { mockContestData } from "~/constants";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestDetail.module.css";

// Components
import ContestDetailHeader from "./components/ContestDetailHeader/ContestDetailHeader";
import ContestSidebar from "./components/ContestSidebar/ContestSidebar";
import ContestProblemView from "./components/ContestProblemView/ContestProblemView";
import ContestCodeEditor from "./components/ContestCodeEditor/ContestCodeEditor";
import ContestLiveLeaderboard from "./components/ContestLiveLeaderboard/ContestLiveLeaderboard";
import ProblemDetailConsole from "~/pages/ProblemDetail/components/ProblemDetailConsole/ProblemDetailConsole";

export function ContestDetail() {
  const contest = mockContestData || { problems: [], leaderboard: [] };
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Mặc định chọn bài tập đầu tiên nếu id không hợp lệ
  const defaultProblemId = contest.problems?.[0]?.id || "A";
  const [activeProblemId, setActiveProblemId] = useState(id?.toUpperCase() || defaultProblemId);

  const [showProblemsList, setShowProblemsList] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Responsive Segmented Tab State for Tablet/Mobile (<= 1024px)
  const [activeMobileTab, setActiveMobileTab] = useState("problem"); // "problem" | "editor" | "leaderboard"

  // Track viewport width to apply responsive tab rendering
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dedicated Bottom Console Log State
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  // Cập nhật bài tập active khi param id trên URL thay đổi
  useEffect(() => {
    if (id) {
      const exists = contest.problems?.some((p) => p.id.toLowerCase() === id.toLowerCase());
      if (exists) {
        setActiveProblemId(id.toUpperCase());
      }
    }
  }, [id, contest.problems]);

  const activeProblem =
    contest.problems?.find((p) => p.id === activeProblemId) || contest.problems?.[0] || {};

  // Store code state cho từng bài tập trong contest
  const [codeMap, setCodeMap] = useState(() => {
    const initialMap = {};
    contest.problems?.forEach((p) => {
      initialMap[p.id] = p.starterCode?.cpp || "";
    });
    return initialMap;
  });

  const currentCode = codeMap[activeProblem.id] || "";

  const handleChangeCode = (newCode) => {
    if (!activeProblem.id) return;
    setCodeMap((prev) => ({
      ...prev,
      [activeProblem.id]: newCode,
    }));
  };

  const handleResetCode = () => {
    if (!activeProblem.id) return;
    setCodeMap((prev) => ({
      ...prev,
      [activeProblem.id]: activeProblem.starterCode?.cpp || "",
    }));
    toast.info("Đã đặt lại mã nguồn mặc định!", "Mã nguồn");
  };

  const handleRunCode = () => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs([
      { type: "info", text: `Compiling solution for ${activeProblem.title || "Problem"} at ${timestamp}...` },
      { type: "stdout", text: "stdout: Running test cases..." },
      { type: "success", text: "Testcase 1: Accepted (Execution time: 0ms, Memory: 14.2MB)" },
      { type: "success", text: "Testcase 2: Accepted (Execution time: 1ms, Memory: 14.3MB)" },
    ]);
    setIsConsoleExpanded(true);
    toast.success("Đã chạy thử thành công tất cả testcases!", "Chạy thử code");
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    toast.info("Đang nộp bài và chuyển hướng tới kết quả...", "Nộp bài thành công");
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/contest/${activeProblem.id || "A"}/result`);
    }, 600);
  };

  return (
    <div className={styles.detail_page}>
      {/* Header Bar */}
      <div className={styles.header_wrapper}>
        <ContestDetailHeader
          contestTitle={contest.title}
          badgeText={contest.badge}
          initialRemainingSeconds={contest.remainingSeconds}
          showProblemsList={showProblemsList}
          onToggleProblemsList={() => {
            setShowProblemsList(!showProblemsList);
            if (isMobileViewport) setActiveMobileTab("problem");
          }}
          showLeaderboard={showLeaderboard}
          onToggleLeaderboard={() => {
            setShowLeaderboard(!showLeaderboard);
            if (isMobileViewport) setActiveMobileTab("leaderboard");
          }}
        />
      </div>

      {/* Segmented View Switcher (Visible on Tablet & Mobile <= 1024px) */}
      <div className={styles.mobile_tab_bar}>
        <button
          type="button"
          onClick={() => setActiveMobileTab("problem")}
          className={`${styles.mobile_tab_btn} ${activeMobileTab === "problem" ? styles["mobile_tab_btn--active"] : ""}`}
        >
          <Icon name="FileText" size={16} />
          <span>Đề bài & Bài tập</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileTab("editor")}
          className={`${styles.mobile_tab_btn} ${activeMobileTab === "editor" ? styles["mobile_tab_btn--active"] : ""}`}
        >
          <Icon name="Code" size={16} />
          <span>Trình soạn thảo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMobileTab("leaderboard")}
          className={`${styles.mobile_tab_btn} ${activeMobileTab === "leaderboard" ? styles["mobile_tab_btn--active"] : ""}`}
        >
          <Icon name="Trophy" size={16} />
          <span>Bảng xếp hạng</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className={styles.grid_container}>
        {/* On Mobile Viewport: Render based on activeMobileTab */}
        {isMobileViewport ? (
          <>
            {activeMobileTab === "problem" && (
              <>
                {showProblemsList && (
                  <ContestSidebar
                    user={contest.user}
                    problems={contest.problems}
                    activeProblemId={activeProblem.id}
                    onSelectProblem={(problemId) => setActiveProblemId(problemId)}
                  />
                )}
                <ContestProblemView problem={activeProblem} />
                
                {/* Floating Quick Action: Jump to Editor */}
                <div className={styles.mobile_quick_banner}>
                  <button
                    type="button"
                    onClick={() => setActiveMobileTab("editor")}
                    className={styles.mobile_quick_btn}
                  >
                    <span>Mở trình soạn thảo & Gõ code</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </>
            )}

            {activeMobileTab === "editor" && (
              <>
                {/* Quick Action: Back to Problem */}
                <div className={styles.mobile_quick_banner} style={{ marginTop: 0 }}>
                  <button
                    type="button"
                    onClick={() => setActiveMobileTab("problem")}
                    className={`${styles.mobile_quick_btn} ${styles["mobile_quick_btn--secondary"]}`}
                  >
                    <Icon name="ArrowLeft" size={16} />
                    <span>Xem lại đề bài & ví dụ ({activeProblem.id || "A"})</span>
                  </button>
                </div>

                <ContestCodeEditor
                  code={currentCode}
                  onChangeCode={handleChangeCode}
                  onResetCode={handleResetCode}
                  onRunTest={handleRunCode}
                  onSubmitCode={handleSubmitCode}
                  onFileUpload={(content) => handleChangeCode(content)}
                  isSubmitting={isSubmitting}
                />
              </>
            )}

            {activeMobileTab === "leaderboard" && (
              <ContestLiveLeaderboard
                leaderboard={contest.leaderboard}
                onClose={() => setActiveMobileTab("problem")}
              />
            )}
          </>
        ) : (
          /* Desktop Desktop (> 1024px): Standard Multi-Pane Arena Layout */
          <>
            {showProblemsList && (
              <ContestSidebar
                user={contest.user}
                problems={contest.problems}
                activeProblemId={activeProblem.id}
                onSelectProblem={(problemId) => setActiveProblemId(problemId)}
              />
            )}

            <ContestProblemView problem={activeProblem} />

            <ContestCodeEditor
              code={currentCode}
              onChangeCode={handleChangeCode}
              onResetCode={handleResetCode}
              onRunTest={handleRunCode}
              onSubmitCode={handleSubmitCode}
              onFileUpload={(content) => handleChangeCode(content)}
              isSubmitting={isSubmitting}
            />

            {showLeaderboard && (
              <ContestLiveLeaderboard
                leaderboard={contest.leaderboard}
                onClose={() => setShowLeaderboard(false)}
              />
            )}
          </>
        )}
      </div>

      {/* Console Log Panel (Visible when editor tab active on mobile, or always on desktop) */}
      {(!isMobileViewport || activeMobileTab === "editor") && (
        <div className={styles.console_wrapper}>
          <ProblemDetailConsole
            consoleLogs={consoleLogs}
            isExpanded={isConsoleExpanded}
            setIsExpanded={setIsConsoleExpanded}
            onClearLogs={() => setConsoleLogs([])}
          />
        </div>
      )}
    </div>
  );
}

export default ContestDetail;