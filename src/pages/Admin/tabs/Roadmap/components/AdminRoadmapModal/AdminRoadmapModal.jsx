import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import styles from "../../../Course/components/AdminCourseModal/AdminCourseModal.module.css";

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner (Người mới)" },
  { value: "intermediate", label: "Intermediate (Trung cấp)" },
  { value: "advanced", label: "Advanced (Nâng cao)" },
];

export default function AdminRoadmapModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    duration: 1,
    description: "",
    thumbnail: "",
    level: "beginner",
    tags: "",
    labels: "",
    recommendedCourses: "",
    recommendedProblems: "",
  });

  // Quản lý mảng danh sách các bước (roadmap steps)
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        slug: "",
        duration: 1,
        description: "",
        thumbnail: "",
        level: "beginner",
        tags: "",
        labels: "",
        recommendedCourses: "",
        recommendedProblems: "",
      });
      setSteps([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Thêm 1 bước mới vào lộ trình
  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        stepName: "",
        stepDescription: "",
        tags: "",
        status: "incompleted",
      },
    ]);
  };

  // Cập nhật thông tin của bước
  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  // Xóa bước
  const handleRemoveStep = (index) => {
    const updatedSteps = steps
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setSteps(updatedSteps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) return;

    // Chuẩn hóa mảng các bước đúng với Roadmap Schema
    const formattedRoadmapSteps = steps.map((s, idx) => ({
      stepNumber: idx + 1,
      stepName: s.stepName.trim(),
      stepDescription: s.stepDescription.trim(),
      tags: s.tags ? s.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      status: s.status || "incompleted",
    }));

    // Chuẩn hóa dữ liệu đẩy lên API
    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim().toLowerCase(),
      duration: Number(formData.duration) || 1,
      description: formData.description.trim(),
      thumbnail: formData.thumbnail.trim(),
      level: formData.level,
      tags: formData.tags ? formData.tags.split(",").map((i) => i.trim()).filter(Boolean) : [],
      labels: formData.labels ? formData.labels.split(",").map((i) => i.trim()).filter(Boolean) : [],
      roadmap: formattedRoadmapSteps,
      recommendedCourses: formData.recommendedCourses
        ? formData.recommendedCourses.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      recommendedProblems: formData.recommendedProblems
        ? formData.recommendedProblems.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
    };

    onSave(payload);
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh", overflowY: "auto", width: "680px" }}
      >
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Map" size={20} className={styles.header_icon} />
            <h3>Thêm Lộ Trình Mới (Chuẩn Schema)</h3>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* 1. Thông tin cơ bản */}
          <FormField
            label="Tên lộ trình (Title) *"
            placeholder="VD: Lộ trình Fullstack Web Developer"
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
            label="Slug (Định danh URL) *"
            placeholder="VD: fullstack-web-developer"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />

          <div className={styles.form_group}>
            <label className={styles.label}>Mô tả lộ trình (Description) *</label>
            <textarea
              className={styles.textarea}
              placeholder="Nhập mô tả tổng quan lộ trình..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <FormField
            label="Ảnh Thumbnail URL *"
            placeholder="https://images.unsplash.com/..."
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            required
          />

          <div className={styles.row_grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <FormField
              label="Thời gian ước tính (Tháng) *"
              type="number"
              min={1}
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              required
            />

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
              label="Tags (Phân cách bởi dấu phẩy)"
              placeholder="react, nodejs, web"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            <FormField
              label="Labels (Phân cách bởi dấu phẩy)"
              placeholder="Hot, Frontend, Popular"
              value={formData.labels}
              onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
            />
          </div>

          {/* 2. Quản lý Danh sách các Bước (Roadmap Steps) */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <label className={styles.label} style={{ fontSize: "14px", fontWeight: "600", color: "#fff", margin: 0 }}>
                Các bước lộ trình (Roadmap Steps)
              </label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>
                <Icon name="Plus" size={14} />
                <span>Thêm bước</span>
              </Button>
            </div>

            {steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold", color: "#60a5fa" }}>
                    Bước #{step.stepNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
                <input
                  placeholder="Tên bước (VD: Học HTML/CSS cơ bản)"
                  value={step.stepName}
                  onChange={(e) => handleStepChange(idx, "stepName", e.target.value)}
                  style={{ padding: "8px", borderRadius: "4px", background: "var(--bg-input, #1a1d24)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  required
                />
                <input
                  placeholder="Mô tả bước..."
                  value={step.stepDescription}
                  onChange={(e) => handleStepChange(idx, "stepDescription", e.target.value)}
                  style={{ padding: "8px", borderRadius: "4px", background: "var(--bg-input, #1a1d24)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  required
                />
              </div>
            ))}
          </div>

          {/* 3. Gợi ý Course & Problem (Gắn ID) */}
          <div className={styles.row_grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <FormField
              label="Recommended Course IDs (Phân cách dấu phẩy)"
              placeholder="65e..., 65f..."
              value={formData.recommendedCourses}
              onChange={(e) => setFormData({ ...formData, recommendedCourses: e.target.value })}
            />
            <FormField
              label="Recommended Problem IDs (Phân cách dấu phẩy)"
              placeholder="65a..., 65b..."
              value={formData.recommendedProblems}
              onChange={(e) => setFormData({ ...formData, recommendedProblems: e.target.value })}
            />
          </div>

          {/* Modal Footer */}
          <div className={styles.modal_footer} style={{ marginTop: "16px" }}>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              Lưu Vào Database
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}