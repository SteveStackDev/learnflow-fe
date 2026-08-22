import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileStatsGrid.module.css";

export function ProfileStatsGrid({ stats }) {
  if (!stats) return null;

  return (
    <div className={styles.grid}>
      {/* Stat 1: Total XP */}
      <div className={styles.stat_card}>
        <div className={styles.icon_circle_gold}>
          <Icon name="Star" size={20} />
        </div>
        <div className={styles.stat_info}>
          <span className={styles.stat_label}>Tổng XP</span>
          <span className={styles.stat_value}>
            {stats.totalXP ? stats.totalXP.toLocaleString() : "0"}
          </span>
        </div>
      </div>

      {/* Stat 2: Solved Problems */}
      <div className={styles.stat_card}>
        <div className={styles.icon_circle_blue}>
          <Icon name="CheckCircle2" size={20} />
        </div>
        <div className={styles.stat_info}>
          <span className={styles.stat_label}>Bài tập đã giải</span>
          <span className={styles.stat_value}>
            {stats.solvedProblems ? stats.solvedProblems.toLocaleString() : "0"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileStatsGrid;
