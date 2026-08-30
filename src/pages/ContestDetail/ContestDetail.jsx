import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useToast } from "~/context/ToastContext.jsx";
import Icon from "~/components/Icon/Icon";

// Import Custom Component Sub-Views
import ContestDetailHeader from "./components/ContestDetailHeader/ContestDetailHeader";
import ContestSidebar from "./components/ContestSidebar/ContestSidebar";
import ContestProblemView from "./components/ContestProblemView/ContestProblemView";
import ContestCodeEditor from "./components/ContestCodeEditor/ContestCodeEditor";
import ContestLiveLeaderboard from "./components/ContestLiveLeaderboard/ContestLiveLeaderboard";
import ProblemDetailConsole from "~/pages/ProblemDetail/components/ProblemDetailConsole/ProblemDetailConsole";

import styles from "./ContestDetail.module.css";
import { mockContestData } from "~/constants/mockContestDetail";
import { mockRunCodeLogs, mockJudgingSequence } from "~/constants/mockJudgingLogs";

export default function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const contest = mockContestData;

  // Track Layout Controls (Panels display toggles)
  const [showProblemsList, setShowProblemsList] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Active Problem Selection State
  const [activeProblemId, setActiveProblemId] = useState("A");

  // Loading States for Code Execution and Submission (Judger Engine)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [judgingStep, setJudgingStep] = useState("");

  // Mobile View Tabs State ('problem' | 'editor' | 'leaderboard')
  const [activeMobileTab, setActiveMobileTab] = useState("problem");
  const [isMobileViewport, setIsMobileViewport] = useState(window.innerWidth <= 1024);

  // Responsive Viewport Resize Listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= 1024);
    };
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
    if (isSubmitting || isExecuting) return;

    setIsExecuting(true);
    setIsConsoleExpanded(true);
    setConsoleLogs(mockRunCodeLogs(activeProblem.title || `Bài ${activeProblem.id || "A"}`));

    setTimeout(() => {
      setIsExecuting(false);
      toast.success("Chạy thử mã nguồn thành công!", "Biên dịch C++");
    }, 800);
  };

  const handleSubmitCode = () => {
    if (isSubmitting || isExecuting) return;

    const s1 = mockJudgingSequence.step1(activeProblem.id || "A");
    const s2 = mockJudgingSequence.step2;
    const s3 = mockJudgingSequence.step3;

    setIsSubmitting(true);
    setIsConsoleExpanded(true);
    setJudgingStep(s1.stepLabel);
    setConsoleLogs(s1.logs);

    setTimeout(() => {
      setJudgingStep(s2.stepLabel);
      setConsoleLogs((prev) => [...prev, ...s2.logs]);
    }, 1100);

    setTimeout(() => {
      setJudgingStep(s3.stepLabel);
      setConsoleLogs((prev) => [...prev, ...s3.logs]);
    }, 2200);

    setTimeout(() => {
      setIsSubmitting(false);
      setJudgingStep("");
      navigate(`/contest/${activeProblem.id || "A"}/result`, {
        state: {
          submissionResult: {
            status: "Accepted",
            statusLabel: "Chấp nhận (Accepted)",
            submittedCode: currentCode,
            language: "C++",
          },
        },
      });
    }, 3000);
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

      {/* Main Responsive Grid Layout Container */}
      <div className={styles.grid_container}>
        {isMobileViewport ? (
          /* Mobile / Tablet Single Viewport Renderer */
          <>
            {activeMobileTab === "problem" && (
              <>
                {showProblemsList && (
                  <div className={styles.mobile_sidebar_card}>
                    <ContestSidebar
                      user={contest.user}
                      problems={contest.problems}
                      activeProblemId={activeProblem.id}
                      onSelectProblem={(problemId) => setActiveProblemId(problemId)}
                    />
                  </div>
                )}
                <ContestProblemView problem={activeProblem} />
              </>
            )}

            {activeMobileTab === "editor" && (
              <ContestCodeEditor
                code={currentCode}
                onChangeCode={handleChangeCode}
                onResetCode={handleResetCode}
                onRunTest={handleRunCode}
                onSubmitCode={handleSubmitCode}
                onFileUpload={(content) => handleChangeCode(content)}
                isSubmitting={isSubmitting}
                isExecuting={isExecuting}
              />
            )}

            {activeMobileTab === "leaderboard" && (
              <ContestLiveLeaderboard
                leaderboard={contest.leaderboard}
                onClose={() => setActiveMobileTab("problem")}
              />
            )}
          </>
        ) : (
          /* Desktop (> 1024px): Standard Multi-Pane Arena Layout */
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
              isExecuting={isExecuting}
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

      {/* Full Width Integrated Bottom Console Logs */}
      <div className={styles.console_wrapper}>
        <ProblemDetailConsole
          consoleLogs={consoleLogs}
          isExpanded={isConsoleExpanded}
          setIsExpanded={setIsConsoleExpanded}
          onClearLogs={() => setConsoleLogs([])}
          isSubmitting={isSubmitting}
          isExecuting={isExecuting}
          judgingStep={judgingStep}
        />
      </div>
    </div>
  );
}