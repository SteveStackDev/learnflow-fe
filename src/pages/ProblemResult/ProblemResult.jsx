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
  const [fetchedSubmission, setFetchedSubmission] = useState(null);

  useEffect(() => {
    if (id) {
      problemService.getProblemById(id)
        .then((p) => {
          if (p) setProblemInfo(p);
        })
        .catch(() => {});

      // Nếu không có state từ navigation (ví dụ refresh F5), tự động lấy bài nộp gần nhất từ CSDL Backend
      if (!submissionState) {
        problemService.getUserProblems()
          .then((userProblems) => {
            if (Array.isArray(userProblems)) {
              const matched = userProblems.filter((sub) => {
                const p = sub.problemId || {};
                const pid = String(p._id || p.id || sub.problemId || sub.id || "");
                const pslug = String(p.slug || sub.slug || "").toLowerCase();
                const pcode = String(p.code || sub.code || "");
                return pid === String(id) || pslug === String(id).toLowerCase() || pcode === String(id);
              });
              if (matched.length > 0) {
                setFetchedSubmission(matched[0]);
              }
            }
          })
          .catch(() => {});
      }
    }
  }, [id, submissionState]);

  const activeSub = submissionState || fetchedSubmission;

  const executionTimeMs =
    activeSub?.executionTime != null
      ? typeof activeSub.executionTime === "number"
        ? `${Math.round(activeSub.executionTime * 1000)} ms`
        : `${activeSub.executionTime}`
      : "0 ms";

  const titleCodeMatch = activeSub?.problemTitle?.match(/^#?(\d+)/);
  const displayCode =
    problemInfo?.code ||
    (titleCodeMatch ? titleCodeMatch[1].padStart(2, "0") : null) ||
    (/^\d+$/.test(id) ? String(id).padStart(2, "0") : "01");

  const resolvedTitle =
    activeSub?.problemTitle ||
    (problemInfo ? (problemInfo.code ? `#${problemInfo.code}: ${problemInfo.title}` : `#${displayCode}: ${problemInfo.title}`) : `Bài tập #${displayCode}`);

  const resolvedDifficulty =
    activeSub?.difficultyLabel ||
    problemInfo?.difficultyLabel ||
    problemInfo?.difficulty ||
    "Dễ";

  const rawScore = activeSub?.score ?? 0;
  const rawMaxScore = activeSub?.max_score ?? activeSub?.maxScore ?? problemInfo?.points ?? 100;
  const resolvedMaxScore = Math.max(Number(rawMaxScore), Number(rawScore));
  const rawSourceCode = activeSub?.submittedCode || activeSub?.sourceCode || "";

  const resultData = {
    id: id || "1",
    displayCode,
    problemTitle: resolvedTitle,
    difficultyLabel: resolvedDifficulty,
    submittedCode: rawSourceCode,
    sourceCode: rawSourceCode,
    language: activeSub?.language || "C++",
    status: activeSub?.status || "AC",
    statusCode: activeSub?.status || "AC",
    score: rawScore,
    totalScore: rawScore,
    max_score: resolvedMaxScore,
    maxPossibleScore: resolvedMaxScore,
    subtasks: activeSub?.subtasks || activeSub?.subtasksResult || [],
    testResults: activeSub?.testResults || [],
    passedTestCases: activeSub?.passedTests ?? (activeSub?.status === "AC" ? 5 : 0),
    totalTestCases: activeSub?.totalTests ?? 5,
    logs: activeSub?.logs || [],
    memory: activeSub?.memoryUsed ? `${activeSub.memoryUsed} MB` : (activeSub?.memory || "2.4 MB"),
    runtime: activeSub?.status === "TLE" ? "> 2000 ms" : executionTimeMs,
  };

  return (
    <div className={styles.result_page}>
      {/* Outer Back Navigation Link Bar */}
      <div className={styles.top_bar}>
        <Link to={`/problem/${id || 1}`} className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay lại bài tập #{displayCode}</span>
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
