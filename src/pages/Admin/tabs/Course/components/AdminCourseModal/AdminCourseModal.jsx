import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import styles from "./AdminCourseModal.module.css";

const CATEGORY_OPTIONS = [
  { value: "Lập trình Web", label: "Lập trình Web" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "Data Science & AI", label: "Data Science & AI" },
  { value: "Lập trình Mobile", label: "Lập trình Mobile" },
];

const LEVEL_OPTIONS = [
  { value: "Basic", label: "Basic (Cơ bản)" },
  { value: "Medium", label: "Medium (Trung cấp)" },
  { value: "Advanced", label: "Advanced (Nâng cao)" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active (Đang xuất bản)" },
  { value: "Draft", label: "Draft (Bản nháp)" },
  { value: "Archived", label: "Archived (Lưu trữ)" },
];

export default function AdminCourseModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Lập trình Web",
    level: "Basic",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=80",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "Lập trình Web",
        level: initialData.level || "Basic",
        thumbnail: initialData.thumbnail || "",
        status: initialData.status || "Active",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "Lập trình Web",
        level: "Basic",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=80",
        status: "Active",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Book" size={20} className={styles.header_icon} />
            <h3>{initialData ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}</h3>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body}>
          <FormField
            label="Tên khóa học"
            placeholder="Nhập tên khóa học (vd: React Fundamentals)..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className={styles.form_group}>
            <label className={styles.label}>Mô tả ngắn</label>
            <textarea
              className={styles.textarea}
              placeholder="Mô tả tóm tắt về nội dung và mục tiêu khóa học..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className={styles.row_grid}>
            <div className={styles.form_group}>
              <label className={styles.label}>Danh mục (Category)</label>
              <DropdownMenu
                options={CATEGORY_OPTIONS}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Cấp độ (Level)</label>
              <DropdownMenu
                options={LEVEL_OPTIONS}
                value={formData.level}
                onChange={(val) => setFormData({ ...formData, level: val })}
              />
            </div>
          </div>

          <div className={styles.row_grid}>
            <FormField
              label="Ảnh Thumbnail URL"
              placeholder="https://..."
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />

            <div className={styles.form_group}>
              <label className={styles.label}>Trạng thái (Status)</label>
              <DropdownMenu
                options={STATUS_OPTIONS}
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
            </div>
          </div>

          <div className={styles.modal_footer}>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              {initialData ? "Lưu thay đổi" : "Tạo khóa học"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
