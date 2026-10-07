import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./AdminProblemStatisticsTab.module.css";

export default function AdminProblemStatisticsTab({ problemState }) {
  const solved = typeof problemState?.solved === "number" ? problemState.solved : (Number(problemState?.solved) || 0);
  const totalSubmissions = typeof problemState?.totalSubmissions === "number" ? problemState.totalSubmissions : (Number(problemState?.totalSubmissions) || solved);
  const totalUsers = typeof problemState?.totalUsers === "number" ? problemState.totalUsers : (Number(problemState?.totalUsers) || solved);
  const acceptanceRate = typeof problemState?.acceptanceRate === "number" ? problemState.acceptanceRate : (parseInt(problemState?.acceptanceRate) || 0);

  const stats = [
    { label: "Total Submissions", value: totalSubmissions.toLocaleString(), icon: "Send" },
    { label: "Solved Users (AC)", value: `${solved.toLocaleString()} người`, icon: "CheckCircle" },
    { label: "Acceptance Rate", value: `${acceptanceRate}%`, icon: "TrendingUp" },
    { label: "Total Users Attempted", value: `${totalUsers.toLocaleString()} người`, icon: "Users" },
    { label: "Time Limit", value: `${problemState?.timeLimit || 1.0}s`, icon: "Clock" },
    { label: "Memory Limit", value: `${problemState?.memoryLimit || 256} MB`, icon: "Cpu" },
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
