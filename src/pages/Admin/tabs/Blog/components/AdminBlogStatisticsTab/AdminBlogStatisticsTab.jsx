import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminBlogStatisticsTab({ blogState }) {
  const stats = blogState.stats || {
    views: 12450,
    likes: 890,
    comments: 142,
    shares: 320,
    readingTime: "8 phút",
  };

  const statCards = [
    { title: "Total Views", value: stats.views.toLocaleString(), icon: "Eye", color: "#0950c3" },
    { title: "Total Likes", value: stats.likes.toLocaleString(), icon: "Heart", color: "#ef4444" },
    { title: "Comments Count", value: stats.comments.toLocaleString(), icon: "MessageSquare", color: "#f59e0b" },
    { title: "Social Shares", value: stats.shares.toLocaleString(), icon: "Share2", color: "#10b981" },
    { title: "Avg. Reading Time", value: stats.readingTime, icon: "Clock", color: "#8b5cf6" },
  ];

  return (
    <div style={{
      backgroundColor: "var(--theme-card-bg, #ffffff)",
      border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.3))",
      borderRadius: 20,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 24
    }}>
      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="BarChart2" size={18} /> Article Performance & Engagement Metrics
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {statCards.map((sc, idx) => (
          <div key={idx} style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.2))",
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", opacity: 0.7 }}>
                {sc.title}
              </span>
              <div style={{ color: sc.color }}>
                <Icon name={sc.icon} size={20} />
              </div>
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>{sc.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
