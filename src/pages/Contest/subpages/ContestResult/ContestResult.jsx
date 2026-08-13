import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { mockContestResultData } from "./data";
import { mockContestData } from "../ContestDetail/data";
import ContestDetailHeader from "../ContestDetail/components/ContestDetailHeader/ContestDetailHeader";
import ContestSidebar from "../ContestDetail/components/ContestSidebar/ContestSidebar";
import ContestLiveLeaderboard from "../ContestDetail/components/ContestLiveLeaderboard/ContestLiveLeaderboard";
import ContestResultCode from "./components/ContestResultCode/ContestResultCode";
import ContestResultJudge from "./components/ContestResultJudge/ContestResultJudge";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContestResult.module.css";

export function ContestResult() {
  const contest = mockContestData;
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const validId = id && ["A", "B", "C", "D"].includes(id.toUpperCase()) ? id.toUpperCase() : "B";
  const [activeProblemId, setActiveProblemId] = useState(validId);
  const [showProblemsList, setShowProblemsList] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  useEffect(() => {
    if (id && ["A", "B", "C", "D"].includes(id.toUpperCase())) {
      setActiveProblemId(id.toUpperCase());
    }
  }, [id]);

  const resultData = {
    ...mockContestResultData,
    problemId: activeProblemId,
    problemLetter: activeProblemId,
    problemTitle:
      contest.problems.find((p) => p.id === activeProblemId)?.title ||
      mockContestResultData.problemTitle,
  };

  const handleSelectProblem = (probId) => {
    setActiveProblemId(probId);
    navigate(`/contest/${probId}`);
  };

  const handleRetryProblem = () => {
    navigate(`/contest/${activeProblemId}`);
  };

  const handleNextProblem = () => {
    const currentIndex = contest.problems.findIndex((p) => p.id === activeProblemId);
    if (currentIndex < contest.problems.length - 1) {
      const nextProb = contest.problems[currentIndex + 1];
      toast.success(`Đã chuyển sang bài tập tiếp theo: ${nextProb.title}`, "Bài tiếp theo");
      navigate(`/contest/${nextProb.id}`);
    } else {
      toast.info("Bạn đã ở bài tập cuối cùng của cuộc thi!", "Hoàn thành cuộc thi");
    }
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
            activeProblemId={activeProblemId}
            onSelectProblem={handleSelectProblem}
          />
        )}

        {/* Center: Contest Result Stacked Cards */}
        <main className={styles.result_main_content}>
          {/* Card 1: User Submitted Code */}
          <ContestResultCode resultData={resultData} />

          {/* Card 2: Judge Result Inspection & Action Buttons */}
          <ContestResultJudge
            resultData={resultData}
            onRetryProblem={handleRetryProblem}
            onNextProblem={handleNextProblem}
          />
        </main>

        {/* Right Drawer: Live Leaderboard */}
        {showLeaderboard && (
          <ContestLiveLeaderboard
            leaderboard={contest.leaderboard}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ContestResult;
