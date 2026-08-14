import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { mockContestData } from "./data";
import ContestDetailHeader from "./components/ContestDetailHeader/ContestDetailHeader";
import ContestSidebar from "./components/ContestSidebar/ContestSidebar";
import ContestProblemView from "./components/ContestProblemView/ContestProblemView";
import ContestCodeEditor from "./components/ContestCodeEditor/ContestCodeEditor";
import ContestLiveLeaderboard from "./components/ContestLiveLeaderboard/ContestLiveLeaderboard";
import ProblemDetailConsole from "~/pages/Problem/subpages/ProblemDetail/components/ProblemDetailConsole/ProblemDetailConsole";
import ContestList from "../ContestList/ContestList";
import ContestResult from "../ContestResult/ContestResult";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContestDetail.module.css";

export function ContestDetail() {
  const contest = mockContestData;
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const validId = id && ["A", "B", "C", "D"].includes(id.toUpperCase()) ? id.toUpperCase() : "B";
  const [activeProblemId, setActiveProblemId] = useState(validId);
  const [showProblemsList, setShowProblemsList] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  useEffect(() => {
    if (id && ["A", "B", "C", "D"].includes(id.toUpperCase())) {
      setActiveProblemId(id.toUpperCase());
    }
  }, [id]);

  const [codeMap, setCodeMap] = useState(() => {
    const initialMap = {};
    if (contest && contest.problems) {
      contest.problems.forEach((p) => {
        initialMap[p.id] = p.starterCode?.cpp || "";
      });
    }
    return initialMap;
  });

  if (id && id.toLowerCase() === "list") {
    return <ContestList />;
  }

  if (id && id.toLowerCase() === "result") {
    return <ContestResult />;
  }

  const activeProblem =
    contest.problems.find((p) => p.id === activeProblemId) || contest.problems[0];

    const currentCode = codeMap[activeProblem.id] || "";

    const handleChangeCode = (newCode) => {
        setCodeMap((prev) => ({
            ...prev,
            [activeProblem.id]: newCode,
        }));
    };

    const handleResetCode = () => {
        setCodeMap((prev) => ({
            ...prev,
            [activeProblem.id]: activeProblem.starterCode.cpp || "",
        }));
        toast.info("Đã đặt lại mã nguồn mặc định!", "Mã nguồn");
    };

    const handleRunCode = () => {
        const timestamp = new Date().toLocaleTimeString();
        setConsoleLogs([
            { type: "info", text: `Compiling solution for ${activeProblem.title} at ${timestamp}...` },
            { type: "stdout", text: "stdout: root = [2,1,3], checking isValidBST..." },
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
            navigate(`/contest/${activeProblem.id || "B"}/result`);
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
                        onSelectProblem={(id) => setActiveProblemId(id)}
                    />
                )}

                {/* Center: Problem Statement & Examples */}
                <ContestProblemView problem={activeProblem} />

                {/* Right Center: Clean Code Editor & Integrated Action Bar */}
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

            {/* Full-Width Console Log Panel Below Main Grid */}
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
