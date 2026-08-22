import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./AdminProblemStatisticsTab.module.css";

export default function AdminProblemStatisticsTab({ problemState }) {
  const stats = [
    { label: "Total Submissions", value: "14,250", icon: "Send" },
    { label: "Accepted Submissions", value: "7,840", icon: "CheckCircle2" },
    { label: "Acceptance Rate", value: `${problemState.acceptanceRate || 55}%`, icon: "TrendingUp" },
    { label: "Average Memory", value: "14.2 MB", icon: "Cpu" },
    { label: "Average Runtime", value: "48 ms", icon: "Clock" },
    { label: "Discussion Posts", value: "128 threads", icon: "MessageSquare" },
  ];

  return (
    <div className={styles.grid_3col}>
      {stats.map((st, idx) => (
        <div key={idx} className={styles.stat_card}>
          <div className={styles.stat_icon}>
            <Icon name={st.icon} size={22} />
          </div>
          <div>
            <div className={styles.stat_val}>{st.value}</div>
            <div className={styles.stat_lbl}>{st.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
