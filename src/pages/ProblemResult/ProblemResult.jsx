import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router";
import styles from "./ProblemResult.module.css";
import { problemResultData } from "~/constants/mockProblemResult";
import useScrollReveal from "~/hooks/useScrollReveal";
import Icon from "~/components/Icon/Icon";
import { problemService } from "~/services/problemService";

import ProblemResultCode from "./components/ProblemResultCode/ProblemResultCode";
import ProblemResultJudge from "./components/ProblemResultJudge/ProblemResultJudge";

function ProblemResult() {
  const { id } = useParams();
  const location = useLocation();
  useScrollReveal();

  const submissionState = location.state?.submissionResult;
  const [problemInfo, setProblemInfo] = useState(null);

  useEffect(() => {
    if (id) {
      problemService.getProblemById(id)
        .then((p) => {
          if (p) setProblemInfo(p);
        })
        .catch(() => {});
    }
  }, [id]);

  const executionTimeMs =
    submissionState?.executionTime != null
      ? typeof submissionState.executionTime === "number"
        ? `${Math.round(submissionState.executionTime * 1000)} ms`
        : `${submissionState.executionTime}`
      : "36 ms";

  const resolvedTitle =
    submissionState?.problemTitle ||
    (problemInfo ? (problemInfo.code ? `#${problemInfo.code}: ${problemInfo.title}` : problemInfo.title) : null) ||
    problemResultData.problemTitle;

  const resolvedDifficulty =
    submissionState?.difficultyLabel ||
    problemInfo?.difficultyLabel ||
    problemInfo?.difficulty ||
    problemResultData.difficultyLabel;

  const resultData = {
    ...problemResultData,
    id: id || problemResultData.id,
    problemTitle: resolvedTitle,
    difficultyLabel: resolvedDifficulty,
    ...(submissionState?.submittedCode ? { submittedCode: submissionState.submittedCode } : {}),
    ...(submissionState?.language ? { language: submissionState.language } : {}),
    ...(submissionState?.status ? { status: submissionState.status, statusCode: submissionState.status } : {}),
    ...(submissionState?.subtasks ? { subtasks: submissionState.subtasks } : {}),
    ...(submissionState?.passedTests != null ? { passedTestCases: submissionState.passedTests } : {}),
    ...(submissionState?.totalTests != null ? { totalTestCases: submissionState.totalTests } : {}),
    runtime: submissionState?.status === "TLE" ? "> 2000 ms" : executionTimeMs,
  };

  return (
    <div className={styles.result_page}>
      {/* Outer Back Navigation Link Bar */}
      <div className={styles.top_bar}>
        <Link to={`/problem/${id || 1}`} className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay lại bài tập #{id || 1}</span>
        </Link>

        <Link to="/problem/list" className={styles.secondary_nav_link}>
          <Icon name="List" size={16} />
          <span>Danh sách bài tập</span>
        </Link>

        <Link to={`/problem/${id || 1}/submissions`} className={styles.secondary_nav_link}>
          <Icon name="History" size={16} />
          <span>Bài nộp của tôi (My Submissions)</span>
        </Link>
      </div>

      {/* Main Stacked Layout: Submitted Code (Top) & Judge Result (Bottom) */}
      <div className={styles.container}>
        {/* Component 1 (Top): User Submitted Code */}
        <div>
          <ProblemResultCode resultData={resultData} />
        </div>

        {/* Component 2 (Bottom): Result & Subtask Inspection */}
        <div>
          <ProblemResultJudge resultData={resultData} initialStatus={submissionState?.status || "Accepted"} />
        </div>
      </div>
    </div>
  );
}

export default ProblemResult;
