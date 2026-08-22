import React from "react";
import Icon from "~/components/Icon/Icon";
import { FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_BLOG_CATEGORY_OPTIONS,
  FORM_BLOG_STATUS_OPTIONS,
  BLOG_AUTHOR_OPTIONS,
} from "~/constants/mockAdminBlog";
import styles from "./AdminBlogEditorTab.module.css";

export default function AdminBlogEditorTab({ blogState, setBlogState }) {
  const authorOptions = BLOG_AUTHOR_OPTIONS.filter((a) => a.value !== "all");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 1. Blog Basic Metadata */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="FileText" size={18} /> Basic Article Metadata
        </h3>

        <div className={styles.grid_2col}>
          <FormField
            label="Article Title"
            value={blogState.title || ""}
            onChange={(e) => setBlogState({ ...blogState, title: e.target.value })}
            placeholder="e.g. Master ReactJS 2026"
            required
          />
          <FormField
            label="URL Slug"
            value={blogState.slug || ""}
            onChange={(e) => setBlogState({ ...blogState, slug: e.target.value })}
            placeholder="master-reactjs-2026"
            required
          />
        </div>

        <FormField
          label="Cover Image URL"
          value={blogState.cover || ""}
          onChange={(e) => setBlogState({ ...blogState, cover: e.target.value })}
          placeholder="https://..."
        />

        <div className={styles.grid_3col}>
          <div className={styles.form_group}>
            <label className={styles.label}>Category</label>
            <DropdownMenu
              options={FORM_BLOG_CATEGORY_OPTIONS}
              value={blogState.category || "Tutorial"}
              onChange={(val) => setBlogState({ ...blogState, category: val })}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Author</label>
            <DropdownMenu
              options={authorOptions}
              value={blogState.author || "Michael Steve"}
              onChange={(val) => setBlogState({ ...blogState, author: val })}
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Status</label>
            <DropdownMenu
              options={FORM_BLOG_STATUS_OPTIONS}
              value={blogState.status || "Published"}
              onChange={(val) => setBlogState({ ...blogState, status: val })}
            />
          </div>
        </div>

        <FormField
          label="Tags (Comma-separated)"
          value={blogState.tags || ""}
          onChange={(e) => setBlogState({ ...blogState, tags: e.target.value })}
          placeholder="ReactJS, WebDev, Tutorial"
        />
      </div>

      {/* 2. Rich Text Editor Box */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Edit3" size={18} /> Rich Text Article Content
        </h3>

        <div className={styles.form_group}>
          <div className={styles.editor_toolbar}>
            <button type="button" className={styles.editor_tool_btn} title="Bold">B</button>
            <button type="button" className={styles.editor_tool_btn} title="Italic">I</button>
            <button type="button" className={styles.editor_tool_btn} title="Underline">U</button>
            <div style={{ width: 1, height: 18, backgroundColor: "rgba(169, 183, 203, 0.4)", margin: "0 4px" }} />
            <button type="button" className={styles.editor_tool_btn} title="Heading">H1</button>
            <button type="button" className={styles.editor_tool_btn} title="Heading 2">H2</button>
            <button type="button" className={styles.editor_tool_btn} title="Quote">”</button>
            <button type="button" className={styles.editor_tool_btn} title="Code Block">{"</>"}</button>
          </div>
          <textarea
            className={styles.rich_textarea}
            rows={14}
            value={blogState.content || ""}
            onChange={(e) => setBlogState({ ...blogState, content: e.target.value })}
            placeholder="Nhập nội dung bài viết bằng Markdown hoặc Rich Text..."
          />
        </div>
      </div>
    </div>
  );
}
