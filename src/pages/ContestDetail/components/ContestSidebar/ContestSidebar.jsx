import React from "react";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";
import styles from "./ContestSidebar.module.css";

export function ContestSidebar({
  user,
  problems,
  activeProblemId,
  onSelectProblem,
}) {
  const percentScore = user ? Math.min((user.score / user.maxScore) * 100, 100) : 0;

  return (
    <ScrollArea className={styles.sidebar}>
      {/* User Info Card */}
      {user && (
        <div className={styles.user_card}>
          <div className={styles.user_header}>
            <img src={user.avatar} alt={`Ảnh đại diện của ${user.name}`} className={styles.avatar} />
            <div className={styles.user_info}>
              <span className={styles.user_name}>{user.name}</span>
              <span className={styles.user_rank}>Rank: {user.rank}</span>
            </div>
          </div>

          <div className={styles.score_row}>
            <span className={styles.score_label}>Current Score</span>
            <span className={styles.score_value}>{user.score} pt</span>
          </div>

          <div className={styles.progress_bg}>
            <div className={styles.progress_fill} style={{ width: `${percentScore}%` }} />
          </div>
        </div>
      )}

      {/* Problems Navigation List */}
      <span className={styles.section_label}>PROBLEMS</span>

      <div className={styles.problem_list}>
        {problems.map((prob) => {
          const isActive = prob.id === activeProblemId;
          const isLocked = prob.status === "locked";
          const isSolved = prob.status === "solved";

          let badgeIcon;
          let badgeClass = styles["status_badge--unsolved"];

          if (isSolved) {
            badgeIcon = <Icon name="Check" size={16} />;
            badgeClass = styles["status_badge--solved"];
          } else if (prob.status === "active" || isActive) {
            badgeIcon = <Icon name="Zap" size={14} />;
            badgeClass = styles["status_badge--active"];
          } else if (isLocked) {
            badgeIcon = <Icon name="Lock" size={14} />;
            badgeClass = styles["status_badge--locked"];
          } else {
            badgeIcon = <span>{prob.letter}</span>;
          }

          return (
            <button
              key={prob.id}
              type="button"
              disabled={isLocked}
              onClick={() => onSelectProblem(prob.id)}
              className={`${styles.problem_item} ${
                isActive ? styles["problem_item--active"] : ""
              } ${isSolved ? styles["problem_item--solved"] : ""}`}
            >
              <div className={`${styles.status_badge} ${badgeClass}`}>{badgeIcon}</div>

              <div className={styles.problem_info}>
                <span className={styles.problem_title}>{prob.title}</span>
                <span className={styles.problem_points}>{prob.points} pt</span>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

export default ContestSidebar;
