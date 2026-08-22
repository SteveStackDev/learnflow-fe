import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminUserCommentsTab({ userState }) {
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
        <Icon name="MessageSquare" size={18} /> User Comments & Discussions ({userState.commentsCount || 0})
      </h3>

      <div style={{ padding: 24, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.02)", textAlign: "center", opacity: 0.8 }}>
        Tài khoản đã đăng <strong>{userState.commentsCount || 0}</strong> bình luận và thảo luận trên các bài tập và khóa học của FySet.
      </div>
    </div>
  );
}
