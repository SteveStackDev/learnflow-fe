import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminUserReportsTab({ userState }) {
  const reportsCount = userState.reportsCount || 0;

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
        <Icon name="ShieldAlert" size={18} /> Security & Report Log ({reportsCount})
      </h3>

      {reportsCount === 0 ? (
        <div style={{ padding: 24, borderRadius: 16, backgroundColor: "rgba(16, 185, 129, 0.08)", color: "#10b981", textAlign: "center", fontWeight: 700 }}>
          <Icon name="CheckCircle" size={24} style={{ marginBottom: 6 }} />
          <div>Không có báo cáo vi phạm hoặc cảnh báo an ninh nào ghi nhận cho tài khoản này.</div>
        </div>
      ) : (
        <div style={{ padding: 24, borderRadius: 16, backgroundColor: "rgba(239, 68, 68, 0.08)", color: "#ef4444", textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Cảnh báo an ninh ({reportsCount} lượt vi phạm)</div>
          <div style={{ marginTop: 6, fontSize: "0.9rem" }}>Tài khoản bị phát hiện hành vi spam hoặc vi phạm quy chuẩn cộng đồng.</div>
        </div>
      )}
    </div>
  );
}
