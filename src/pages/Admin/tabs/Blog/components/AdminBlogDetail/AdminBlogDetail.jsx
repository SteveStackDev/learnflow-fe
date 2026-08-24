import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminBlogDetail.module.css";

import AdminBlogEditorTab from "../AdminBlogEditorTab/AdminBlogEditorTab";
import AdminBlogSeoTab from "../AdminBlogSeoTab/AdminBlogSeoTab";
import AdminBlogStatisticsTab from "../AdminBlogStatisticsTab/AdminBlogStatisticsTab";

export default function AdminBlogDetail({ blog, onBack, onSave }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("editor"); // editor | seo | statistics
  const [blogState, setBlogState] = useState(blog || {});

  useScrollReveal(".reveal-card", [subTab]);

  if (!blog) return null;

  const handleSaveDraft = () => {
    const updated = { ...blogState, status: "Draft" };
    setBlogState(updated);
    if (onSave) onSave(updated);
    toast.info(`Đã lưu bản nháp bài viết "${updated.title}"`, "Bản nháp");
  };

  const handlePublish = () => {
    const updated = { ...blogState, status: "Published" };
    setBlogState(updated);
    if (onSave) onSave(updated);
    toast.success(`Đã xuất bản bài viết "${updated.title}" lên website FySet`, "Thành công");
  };

  const handlePreview = () => {
    toast.info("Đang mở chế độ xem trước (Preview Mode)...");
  };

  return (
    <div className={styles.container}>
      {/* 1. Header Bar */}
      <div className={`${styles.header_bar} reveal-card`}>
        <div className={styles.left_wrap}>
          <button type="button" className={styles.back_btn} onClick={onBack}>
            <Icon name="ArrowLeft" size={18} />
            <span>Back to Blogs</span>
          </button>
          <h2 className={styles.detail_title}>BLOG EDITOR: {blogState.title}</h2>
          <Badge variant={blogState.status === "Published" ? "success" : "warning"} size="sm">
            {blogState.status}
          </Badge>
        </div>

        <div className={styles.header_actions}>
          <Button variant="outline" size="sm" onClick={handleSaveDraft}>
            <Icon name="Save" size={16} />
            <span>Save Draft</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handlePreview}>
            <Icon name="Eye" size={16} />
            <span>Preview</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handlePublish}>
            <Icon name="Send" size={16} />
            <span>Publish Article</span>
          </Button>
        </div>
      </div>

      {/* 2. Sub-Tabs Bar */}
      <div className={`${styles.tabs_bar} reveal-card`}>
        {[
          { id: "editor", label: "Blog Content & Metadata", icon: "FileText" },
          { id: "seo", label: "SEO Settings & Preview", icon: "Globe" },
          { id: "statistics", label: "Engagement Statistics", icon: "BarChart2" },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab_item} ${isActive ? styles.tab_active : ""}`}
              onClick={() => setSubTab(tab.id)}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Tab Body */}
      <div className="reveal-card">
        {subTab === "editor" && <AdminBlogEditorTab blogState={blogState} setBlogState={setBlogState} />}
        {subTab === "seo" && <AdminBlogSeoTab blogState={blogState} setBlogState={setBlogState} />}
        {subTab === "statistics" && <AdminBlogStatisticsTab blogState={blogState} />}
      </div>
    </div>
  );
}
