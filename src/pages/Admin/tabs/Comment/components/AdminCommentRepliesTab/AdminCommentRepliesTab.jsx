import React from "react";
import Icon from "~/components/Icon/Icon";

export default function AdminCommentRepliesTab({ commentState }) {
  const replies = commentState.replies || [];

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
        <Icon name="CornerDownRight" size={18} /> Nested Replies ({replies.length})
      </h3>

      {replies.length === 0 ? (
        <div style={{ padding: 24, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.02)", textAlign: "center", opacity: 0.7 }}>
          Chưa có câu trả lời phản hồi nào cho bình luận này.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {replies.map((rep) => (
            <div key={rep.id} style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor: "rgba(9, 80, 195, 0.04)",
              border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.2))",
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={rep.user.avatar} alt={rep.user.name} style={{ width: 32, height: 32, borderRadius: "50%" }} />
                  <span style={{ fontWeight: 700 }}>{rep.user.name}</span>
                  <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>@{rep.user.username}</span>
                </div>
                <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>{rep.date}</span>
              </div>
              <div style={{ fontSize: "0.925rem", lineHeight: 1.5 }}>"{rep.text}"</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
