import React from "react";
import Icon from "~/components/Icon/Icon";
import { FormField } from "~/components/ui";
import styles from "./AdminBlogSeoTab.module.css";

export default function AdminBlogSeoTab({ blogState, setBlogState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* 1. SEO Configuration */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Globe" size={18} /> Search Engine Optimization (SEO)
        </h3>

        <FormField
          label="Meta Title Tag"
          value={blogState.seoTitle || ""}
          onChange={(e) => setBlogState({ ...blogState, seoTitle: e.target.value })}
          placeholder="e.g. Master ReactJS 2026 | FySet"
        />

        <div className={styles.form_group}>
          <label className={styles.label}>Meta Description</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={blogState.seoDescription || ""}
            onChange={(e) => setBlogState({ ...blogState, seoDescription: e.target.value })}
            placeholder="Mô tả ngắn hiển thị trên kết quả tìm kiếm Google..."
          />
        </div>
      </div>

      {/* 2. Google Search Snippet Live Preview */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>
          <Icon name="Search" size={18} /> Google Search Results Preview
        </h3>

        <div className={styles.snippet_preview}>
          <span className={styles.snippet_url}>https://fyset.vn/blog/{blogState.slug || "bai-viet"}</span>
          <div className={styles.snippet_title}>
            {blogState.seoTitle || blogState.title || "Tiêu đề bài viết - FySet"}
          </div>
          <p className={styles.snippet_desc}>
            {blogState.seoDescription || "Nhập mô tả SEO để hiển thị kết quả trực quan chuẩn Google Search..."}
          </p>
        </div>
      </div>
    </div>
  );
}
