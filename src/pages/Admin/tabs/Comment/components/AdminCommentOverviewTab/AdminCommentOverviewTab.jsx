import React from "react";
import Icon from "~/components/Icon/Icon";
import { FormField } from "~/components/ui";
import styles from "./AdminCommentOverviewTab.module.css";

export default function AdminCommentOverviewTab({ commentState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 1. Original Comment Text Box */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="MessageSquare" size={18} /> Original Comment Content
        </h3>
        <div className={styles.comment_box}>
          "{commentState.text}"
        </div>
      </div>

      {/* 2. Context & Related Content */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Link" size={18} /> Related Content Context
        </h3>

        <div className={styles.grid_2col}>
          <FormField label="Content Type" value={commentState.contentType || "N/A"} readOnly />
          <FormField
            label="Related Target Title"
            value={commentState.relatedContent ? commentState.relatedContent.title : "N/A"}
            readOnly
          />
        </div>

        <div className={styles.grid_2col}>
          <FormField label="Posted Date & Time" value={commentState.date || "N/A"} readOnly />
          <FormField label="Current Status" value={commentState.status || "Published"} readOnly />
        </div>
      </div>

      {/* 3. Author Info */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="User" size={18} /> Author Information
        </h3>

        <div className={styles.grid_2col}>
          <FormField label="Author Name" value={commentState.user?.name || "N/A"} readOnly />
          <FormField label="Username" value={`@${commentState.user?.username || "N/A"}`} readOnly />
        </div>
      </div>
    </div>
  );
}
