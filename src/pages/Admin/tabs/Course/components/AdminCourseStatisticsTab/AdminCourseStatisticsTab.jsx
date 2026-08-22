import React from "react";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";
import styles from "./AdminCourseStatisticsTab.module.css";

export default function AdminCourseStatisticsTab({ course }) {
  if (!course) return null;

  const STATS_DATA = [
    { label: "Total Students", value: course.students.toLocaleString(), icon: "Users", color: "#0950c3" },
    { label: "Completion Rate", value: "78.5%", icon: "CheckCircle2", color: "#22c55e" },
    { label: "Average Progress", value: "64.0%", icon: "Activity", color: "#38bdf8" },
    { label: "Average Rating", value: "4.9 ⭐", icon: "ThumbsUp", color: "#f59e0b" },
    { label: "Total Views", value: "18,420", icon: "Eye", color: "#a855f7" },
  ];

  return (
    <div className={styles.stats_grid}>
      {STATS_DATA.map((stat) => (
        <Card key={stat.label} className={styles.stat_kpi_card}>
          <div className={styles.stat_kpi_header}>
            <span className={styles.kpi_label}>{stat.label}</span>
            <Icon name={stat.icon} size={20} style={{ color: stat.color }} />
          </div>
          <h3 className={styles.kpi_val}>{stat.value}</h3>
        </Card>
      ))}
    </div>
  );
}
