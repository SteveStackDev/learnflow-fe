import { useNavigate } from "react-router";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ProblemDaily.module.css";

function ProblemDaily({ problem }) {
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!problem) return null;

  const handleStartDaily = () => {
    toast.info(`Bắt đầu thử thách: ${problem.title}!`, "Thử thách");
    navigate(`/problem/${problem.slug || problem.id}`);
  };

  const getBadgeClass = (level) => {
    if (level === "Dễ" || level === "Easy") return styles["prob-challenges__level-badge--easy"];
    if (level === "Trung bình" || level === "Medium") return styles["prob-challenges__level-badge--medium"];
    return styles["prob-challenges__level-badge--hard"];
  };

  return (
    <section className={styles["prob-daily"]}>
      <div className={styles["prob-daily__container"]}>
        <div
          className={`${styles["prob-daily__card"]} reveal-card`}
          onClick={handleStartDaily}
          style={{ cursor: "pointer" }}
        >
          <div className={styles["prob-daily__info"]}>
            <div className={styles["prob-daily__badge"]}>Thử thách đề xuất</div>
            <h3 className={styles["prob-daily__title"]}>{problem.title}</h3>
            <p className={styles["prob-daily__desc"]}>
              {problem.statement || problem.description || "Hãy thử sức với bài toán thuật toán này ngay hôm nay!"}
            </p>
            <div className={styles["prob-daily__meta"]}>
              <span className={`${styles["prob-challenges__level-badge"]} ${getBadgeClass(problem.level || problem.difficulty)}`}>
                <span className={styles["prob-challenges__badge-dot"]} />
                {problem.level || problem.difficultyLabel || "Dễ"}
              </span>
              <span className={styles["prob-daily__reward"]}>+{problem.points || 500} pts</span>
            </div>
          </div>
          <div className={styles["prob-daily__action"]}>
            <div className={styles["prob-daily__timer"]}>
              <span className={styles["prob-daily__timer-label"]}>Chủ đề</span>
              <div style={{ color: "#38bdf8", fontWeight: 700, fontSize: "0.95rem" }}>
                {problem.topic || "Thuật toán"}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleStartDaily();
              }}
              className={styles["prob-daily__btn"]}
            >
              Giải ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemDaily;
