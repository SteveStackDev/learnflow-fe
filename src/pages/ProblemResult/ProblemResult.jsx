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
          if (p) {
            setProblemInfo(p);
            // Sau khi có problemInfo, truy vấn lại bài nộp nếu chưa có
            if (!submissionState) {
              problemService.getUserProblems()
                .then((userProblems) => {
                  if (Array.isArray(userProblems)) {
                    const matched = userProblems.filter((sub) => {
                      const sp = sub.problemId || {};
                      const spId = String(sp._id || sp.id || sub.problemId || sub.id || "");
                      const spCode = String(sp.code || sub.code || "");
                      const spSlug = String(sp.slug || sub.slug || "").trim().toLowerCase();
                      const spTitle = String(sp.title || sub.title || "").trim().toLowerCase();

                      const tId = String(p._id || p.id || id || "");
                      const tCode = String(p.code || id || "");
                      const tSlug = String(p.slug || id || "").trim().toLowerCase();
                      const tTitle = String(p.title || "").trim().toLowerCase();

                      if (tId && (spId === tId || sub._id === tId || sub.id === tId)) return true;
                      if (spCode && tCode) {
                        if (spCode === tCode) return true;
                        if (/^\d+$/.test(spCode) && /^\d+$/.test(tCode) && Number(spCode) === Number(tCode)) return true;
                      }
                      if (tSlug && (spSlug === tSlug || spId === tSlug)) return true;
                      if (tTitle && spTitle && (spTitle === tTitle || spTitle.includes(tTitle) || tTitle.includes(spTitle))) return true;

                      return false;
                    });

                    if (matched.length > 0) {
                      matched.sort((a, b) => {
                        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        return timeB - timeA;
                      });
                      setFetchedSubmission(matched[0]);
                    }
                  }
                })
                .catch(() => {});
            }
          }
        })
        .catch(() => {});
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

  const rawScore = activeSub?.score ?? (activeSub ? 0 : 0);
  const rawMaxScore = activeSub?.max_score ?? activeSub?.maxScore ?? problemInfo?.points ?? 100;
  const resolvedMaxScore = Math.max(Number(rawMaxScore), Number(rawScore));
  const rawSourceCode = activeSub?.submittedCode || activeSub?.sourceCode || (activeSub ? "" : (problemInfo?.starterCode || problemInfo?.initialCode || "// Chưa có bài nộp nào được ghi nhận cho bài tập này.\n// Vui lòng quay lại làm bài và bấm Nộp bài để xem kết quả!"));
  const resolvedStatus = activeSub?.status || (activeSub ? "WA" : "UNSUBMITTED");

  const resultData = {
    id: id || "1",
    displayCode,
    problemTitle: resolvedTitle,
    difficultyLabel: resolvedDifficulty,
    submittedCode: rawSourceCode,
    sourceCode: rawSourceCode,
    language: activeSub?.language || "C++",
    status: resolvedStatus,
    statusCode: resolvedStatus,
    score: rawScore,
    totalScore: rawScore,
    max_score: resolvedMaxScore,
    maxPossibleScore: resolvedMaxScore,
    subtasks: activeSub?.subtasks || activeSub?.subtasksResult || [],
    testResults: activeSub?.testResults || [],
    passedTestCases: activeSub?.passedTests ?? (resolvedStatus === "AC" ? 5 : 0),
    totalTestCases: activeSub?.totalTests ?? 5,
    logs: activeSub?.logs || [],
    memory: activeSub?.memoryUsed ? `${activeSub.memoryUsed} MB` : (activeSub?.memory || "2.4 MB"),
    runtime: resolvedStatus === "TLE" ? "> 2000 ms" : executionTimeMs,
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
