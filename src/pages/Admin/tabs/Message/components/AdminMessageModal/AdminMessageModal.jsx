import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import styles from "./AdminMessageModal.module.css";

export default function AdminMessageModal({ isOpen, onClose, onConfirm, conversation }) {
  if (!isOpen || !conversation) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Conversation Moderation</h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            Bạn có chắc chắn muốn xử lý cuộc hội thoại giữa <strong>{conversation.userA.name}</strong> và <strong>{conversation.userB.name}</strong> không?
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={onConfirm}>
            <Icon name="Check" size={16} />
            <span>Confirm Moderation</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
