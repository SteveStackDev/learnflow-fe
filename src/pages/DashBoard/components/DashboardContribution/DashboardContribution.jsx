import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardContribution.module.css";

export default function DashboardContribution({ attendanceMatrix = [] }) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Days in month
  const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const currentMonthMatrix = attendanceMatrix && attendanceMatrix.length > 0
    ? attendanceMatrix.slice(0, totalDaysInMonth)
    : Array.from({ length: 31 }, (_, i) => ({ date: `2026-08-${i + 1}`, count: (i % 3 === 0) ? (i % 4) + 1 : 0, level: (i % 3 === 0) ? Math.min((i % 4) + 1, 4) : 0 }));

  const activeCount = currentMonthMatrix.filter((item) => item.count > 0).length;

  return (
    <div className={styles.gh_contribution_container}>
      {/* Header Info */}
      <div className={styles.gh_header}>
        <div className={styles.gh_title}>
          <Icon name="Calendar" size={15} className={styles.gh_icon} />
          <span>Điểm danh GitHub-Style</span>
        </div>
        <span className={styles.gh_stats}>
          Tháng {currentMonth}/{currentYear} • {activeCount}/{totalDaysInMonth} ngày
        </span>
      </div>

      {/* GitHub 7-Column / Day Matrix */}
      <div className={styles.gh_grid}>
        {currentMonthMatrix.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.gh_cell} ${styles[`level_${item.level || 0}`]}`}
            title={`Ngày ${idx + 1}/${currentMonth}/${currentYear}: ${item.count || 0} đóng góp`}
          >
            <span className={styles.gh_day_num}>{idx + 1}</span>
          </div>
        ))}
      </div>

      {/* Footer Legend */}
      <div className={styles.gh_footer}>
        <span className={styles.legend_text}>Ít</span>
        <div className={styles.legend_boxes}>
          <div className={`${styles.legend_box} ${styles.level_0}`} />
          <div className={`${styles.legend_box} ${styles.level_1}`} />
          <div className={`${styles.legend_box} ${styles.level_2}`} />
          <div className={`${styles.legend_box} ${styles.level_3}`} />
          <div className={`${styles.legend_box} ${styles.level_4}`} />
        </div>
        <span className={styles.legend_text}>Nhiều</span>
      </div>
    </div>
  );
}
