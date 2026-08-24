import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminMessageDetail.module.css";

export default function AdminMessageDetail({ conversation, onBack, onDelete }) {
  const { toast } = useToast();
  const [convState, setConvState] = useState(conversation || {});

  useScrollReveal(".reveal-card", [convState]);

  if (!conversation) return null;

  const handleFlagChat = () => {
    const nextStatus = convState.status === "Reported" ? "Active" : "Reported";
    const updated = { ...convState, status: nextStatus };
    setConvState(updated);
    toast.warning(`Đã ${nextStatus === "Reported" ? "gắn cờ cảnh báo" : "bỏ gắn cờ"} đoạn hội thoại`);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(convState.id);
    toast.danger("Đã xóa vĩnh viễn cuộc hội thoại khỏi hệ thống");
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Bar */}
      <div className={`${styles.header_bar} reveal-card`}>
        <div className={styles.left_wrap}>
          <button type="button" className={styles.back_btn} onClick={onBack}>
            <Icon name="ArrowLeft" size={18} />
            <span>Back to Overview</span>
          </button>
          <h2 className={styles.detail_title}>CONVERSATION DETAIL: {convState.id}</h2>
          <Badge variant={convState.status === "Active" ? "success" : "danger"} size="sm">
            {convState.status}
          </Badge>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={handleFlagChat}>
            <Icon name="Flag" size={16} />
            <span>{convState.status === "Reported" ? "Unflag Chat" : "Flag Chat"}</span>
          </Button>
          <Button variant="outline" size="sm" style={{ color: "#ef4444", borderColor: "#ef4444" }} onClick={handleDelete}>
            <Icon name="Trash2" size={16} />
            <span>Delete Conversation</span>
          </Button>
        </div>
      </div>

      {/* 2. Grid Layout: Chat Log Feed + Summary Sidebar */}
      <div className={`${styles.detail_grid} reveal-card`}>
        {/* Main Chat Feed */}
        <div className={styles.chat_card}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="MessageSquare" size={18} /> Chat Message Logs ({convState.messages?.length || 0})
          </h3>

          <div className={styles.chat_feed}>
            {(convState.messages || []).map((msg) => (
              <div key={msg.id} className={styles.msg_item}>
                <div className={styles.msg_header}>
                  <span className={styles.msg_sender}>{msg.sender}</span>
                  <span className={styles.msg_time}>{msg.time}</span>
                </div>
                <div className={styles.msg_text}>{msg.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className={styles.sidebar_card}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="Users" size={18} /> Participants
          </h3>

          <div className={styles.participant_box}>
            <img src={convState.userA?.avatar} alt={convState.userA?.name} className={styles.avatar_sm} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{convState.userA?.name}</div>
              <div style={{ fontSize: "0.775rem", opacity: 0.7 }}>@{convState.userA?.username}</div>
            </div>
          </div>

          <div className={styles.participant_box}>
            <img src={convState.userB?.avatar} alt={convState.userB?.name} className={styles.avatar_sm} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{convState.userB?.name}</div>
              <div style={{ fontSize: "0.775rem", opacity: 0.7 }}>@{convState.userB?.username}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
            <div className={styles.meta_row}>
              <span style={{ opacity: 0.7 }}>Created Date:</span>
              <span style={{ fontWeight: 700 }}>{convState.createdDate}</span>
            </div>
            <div className={styles.meta_row}>
              <span style={{ opacity: 0.7 }}>Last Active:</span>
              <span style={{ fontWeight: 700 }}>{convState.lastActive}</span>
            </div>
            <div className={styles.meta_row}>
              <span style={{ opacity: 0.7 }}>Total Messages:</span>
              <span style={{ fontWeight: 700 }}>{convState.messagesCount}</span>
            </div>
            <div className={styles.meta_row}>
              <span style={{ opacity: 0.7 }}>User Reports:</span>
              <span style={{ fontWeight: 700, color: convState.reportsCount > 0 ? "#ef4444" : "inherit" }}>
                {convState.reportsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
