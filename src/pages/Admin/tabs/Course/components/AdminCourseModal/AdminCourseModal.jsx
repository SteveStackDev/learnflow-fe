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
  { value: "beginner", label: "Beginner (Người mới)" },
  { value: "intermediate", label: "Intermediate (Trung cấp)" },
  { value: "advanced", label: "Advanced (Nâng cao)" },
];

export default function AdminCourseModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    promoVideoUrl: "",
    benefits: "",
    requirements: "",
    category: "Lập trình Web",
    tags: "",
    price: 0,
    salePrice: 0,
    lessonsCount: 0,
    durationHours: 0,
    level: "beginner",
    isPublished: true,
    isFree: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || "",
        promoVideoUrl: initialData.promoVideoUrl || "",
        benefits: Array.isArray(initialData.benefits) ? initialData.benefits.join(", ") : "",
        requirements: Array.isArray(initialData.requirements) ? initialData.requirements.join(", ") : "",
        category: initialData.category || "Lập trình Web",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
        price: initialData.price || 0,
        salePrice: initialData.salePrice || 0,
        lessonsCount: initialData.stats?.lessons || 0,
        durationHours: initialData.stats?.duration || 0,
        level: initialData.level || "beginner",
        isPublished: initialData.isPublished ?? true,
        isFree: initialData.isFree ?? false,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        thumbnail: "",
        promoVideoUrl: "",
        benefits: "",
        requirements: "",
        category: "Lập trình Web",
        tags: "",
        price: 0,
        salePrice: 0,
        lessonsCount: 0,
        durationHours: 0,
        level: "beginner",
        isPublished: true,
        isFree: false,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) return;

    // Mapping sang đúng cấu trúc Course Mongoose Schema
    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim().toLowerCase(),
      description: formData.description.trim(),
      thumbnail: formData.thumbnail.trim(),
      promoVideoUrl: formData.promoVideoUrl.trim(),
      benefits: formData.benefits
        ? formData.benefits.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      requirements: formData.requirements
        ? formData.requirements.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      category: formData.category,
      tags: formData.tags
        ? formData.tags.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      price: formData.isFree ? 0 : Number(formData.price) || 0,
      salePrice: formData.isFree ? 0 : Number(formData.salePrice) || 0,
      stats: {
        lessons: Number(formData.lessonsCount) || 0,
        duration: Number(formData.durationHours) || 0,
        learners: initialData?.stats?.learners || 0,
        rating: initialData?.stats?.rating || 5.0,
      },
      level: formData.level,
      isPublished: formData.isPublished,
      isFree: formData.isFree,
    };

    onSave(payload);
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh", overflowY: "auto", width: "620px" }}
      >
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Book" size={20} className={styles.header_icon} />
            <h3>{initialData ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}</h3>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.modal_body}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <FormField
            label="Tên khóa học (Title) *"
            placeholder="VD: Lập trình ReactJS từ cơ bản đến nâng cao"
            value={formData.title}
            onChange={(e) => {
              const val = e.target.value;
              setFormData({
                ...formData,
                title: val,
                slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
              });
            }}
            required
          />

          <FormField
            label="Slug (URL)"
            placeholder="lap-trinh-reactjs"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />

          <div className={styles.form_group}>
            <label className={styles.label}>Mô tả khóa học *</label>
            <textarea
              className={styles.textarea}
              placeholder="Nhập mô tả tổng quan khóa học..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <FormField
            label="Ảnh Thumbnail URL *"
            placeholder="https://..."
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            required
          />

          <FormField
            label="Promo Video URL *"
            placeholder="https://..."
            value={formData.promoVideoUrl}
            onChange={(e) => setFormData({ ...formData, promoVideoUrl: e.target.value })}
            required
          />

          <div className={styles.form_group}>
            <label className={styles.label}>Benefits (Quyền lợi - cách nhau bởi dấu phẩy) *</label>
            <textarea
              className={styles.textarea}
              placeholder="Hiểu sâu React, Xây dựng dự án thực tế, ..."
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className={styles.form_group}>
            <label className={styles.label}>Requirements (Yêu cầu đầu vào - cách nhau bởi dấu phẩy) *</label>
            <textarea
              className={styles.textarea}
              placeholder="Cần biết HTML, CSS, JavaScript cơ bản"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              rows={2}
              required
            />
          </div>

          <FormField
            label="Tags (cách nhau bởi dấu phẩy)"
            placeholder="react, web, frontend"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />

          <div className={styles.row_grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className={styles.form_group}>
              <label className={styles.label}>Danh mục (Category) *</label>
              <DropdownMenu
                options={CATEGORY_OPTIONS}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.label}>Cấp độ (Level) *</label>
              <DropdownMenu
                options={LEVEL_OPTIONS}
                value={formData.level}
                onChange={(val) => setFormData({ ...formData, level: val })}
              />
            </div>
          </div>

          <div className={styles.row_grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <FormField
              label="Tổng số bài học (Lessons)"
              type="number"
              min={0}
              value={formData.lessonsCount}
              onChange={(e) => setFormData({ ...formData, lessonsCount: Number(e.target.value) })}
              required
            />
            <FormField
              label="Tổng thời lượng (Giờ)"
              type="number"
              min={0}
              value={formData.durationHours}
              onChange={(e) => setFormData({ ...formData, durationHours: Number(e.target.value) })}
              required
            />
          </div>

          {!formData.isFree && (
            <div className={styles.row_grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <FormField
                label="Giá gốc (VNĐ)"
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
              <FormField
                label="Giá khuyến mãi (VNĐ)"
                type="number"
                min={0}
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              />
            </div>
          )}

          <div style={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "8px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              />
              Xuất bản (Published)
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.isFree}
                onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              />
              Miễn phí (Free)
            </label>
          </div>

          <div className={styles.modal_footer} style={{ marginTop: "16px" }}>
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