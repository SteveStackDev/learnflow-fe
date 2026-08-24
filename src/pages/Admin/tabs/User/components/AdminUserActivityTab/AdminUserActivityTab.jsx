import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminUserActivityTab({ _userState }) {
  const activities = [
    { title: "Đã nộp bài giải Two Sum", time: "10 phút trước", type: "Problem", icon: "Code" },
    { title: "Đăng nhập hệ thống từ IP 118.69.182.45", time: "2 giờ trước", type: "Security", icon: "Shield" },
    { title: "Hoàn thành 85% bài học ReactJS", time: "1 ngày trước", type: "Course", icon: "BookOpen" },
    { title: "Đăng ký tham gia Weekly Challenge #42", time: "2 ngày trước", type: "Contest", icon: "Trophy" },
  ];

  return (
    <div style={{
      backgroundColor: "var(--theme-card-bg, #ffffff)",
      border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.3))",
      borderRadius: 20,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }}>
      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="Activity" size={18} /> Recent Activity Logs
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {activities.map((act, idx) => (
          <div key={idx} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderRadius: 12,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.2))"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Icon name={act.icon} size={18} />
              <span style={{ fontWeight: 600 }}>{act.title}</span>
            </div>
            <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
