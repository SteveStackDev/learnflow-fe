import React from "react";
import Icon from "~/components/Icon/Icon";
import DashboardContribution from "../DashboardContribution/DashboardContribution";
import styles from "./DashboardContributionGoal.module.css";

export default function DashboardContributionGoal({ attendanceMatrix, weeklyGoal }) {
  const hoursPct = weeklyGoal ? Math.min(Math.round((weeklyGoal.hoursSpent / weeklyGoal.hoursTarget) * 100), 100) : 83;
  const problemsPct = weeklyGoal ? Math.min(Math.round((weeklyGoal.problemsSolved / weeklyGoal.problemsTarget) * 100), 100) : 90;

  return (
    <div className={`${styles.goal_card} reveal-card`}>
      <div className={styles.card_header}>
        <div className={styles.header_title_block}>
          <div className={styles.icon_box}>
            <Icon name="Activity" size={18} />
          </div>
          <div>
            <h3 className={styles.title}>Contribution Heatmap & Weekly Goal</h3>
            <p className={styles.subtitle}>Ma trận điểm danh 35 ngày & mục tiêu rèn luyện tuần này</p>
          </div>
        </div>
      </div>

      {/* Weekly Targets Row */}
      {weeklyGoal && (
        <div className={styles.weekly_targets_grid}>
          {/* Target 1: Hours */}
          <div className={styles.target_box}>
            <div className={styles.target_top}>
              <div className={styles.target_icon_blue}>
                <Icon name="Clock" size={16} />
              </div>
              <div className={styles.target_text}>
                <span className={styles.target_label}>Thời Gian Học Tuần Này</span>
                <span className={styles.target_val}>
                  {weeklyGoal.hoursSpent} / {weeklyGoal.hoursTarget} giờ ({hoursPct}%)
                </span>
              </div>
            </div>
            <div className={styles.progress_track}>
              <div className={styles.progress_fill_blue} style={{ width: `${hoursPct}%` }} />
            </div>
          </div>

          {/* Target 2: Solved Problems */}
          <div className={styles.target_box}>
            <div className={styles.target_top}>
              <div className={styles.target_icon_green}>
                <Icon name="CheckSquare" size={16} />
              </div>
              <div className={styles.target_text}>
                <span className={styles.target_label}>Mục Tiêu Bài Tập Thuật Toán</span>
                <span className={styles.target_val}>
                  {weeklyGoal.problemsSolved} / {weeklyGoal.problemsTarget} bài ({problemsPct}%)
                </span>
              </div>
            </div>
            <div className={styles.progress_track}>
              <div className={styles.progress_fill_green} style={{ width: `${problemsPct}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* GitHub Style Contribution Matrix */}
      <div className={styles.heatmap_wrapper}>
        <DashboardContribution attendanceMatrix={attendanceMatrix} />
      </div>
    </div>
  );
}
