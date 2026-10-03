import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router";
import styles from "./ProblemResult.module.css";
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
      : "0 ms";

  const resolvedTitle =
    submissionState?.problemTitle ||
    (problemInfo ? (problemInfo.code ? `#${problemInfo.code}: ${problemInfo.title}` : problemInfo.title) : `Bài tập #${id || 1}`);

  const resolvedDifficulty =
    submissionState?.difficultyLabel ||
    problemInfo?.difficultyLabel ||
    problemInfo?.difficulty ||
    "Dễ";

  const resultData = {
    id: id || "1",
    problemTitle: resolvedTitle,
    difficultyLabel: resolvedDifficulty,
    submittedCode: submissionState?.submittedCode || "",
    language: submissionState?.language || "C++",
    status: submissionState?.status || "AC",
    statusCode: submissionState?.status || "AC",
    score: submissionState?.score ?? 0,
    totalScore: submissionState?.score ?? 0,
    max_score: submissionState?.max_score ?? problemInfo?.points ?? 100,
    maxPossibleScore: submissionState?.max_score ?? problemInfo?.points ?? 100,
    subtasks: submissionState?.subtasks || [],
    testResults: submissionState?.testResults || [],
    passedTestCases: submissionState?.passedTests ?? 0,
    totalTestCases: submissionState?.totalTests ?? 0,
    logs: submissionState?.logs || [],
    memory: submissionState?.memoryUsed ? `${submissionState.memoryUsed} MB` : "2.4 MB",
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
