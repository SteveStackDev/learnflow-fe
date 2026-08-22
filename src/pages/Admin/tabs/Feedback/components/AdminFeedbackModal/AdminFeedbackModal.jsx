import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import styles from "./AdminFeedbackModal.module.css";

export default function AdminFeedbackModal({ isOpen, onClose, onConfirm, feedback }) {
  if (!isOpen || !feedback) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Update Feedback Status</h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            Bạn có chắc chắn muốn xử lý phản hồi <strong>"{feedback.subject}"</strong> từ người dùng <strong>{feedback.user.name}</strong> không?
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={onConfirm}>
            <Icon name="Check" size={16} />
            <span>Confirm Update</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
