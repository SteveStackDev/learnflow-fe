import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import {
  FORM_BLOG_CATEGORY_OPTIONS,
  FORM_BLOG_STATUS_OPTIONS,
  BLOG_AUTHOR_OPTIONS,
} from "~/constants/mockAdminBlog";
import styles from "./AdminBlogModal.module.css";

export default function AdminBlogModal({ isOpen, onClose, onSave, blog }) {
  const isEdit = Boolean(blog && blog.id);

  const [formData, setFormData] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    cover: blog?.cover || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    category: blog?.category || "Tutorial",
    author: blog?.author || "Michael Steve",
    status: blog?.status || "Draft",
    tags: blog?.tags || "ReactJS, WebDev",
    content: blog?.content || "Nội dung bài viết...",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const authorOptions = BLOG_AUTHOR_OPTIONS.filter((a) => a.value !== "all");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {isEdit ? "Edit Blog Article" : "Create New Blog Article"}
          </h3>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <FormField
              label="Article Title"
              placeholder="e.g. Master ReactJS 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <FormField
              label="URL Slug"
              placeholder="e.g. master-reactjs-2026"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />

            <div className={styles.grid_2col}>
              <div className={styles.form_group}>
                <label className={styles.label}>Category</label>
                <DropdownMenu
                  options={FORM_BLOG_CATEGORY_OPTIONS}
                  value={formData.category}
                  onChange={(val) => setFormData({ ...formData, category: val })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>Author</label>
                <DropdownMenu
                  options={authorOptions}
                  value={formData.author}
                  onChange={(val) => setFormData({ ...formData, author: val })}
                />
              </div>
            </div>

            <FormField
              label="Cover Image URL"
              placeholder="https://..."
              value={formData.cover}
              onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
            />

            <div className={styles.form_group}>
              <label className={styles.label}>Status</label>
              <DropdownMenu
                options={FORM_BLOG_STATUS_OPTIONS}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <Icon name="Check" size={16} />
              <span>{isEdit ? "Save Changes" : "Create Article"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
