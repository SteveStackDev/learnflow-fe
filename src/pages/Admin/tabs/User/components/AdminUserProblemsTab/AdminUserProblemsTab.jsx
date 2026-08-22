import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

export default function AdminUserProblemsTab({ userState }) {
  const problems = userState.solvedProblems || [];

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
        <Icon name="Code" size={18} /> Solved Problems ({problems.length})
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.2)" }}>
            <th style={{ padding: "12px 16px" }}>Code</th>
            <th style={{ padding: "12px 16px" }}>Problem Title</th>
            <th style={{ padding: "12px 16px" }}>Difficulty</th>
            <th style={{ padding: "12px 16px" }}>Solved Date</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.15)" }}>
              <td style={{ padding: "14px 16px", fontFamily: "monospace", fontWeight: 700 }}>{p.code}</td>
              <td style={{ padding: "14px 16px", fontWeight: 700 }}>{p.title}</td>
              <td style={{ padding: "14px 16px" }}>
                <Badge variant={p.difficulty === "Easy" ? "success" : "warning"} size="sm">{p.difficulty}</Badge>
              </td>
              <td style={{ padding: "14px 16px", fontSize: "0.85rem", opacity: 0.7 }}>{p.solvedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
