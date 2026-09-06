import { useState } from "react";
import { Link, useParams } from "react-router";
import styles from "./AILearningAnalysis.module.css";
import useScrollReveal from "~/hooks/useScrollReveal";
import { EmptyState } from "~/components/EmptyState/EmptyState";
import { submissionDetails } from "~/constants/mockAILearning";

import AILearningAnalysisHeader from "./components/AILearningAnalysisHeader/AILearningAnalysisHeader";
import ProblemStatementCard from "./components/ProblemStatementCard/ProblemStatementCard";
import SubmissionCodePanel from "./components/SubmissionCodePanel/SubmissionCodePanel";
import FailedTestCaseCard from "./components/FailedTestCaseCard/FailedTestCaseCard";
import AIDiagnosisPanel from "./components/AIDiagnosisPanel/AIDiagnosisPanel";
import UnderstandingCheck from "./components/UnderstandingCheck/UnderstandingCheck";

function AILearningAnalysis() {
  const { submissionId } = useParams();
  useScrollReveal();

  const activeId = submissionId || "12345";
  const submission = submissionDetails[activeId] || submissionDetails["12345"];

  // Default to done if diagnostic is available so user sees rich results immediately,
  // or allow interactive simulation.
  const [analysisState, setAnalysisState] = useState(
    submission?.aiAnalysis ? "done" : "idle"
  );

  const handleAnalyze = () => {
    setAnalysisState("loading");
    setTimeout(() => {
      setAnalysisState("done");
    }, 1200);
  };

  // ---- 1. Error state: unknown submission id ----
  if (!submission) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.top_bar}>
            <Link to="/ai-learning" className={styles.back_btn}>
              <span>← Quay lại AI Learning</span>
            </Link>
          </div>
          <EmptyState
            iconName="Search"
            title="Không tìm thấy bài nộp"
            description="Không tìm thấy dữ liệu phân tích cho mã bài nộp này. Có thể liên kết không chính xác."
            actionLabel="Quay về AI Learning"
            onAction={() => (window.location.href = "/ai-learning")}
          />
        </div>
      </div>
    );
  }

  // ---- 2. Non-WA state (Nothing to diagnose) ----
  if (!submission.aiAnalysis) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.top_bar}>
            <Link
              to={`/ai-learning/problem/${submission.problemId}`}
              className={styles.back_btn}
            >
              <span>← Quay lại lịch sử nộp bài</span>
            </Link>
          </div>
          <EmptyState
            iconName="CheckCircle2"
            title={`Bài nộp #${activeId} đã được Chấp nhận (${submission.status})`}
            description="AI Analysis hiện tập trung tối ưu phân tích cho các bài nộp gặp lỗi Wrong Answer (WA)."
          />
        </div>
      </div>
    );
  }

  const suspectedLines =
    analysisState === "done" ? submission.aiAnalysis.suspectedLines || [] : [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 1. Header Navigation & Submission Info */}
        <AILearningAnalysisHeader
          submission={submission}
          submissionId={activeId}
        />

        {/* 2. Main 2-Column Responsive Workspace */}
        <div className={styles.workspace_grid}>
          {/* Left Column: Problem Statement, Code Panel, Failed Test Case */}
          <div className={styles.workspace_left}>
            {/* A. Problem Statement (Collapsible) */}
            <ProblemStatementCard
              problemStatement={submission.problemStatement}
            />

            {/* B. Code Workspace with Syntax & Error Line Highlighting */}
            <SubmissionCodePanel
              submission={submission}
              suspectedLines={suspectedLines}
            />

            {/* C. Failed Test Case Input vs Expected & Actual Outputs */}
            <FailedTestCaseCard
              failedTestCase={submission.failedTestCase}
            />
          </div>

          {/* Right Column: AI Diagnosis, Concepts, Learning, Understanding Quiz */}
          <div className={styles.workspace_right}>
            {/* A. AI Diagnosis & Learning Recommendations */}
            <AIDiagnosisPanel
              analysisState={analysisState}
              aiAnalysis={submission.aiAnalysis}
              onAnalyze={handleAnalyze}
            />

            {/* B. Interactive Quiz: Check Your Understanding */}
            {analysisState === "done" && submission.aiAnalysis?.quiz && (
              <UnderstandingCheck
                quiz={submission.aiAnalysis.quiz}
                nextProblem={submission.aiAnalysis.nextProblem}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AILearningAnalysis;
