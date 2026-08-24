import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./AdminMessageOverview.module.css";

export default function AdminMessageOverview({ overviewData }) {
  const cards = [
    { label: "Total Messages", value: overviewData.totalMessages, icon: "MessageSquare", color: "#0950c3", bg: "rgba(9, 80, 195, 0.12)" },
    { label: "Conversations", value: overviewData.totalConversations, icon: "Users", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)" },
    { label: "Active Users", value: overviewData.activeUsers, icon: "Zap", color: "#22c55e", bg: "rgba(34, 197, 94, 0.12)" },
    { label: "Reported Chats", value: overviewData.reportedChats, icon: "ShieldAlert", color: "#ef4444", bg: "rgba(239, 68, 68, 0.12)" },
  ];

  const maxChartCount = Math.max(...overviewData.chartData.map((d) => d.count)) || 100000;

  return (
    <div className={styles.container}>
      {/* 1. Header Banner */}
      <div className={`${styles.header_banner} reveal-card`}>
        <div>
          <h2 className={styles.banner_title}>Message Overview & Monitoring</h2>
          <p className={styles.banner_subtitle}>Giám sát lưu lượng tin nhắn, hội thoại người dùng và phát hiện các hành vi vi phạm</p>
        </div>
      </div>

      {/* 2. 4 Stat Cards */}
      <div className={`${styles.stat_cards_grid} reveal-card`}>
        {cards.map((c, idx) => (
          <div key={idx} className={styles.stat_card}>
            <div className={styles.card_header}>
              <span className={styles.card_label}>{c.label}</span>
              <div className={styles.icon_box} style={{ backgroundColor: c.bg, color: c.color }}>
                <Icon name={c.icon} size={20} />
              </div>
            </div>
            <div className={styles.card_val}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* 3. Message Statistics (Messages / Day Chart) */}
      <div className={`${styles.section_card} reveal-card`}>
        <h3 className={styles.section_title}>
          <Icon name="TrendingUp" size={18} /> Message Statistics (Messages / Day)
        </h3>

        <div className={styles.chart_container}>
          {overviewData.chartData.map((item, idx) => {
            const heightPercent = Math.round((item.count / maxChartCount) * 100);
            return (
              <div key={idx} className={styles.chart_col}>
                <div className={styles.chart_bar} style={{ height: `${heightPercent}%` }} title={`${item.count.toLocaleString()} msgs`} />
                <span className={styles.chart_day}>{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Conversation Statistics */}
      <div className={`${styles.section_card} reveal-card`}>
        <h3 className={styles.section_title}>
          <Icon name="Activity" size={18} /> Conversation Statistics
        </h3>

        <div className={styles.conv_stats_grid}>
          <div className={styles.conv_stat_box}>
            <span className={styles.box_lbl}>New Conversations</span>
            <span className={styles.box_val}>{overviewData.stats.newConversations}</span>
          </div>
          <div className={styles.conv_stat_box}>
            <span className={styles.box_lbl}>Active Conversations</span>
            <span className={styles.box_val}>{overviewData.stats.activeConversations}</span>
          </div>
          <div className={styles.conv_stat_box}>
            <span className={styles.box_lbl}>Average Messages / Conversation</span>
            <span className={styles.box_val}>{overviewData.stats.avgMessagesPerConv}</span>
          </div>
          <div className={styles.conv_stat_box}>
            <span className={styles.box_lbl}>Average Response Time</span>
            <span className={styles.box_val}>{overviewData.stats.avgResponseTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
