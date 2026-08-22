import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

export default function AdminCommentReportsTab({ commentState }) {
  const reports = commentState.reports || [];

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
        <Icon name="ShieldAlert" size={18} /> User Violations & Reports ({reports.length})
      </h3>

      {reports.length === 0 ? (
        <div style={{ padding: 24, borderRadius: 16, backgroundColor: "rgba(16, 185, 129, 0.08)", color: "#10b981", textAlign: "center", fontWeight: 700 }}>
          <Icon name="CheckCircle" size={24} style={{ marginBottom: 6 }} />
          <div>Bình luận này hoàn toàn sạch sẽ, chưa nhận báo cáo vi phạm nào.</div>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.2)" }}>
              <th style={{ padding: "12px 16px" }}>Reporter</th>
              <th style={{ padding: "12px 16px" }}>Violation Reason</th>
              <th style={{ padding: "12px 16px" }}>Reported At</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((rep) => (
              <tr key={rep.id} style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.15)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{rep.reporter}</td>
                <td style={{ padding: "14px 16px", color: "#ef4444", fontWeight: 600 }}>{rep.reason}</td>
                <td style={{ padding: "14px 16px", fontSize: "0.85rem", opacity: 0.7 }}>{rep.reportedAt}</td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge variant="warning" size="sm">{rep.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
