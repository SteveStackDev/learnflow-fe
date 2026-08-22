import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminFeedbackDetail.module.css";

export default function AdminFeedbackDetail({ feedback, onBack, onSave }) {
  const { toast } = useToast();
  const [feedbackState, setFeedbackState] = useState(feedback || {});

  useScrollReveal(".reveal-card", [feedbackState]);

  if (!feedback) return null;

  const handleSave = () => {
    if (onSave) onSave(feedbackState);
    toast.success(`Đã cập nhật phản hồi "${feedbackState.subject}" thành công`, "Đã lưu");
  };

  const getStatusVariant = (status) => {
    if (status === "New") return "primary";
    if (status === "Reviewing") return "warning";
    if (status === "Resolved") return "success";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* 1. User Header Card */}
      <div className={`${styles.header_card} reveal-card`}>
        <div className={styles.user_main}>
          <img src={feedbackState.user?.avatar} alt={feedbackState.user?.name} className={styles.avatar_lg} />
          <div>
            <h2 className={styles.user_name}>{feedbackState.user?.name}</h2>
            <p className={styles.user_email}>{feedbackState.user?.email}</p>
            <div className={styles.badges_row}>
              <Badge variant="primary" size="sm">
                Type: {feedbackState.type}
              </Badge>
              <Badge variant={feedbackState.priority === "High" ? "danger" : "secondary"} size="sm">
                Priority: {feedbackState.priority}
              </Badge>
              <Badge variant={getStatusVariant(feedbackState.status)} size="sm">
                Status: {feedbackState.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Feedbacks</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            <Icon name="Save" size={16} />
            <span>Save Feedback</span>
          </Button>
        </div>
      </div>

      {/* 2. Subject & Description Card */}
      <div className={`${styles.card} reveal-card`}>
        <h3 className={styles.card_title}>
          <Icon name="MessageSquare" size={18} /> Feedback Subject & Description
        </h3>

        <div className={styles.subject_box}>
          {feedbackState.subject}
        </div>

        <div className={styles.desc_box}>
          {feedbackState.description}
        </div>

        {/* Attachments */}
        {(feedbackState.attachments || []).length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.8 }}>Attachments:</span>
            <div className={styles.attach_preview}>
              {feedbackState.attachments.map((att, idx) => (
                <img key={idx} src={att.url} alt={att.name} className={styles.attach_thumb} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Admin Notes Card */}
      <div className={`${styles.card} reveal-card`}>
        <h3 className={styles.card_title}>
          <Icon name="FileText" size={18} /> Internal Admin Notes
        </h3>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="Ghi chú phản hồi dành cho Quản trị viên..."
          value={feedbackState.adminNotes || ""}
          onChange={(e) => setFeedbackState({ ...feedbackState, adminNotes: e.target.value })}
        />
      </div>

      {/* 4. Status Transition Selector */}
      <div className={`${styles.card} reveal-card`}>
        <h3 className={styles.card_title}>
          <Icon name="CheckCircle" size={18} /> Update Feedback Status
        </h3>

        <div className={styles.radio_group}>
          {["New", "Reviewing", "Resolved", "Rejected"].map((st) => (
            <label key={st} className={styles.radio_label}>
              <input
                type="radio"
                name="feedback_status"
                value={st}
                checked={feedbackState.status === st}
                onChange={() => setFeedbackState({ ...feedbackState, status: st })}
                className={styles.radio_input}
              />
              <span>{st}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
