import { useParams, Link } from "react-router";
import styles from "./ProblemResult.module.css";
import { problemResultData } from "./data";
import useScrollReveal from "~/hooks/useScrollReveal";
import Icon from "~/components/Icon/Icon";

import ProblemResultCode from "./components/ProblemResultCode/ProblemResultCode";
import ProblemResultJudge from "./components/ProblemResultJudge/ProblemResultJudge";

function ProblemResult() {
  useParams();
  useScrollReveal();

  const resultData = problemResultData;

  return (
    <div className={styles.result_page}>
      {/* Outer Back Navigation Link */}
      <div className={styles.top_bar}>
        <Link to="/problem/list" className={styles.back_btn}>
          <Icon name="ArrowLeft" size={16} />
          <span>Quay về danh sách bài tập</span>
        </Link>
      </div>

      {/* Main Stacked Layout (NO Description Tab): Submitted Code (Top) & Judge Result (Bottom) */}
      <div className={styles.container}>
        {/* Component 1 (Top): User Submitted Code */}
        <div className="reveal-card">
          <ProblemResultCode resultData={resultData} />
        </div>

        {/* Component 2 (Bottom): Result & Grading Inspection */}
        <div className="reveal-card">
          <ProblemResultJudge resultData={resultData} />
        </div>
      </div>
    </div>
  );
}

export default ProblemResult;
