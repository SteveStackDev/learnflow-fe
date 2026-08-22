import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminUserBadgesTab({ userState }) {
  const badges = userState.badgesEarned || [];

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
        <Icon name="Award" size={18} /> Earned Badges & Achievements ({badges.length})
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {badges.map((b) => (
          <div key={b.id} style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: "rgba(9, 80, 195, 0.04)",
            border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.2))",
            display: "flex",
            alignItems: "center",
            gap: 14
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "rgba(9, 80, 195, 0.1)",
              color: "var(--color-primary, #0950c3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Icon name={b.icon} size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{b.title}</div>
              <div style={{ fontSize: "0.775rem", opacity: 0.7 }}>{b.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
