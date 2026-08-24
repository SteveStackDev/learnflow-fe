import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";

export default function AdminUserCoursesTab({ userState }) {
  const courses = userState.coursesEnrolled || [];

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
        <Icon name="BookOpen" size={18} /> Enrolled Courses ({courses.length})
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.2)" }}>
            <th style={{ padding: "12px 16px" }}>Course Title</th>
            <th style={{ padding: "12px 16px" }}>Progress</th>
            <th style={{ padding: "12px 16px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr><td colSpan={3} style={{ padding: 20, textAlign: "center", opacity: 0.7 }}>Chưa đăng ký khóa học nào.</td></tr>
          ) : (
            courses.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid rgba(169, 183, 203, 0.15)" }}>
                <td style={{ padding: "14px 16px", fontWeight: 700 }}>{c.title}</td>
                <td style={{ padding: "14px 16px" }}>{c.progress}%</td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge variant={c.status === "Completed" ? "success" : "primary"} size="sm">{c.status}</Badge>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
