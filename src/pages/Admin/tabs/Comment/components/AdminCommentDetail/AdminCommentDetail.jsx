import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminCommentDetail.module.css";

import AdminCommentOverviewTab from "../AdminCommentOverviewTab/AdminCommentOverviewTab";
import AdminCommentRepliesTab from "../AdminCommentRepliesTab/AdminCommentRepliesTab";
import AdminCommentReportsTab from "../AdminCommentReportsTab/AdminCommentReportsTab";

export default function AdminCommentDetail({ comment, onBack, onSave, onDelete }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("overview");
  const [commentState, setCommentState] = useState(comment || {});

  useScrollReveal(".reveal-card", [subTab]);

  if (!comment) return null;

  const handleToggleHide = () => {
    const nextStatus = commentState.status === "Hidden" ? "Published" : "Hidden";
    const updated = { ...commentState, status: nextStatus };
    setCommentState(updated);
    if (onSave) onSave(updated);
    toast.info(`Đã ${nextStatus === "Hidden" ? "ẩn" : "khôi phục hiển thị"} bình luận này`);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(commentState.id);
    toast.success("Đã xóa vĩnh viễn bình luận khỏi hệ thống", "Thành công");
  };

  const getStatusVariant = (status) => {
    if (status === "Published") return "success";
    if (status === "Hidden") return "warning";
    return "danger";
  };

  return (
    <div className={styles.container}>
      {/* 1. Comment Header Card */}
      <div className={`${styles.header_card} reveal-card`}>
        <div className={styles.author_main}>
          <img src={commentState.user?.avatar} alt={commentState.user?.name} className={styles.avatar_lg} />
          <div>
            <h2 className={styles.author_name}>{commentState.user?.name}</h2>
            <p className={styles.author_sub}>@{commentState.user?.username} • {commentState.date}</p>
            <div className={styles.badges_row}>
              <Badge variant="primary" size="sm">
                Type: {commentState.contentType}
              </Badge>
              <Badge variant={getStatusVariant(commentState.status)} size="sm">
                Status: {commentState.status}
              </Badge>
              <Badge variant={commentState.reportsCount > 0 ? "danger" : "secondary"} size="sm">
                Reports: {commentState.reportsCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Comments</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleToggleHide}>
            <Icon name={commentState.status === "Hidden" ? "Eye" : "EyeOff"} size={16} />
            <span>{commentState.status === "Hidden" ? "Restore Comment" : "Hide Comment"}</span>
          </Button>
          <Button variant="outline" size="sm" className={styles.danger_btn} onClick={handleDelete}>
            <Icon name="Trash2" size={16} />
            <span>Delete Comment</span>
          </Button>
        </div>
      </div>

      {/* 2. Sub-Tabs Bar */}
      <div className={`${styles.tabs_bar} reveal-card`}>
        {[
          { id: "overview", label: "Overview & Context", icon: "Info" },
          { id: "replies", label: `Replies (${(commentState.replies || []).length})`, icon: "CornerDownRight" },
          { id: "reports", label: `Reports Log (${(commentState.reports || []).length})`, icon: "ShieldAlert" },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab_item} ${isActive ? styles.tab_active : ""}`}
              onClick={() => setSubTab(tab.id)}
            >
              <Icon name={tab.icon} size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Tab Body */}
      <div className="reveal-card">
        {subTab === "overview" && <AdminCommentOverviewTab commentState={commentState} />}
        {subTab === "replies" && <AdminCommentRepliesTab commentState={commentState} />}
        {subTab === "reports" && <AdminCommentReportsTab commentState={commentState} />}
      </div>
    </div>
  );
}
