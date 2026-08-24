import React from "react";
import Icon from "~/components/Icon/Icon";
import { Card } from "~/components/ui";
import styles from "./AdminStatsCards.module.css";

const STATS_DATA = [
  {
    id: "users",
    title: "TÀI KHOẢN ĐĂNG KÝ",
    value: "12,480",
    badge: "+12% tháng này",
    isOnline: false,
    icon: "Users",
    accentColor: "#0950c3",
    accentBg: "rgba(9, 80, 195, 0.12)",
  },
  {
    id: "online",
    title: "NGƯỜI DÙNG ONLINE",
    value: "1,852",
    badge: "Đang hoạt động",
    isOnline: true,
    icon: "Zap",
    accentColor: "#22c55e",
    accentBg: "rgba(34, 197, 94, 0.12)",
  },
  {
    id: "revenue",
    title: "DOANH THU THÁNG",
    value: "452.8M đ",
    badge: "+18% tháng này",
    isOnline: false,
    icon: "CreditCard",
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.12)",
  },
];

export default function AdminStatsCards() {
  return (
    <div className={styles.stats_grid}>
      {STATS_DATA.map((item) => (
        <Card key={item.id} hoverable className={styles.stat_card}>
          <div className={styles.card_header}>
            <div
              className={styles.icon_box}
              style={{ backgroundColor: item.accentBg, color: item.accentColor }}
            >
              <Icon name={item.icon} size={22} />
            </div>

            <div className={styles.badge_box}>
              {item.isOnline && <span className={styles.online_pulse} />}
              <span className={styles.badge_text}>{item.badge}</span>
            </div>
          </div>

          <div className={styles.card_body}>
            <span className={styles.stat_title}>{item.title}</span>
            <h3 className={styles.stat_value}>{item.value}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
}
