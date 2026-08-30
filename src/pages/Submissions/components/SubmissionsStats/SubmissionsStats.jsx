import React from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./SubmissionsStats.module.css";

export function SubmissionsStats({ submissionsCount, acCount, scopeType }) {
  const statCards = [
    {
      id: "total",
      label: "Tổng số lần nộp",
      value: submissionsCount,
      icon: "FileText",
      iconColor: "#0950c3",
      iconBg: "#e0ebff",
    },
    {
      id: "ac",
      label: scopeType ? "Số lần AC" : "Tổng số bài đã AC",
      value: acCount,
      icon: "CheckCircle",
      iconColor: "#10b981",
      iconBg: "#dcfce7",
    },
  ];

  return (
    <div className={styles.stats_grid}>
      {statCards.map((item) => (
        <Card key={item.id} className={styles.stat_card}>
          <div className={styles.stat_inner}>
            <div
              className={styles.icon_box}
              style={{ backgroundColor: item.iconBg, color: item.iconColor }}
            >
              <Icon name={item.icon} size={24} />
            </div>

            <div className={styles.stat_info}>
              <span className={styles.stat_label}>{item.label}</span>
              <h3 className={styles.stat_value}>{item.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SubmissionsStats;
