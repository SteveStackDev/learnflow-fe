import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { mockContestData } from "~/constants";
import { useToast } from "~/context/ToastContext.jsx";
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
          onToggleProblemsList={() => setShowProblemsList(!showProblemsList)}
          showLeaderboard={showLeaderboard}
          onToggleLeaderboard={() => setShowLeaderboard(!showLeaderboard)}
        />
      </div>

      {/* Main Workspace Layout */}
      <div className={styles.grid_container}>
        {/* Left Sidebar: User & Problems List */}
        {showProblemsList && (
          <ContestSidebar
            user={contest.user}
            problems={contest.problems}
            activeProblemId={activeProblem.id}
            onSelectProblem={(problemId) => setActiveProblemId(problemId)}
          />
        )}

        {/* Center: Problem Statement & Examples */}
        <ContestProblemView problem={activeProblem} />

        {/* Right Center: Code Editor */}
        <ContestCodeEditor
          code={currentCode}
          onChangeCode={handleChangeCode}
          onResetCode={handleResetCode}
          onRunTest={handleRunCode}
          onSubmitCode={handleSubmitCode}
          onFileUpload={(content) => handleChangeCode(content)}
          isSubmitting={isSubmitting}
        />

        {/* Right Drawer: Live Leaderboard */}
        {showLeaderboard && (
          <ContestLiveLeaderboard
            leaderboard={contest.leaderboard}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </div>

      {/* Console Log Panel */}
      <div className={styles.console_wrapper}>
        <ProblemDetailConsole
          consoleLogs={consoleLogs}
          isExpanded={isConsoleExpanded}
          setIsExpanded={setIsConsoleExpanded}
          onClearLogs={() => setConsoleLogs([])}
        />
      </div>
    </div>
  );
}

export default ContestDetail;