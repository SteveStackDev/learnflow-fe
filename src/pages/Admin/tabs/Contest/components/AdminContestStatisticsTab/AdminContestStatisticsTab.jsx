import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./AdminContestStatisticsTab.module.css";

export default function AdminContestStatisticsTab({ contestState }) {
  const stats = [
    { label: "Registered Users", value: (contestState.participantsCount || 1284).toLocaleString(), icon: "Users" },
    { label: "Active Participants", value: (contestState.activeParticipants || 1042).toLocaleString(), icon: "UserCheck" },
    { label: "Submission Count", value: "8,940 submissions", icon: "Send" },
    { label: "Average Score", value: "325 / 750 pts", icon: "Award" },
    { label: "Completion Rate", value: "81.2%", icon: "TrendingUp" },
    { label: "Cheating Flags", value: "0 detected", icon: "ShieldCheck" },
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
