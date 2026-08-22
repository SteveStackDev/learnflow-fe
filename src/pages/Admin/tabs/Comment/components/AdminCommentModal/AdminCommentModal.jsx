import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import styles from "./AdminCommentModal.module.css";

export default function AdminCommentModal({ isOpen, onClose, onConfirm, comment }) {
  if (!isOpen || !comment) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Review & Moderate Comment</h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className={styles.body}>
          <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
            Bạn có chắc chắn muốn xử lý bình luận từ người dùng <strong>{comment.user.name}</strong> không?
          </div>
          <div style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: "rgba(0,0,0,0.03)",
            fontStyle: "italic",
            fontSize: "0.9rem"
          }}>
            "{comment.text}"
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={onConfirm}>
            <Icon name="Check" size={16} />
            <span>Confirm Action</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
