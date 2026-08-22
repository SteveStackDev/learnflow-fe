import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminUserContestsTab({ userState }) {
  const contests = userState.contestsParticipated || [];

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
        <Icon name="Trophy" size={18} /> Contest History ({contests.length})
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.2)" }}>
            <th style={{ padding: "12px 16px" }}>Contest</th>
            <th style={{ padding: "12px 16px" }}>Rank</th>
            <th style={{ padding: "12px 16px" }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {contests.length === 0 ? (
            <tr><td colSpan={3} style={{ padding: 20, textAlign: "center", opacity: 0.7 }}>Chưa tham gia cuộc thi nào.</td></tr>
          ) : (
            contests.map((cnt) => (
              <tr key={cnt.id} style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.15)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{cnt.title}</td>
                <td style={{ padding: "14px 16px", fontWeight: 800, color: "#eab308" }}>Rank #{cnt.rank}</td>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{cnt.score} pts</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
