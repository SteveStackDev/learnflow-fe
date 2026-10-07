import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "../../../Course/components/AdminCourseModal/AdminCourseModal.module.css";

const DRAFT_STORAGE_KEY = "fyset_admin_roadmap_draft_v1";

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner (Người mới / Cơ bản)" },
  { value: "intermediate", label: "Intermediate (Trung cấp)" },
  { value: "advanced", label: "Advanced (Nâng cao)" },
];

const STEP_STATUS_OPTIONS = [
  { value: "incompleted", label: "Chưa hoàn thành" },
  { value: "in_progress", label: "Đang học" },
  { value: "completed", label: "Đã hoàn thành" },
];

export default function AdminRoadmapModal({ isOpen, onClose, onSave, initialData }) {
  const { toast } = useToast();
  const [hasDraft, setHasDraft] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    duration: 3,
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
    if (!isOpen) return;

    if (initialData) {
      setHasDraft(false);
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        duration: initialData.duration || 3,
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || "",
        level:
          initialData.level?.toLowerCase() === "cơ bản" || initialData.level?.toLowerCase() === "beginner"
            ? "beginner"
            : initialData.level?.toLowerCase() === "trung cấp" || initialData.level?.toLowerCase() === "intermediate"
            ? "intermediate"
            : initialData.level?.toLowerCase() === "nâng cao" || initialData.level?.toLowerCase() === "advanced"
            ? "advanced"
            : "beginner",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
        labels: Array.isArray(initialData.labels) ? initialData.labels.join(", ") : initialData.labels || "",
        recommendedCourses: Array.isArray(initialData.recommendedCourses)
          ? initialData.recommendedCourses.map((c) => (typeof c === "object" ? c?._id || c?.id : c)).join(", ")
          : "",
        recommendedProblems: Array.isArray(initialData.recommendedProblems)
          ? initialData.recommendedProblems.map((p) => (typeof p === "object" ? p?._id || p?.id : p)).join(", ")
          : "",
      });

      if (Array.isArray(initialData.roadmap) && initialData.roadmap.length > 0) {
        setSteps(
          initialData.roadmap.map((s, idx) => ({
            stepNumber: s.stepNumber || idx + 1,
            stepName: s.stepName || "",
            stepDescription: s.stepDescription || "",
            tags: Array.isArray(s.tags) ? s.tags.join(", ") : s.tags || "",
            status: s.status || "incompleted",
          }))
        );
      } else {
        setSteps([
          {
            stepNumber: 1,
            stepName: "Nền tảng cơ bản",
            stepDescription: "Làm quen với các khái niệm căn bản",
            tags: "basic, fundamentals",
            status: "incompleted",
          },
        ]);
      }
    } else {
      // Đang tạo mới -> Thử đọc từ localStorage Draft
      let restored = false;
      try {
        const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.formData) {
            setFormData(parsed.formData);
            if (Array.isArray(parsed.steps) && parsed.steps.length > 0) {
              setSteps(parsed.steps);
            }
            setHasDraft(true);
            restored = true;
          }
        }
      } catch (err) {
        console.warn("[AdminRoadmapModal] Lỗi đọc draft:", err);
      }

      if (!restored) {
        setFormData({
          title: "",
          slug: "",
          duration: 3,
          description: "",
          thumbnail: "",
          level: "beginner",
          tags: "",
          labels: "",
          recommendedCourses: "",
          recommendedProblems: "",
        });
        setSteps([
          {
            stepNumber: 1,
            stepName: "Bước 1: Nền tảng cốt lõi",
            stepDescription: "Nắm vững các khái niệm và kỹ năng nền tảng cơ bản",
            tags: "core, fundamentals",
            status: "incompleted",
          },
        ]);
        setHasDraft(false);
      }
    }
  }, [initialData, isOpen]);

  // Tự động lưu nháp
  useEffect(() => {
    if (!isOpen || initialData) return;

    const hasContent = Boolean(
      (formData.title && formData.title.trim()) ||
      (formData.description && formData.description.trim()) ||
      steps.some((s) => s.stepName || s.stepDescription)
    );

    if (!hasContent) return;

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({
            formData,
            steps,
            savedAt: Date.now(),
          })
        );
        setHasDraft(true);
      } catch (err) {
        console.warn("[AdminRoadmapModal] Lỗi lưu draft:", err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, steps, isOpen, initialData]);

  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // bỏ qua
    }
    setFormData({
      title: "",
      slug: "",
      duration: 3,
      description: "",
      thumbnail: "",
      level: "beginner",
      tags: "",
      labels: "",
      recommendedCourses: "",
      recommendedProblems: "",
    });
    setSteps([
      {
        stepNumber: 1,
        stepName: "Bước 1: Nền tảng cốt lõi",
        stepDescription: "Nắm vững các khái niệm và kỹ năng nền tảng cơ bản",
        tags: "core, fundamentals",
        status: "incompleted",
      },
    ]);
    setHasDraft(false);
    toast?.info("Đã xóa bản nháp và làm mới form lộ trình!", "Làm mới");
  };

  if (!isOpen) return null;

  // Tự động tạo slug chuẩn SEO từ tên lộ trình
  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: initialData ? prev.slug : generatedSlug,
    }));
  };

  // Thêm 1 bước mới vào lộ trình
  const handleAddStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        stepNumber: prev.length + 1,
        stepName: `Bước ${prev.length + 1}: Chuyên đề mới`,
        stepDescription: "Mô tả nội dung và mục tiêu học tập của bước này...",
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
    if (!formData.title.trim()) return;

    // Chuẩn hóa Slug
    const finalSlug = (
      formData.slug.trim() ||
      formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    ).toLowerCase();

    // Chuẩn hóa mảng các bước đúng với Roadmap Schema
    const formattedRoadmapSteps = steps.map((s, idx) => ({
      stepNumber: idx + 1,
      stepName: s.stepName?.trim() || `Bước ${idx + 1}`,
      stepDescription: s.stepDescription?.trim() || "Mô tả chi tiết bước học",
      tags: s.tags
        ? s.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      status: s.status || "incompleted",
    }));

    const isValidHexId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    // Chuẩn hóa dữ liệu đẩy lên API
    const payload = {
      title: formData.title.trim(),
      slug: finalSlug,
      duration: Number(formData.duration) || 1,
      description: formData.description.trim() || "Mô tả chi tiết lộ trình học tập",
      thumbnail:
        formData.thumbnail.trim() ||
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      level: formData.level,
      tags: formData.tags ? formData.tags.split(",").map((i) => i.trim()).filter(Boolean) : [],
      labels: formData.labels ? formData.labels.split(",").map((i) => i.trim()).filter(Boolean) : [],
      roadmap: formattedRoadmapSteps,
      recommendedCourses: formData.recommendedCourses
        ? formData.recommendedCourses.split(",").map((i) => i.trim()).filter(isValidHexId)
        : [],
      recommendedProblems: formData.recommendedProblems
        ? formData.recommendedProblems.split(",").map((i) => i.trim()).filter(isValidHexId)
        : [],
    };

    if (!initialData) {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // bỏ qua
      }
      setHasDraft(false);
    }

    onSave(payload);
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        {/* Header */}
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Map" size={20} className={styles.header_icon} />
            <div>
              <h3 className={styles.title_text}>
                {initialData ? "Chỉnh Sửa Lộ Trình" : "Thêm Lộ Trình Mới"}
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "var(--theme-text-secondary, #64748b)" }}>
                Tổng số: <b>{steps.length}</b> giai đoạn học tập (~<b>{formData.duration || 1}</b> tháng)
              </p>
            </div>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose} title="Đóng">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Auto-save Draft Bar */}
        {!initialData && (
          <div className={styles.draft_bar}>
            <div className={styles.draft_info}>
              <Icon name="Save" size={14} />
              <span>
                {hasDraft
                  ? "Tự động lưu bản nháp: Dữ liệu lộ trình sẽ được giữ nguyên khi bạn tải lại"
                  : "Hệ thống tự động lưu bản nháp lộ trình khi bạn nhập"}
              </span>
            </div>
            {hasDraft && (
              <button
                type="button"
                className={styles.draft_clear_btn}
                onClick={handleClearDraft}
                title="Xóa dữ liệu nháp và làm mới"
              >
                <Icon name="Trash2" size={12} />
                <span>Xóa bản nháp</span>
              </button>
            )}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className={styles.modal_form}>
          <div className={styles.modal_body}>
            {/* Section 1: Thông tin cơ bản */}
            <div className={styles.form_section}>
              <div className={styles.section_title}>
                <Icon name="Info" size={16} />
                <span>1. Thông tin chung lộ trình</span>
              </div>

              <FormField
                label="Tên lộ trình (Title) *"
                placeholder="VD: Lộ trình Fullstack Web Developer từ Zero đến Hero"
                value={formData.title}
                onChange={handleTitleChange}
                required
              />

              <div className={styles.row_grid}>
                <FormField
                  label="Slug (Định danh URL) *"
                  placeholder="fullstack-web-developer"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />

                <div className={styles.form_group}>
                  <label className={styles.label}>
                    Cấp độ (Level) <span className={styles.required_star}>*</span>
                  </label>
                  <DropdownMenu
                    options={LEVEL_OPTIONS}
                    value={formData.level}
                    onChange={(val) => setFormData({ ...formData, level: val })}
                  />
                </div>
              </div>

              <div className={styles.row_grid}>
                <FormField
                  label="Thời gian ước tính (Tháng) *"
                  type="number"
                  min={1}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  required
                />

                <FormField
                  label="Ảnh Thumbnail URL *"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  required
                />
              </div>

              <div className={styles.row_grid}>
                <FormField
                  label="Thẻ Tags (Phân cách bởi dấu phẩy)"
                  placeholder="react, nodejs, web, fullstack"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />

                <FormField
                  label="Nhãn nổi bật Labels (Phân cách bởi dấu phẩy)"
                  placeholder="Hot, Frontend, Trending, Phổ biến"
                  value={formData.labels}
                  onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label className={styles.label}>
                  Mô tả lộ trình (Description) <span className={styles.required_star}>*</span>
                </label>
                <textarea
                  className={styles.textarea}
                  placeholder="Nhập mô tả định hướng mục tiêu và kiến thức sẽ đạt được trong lộ trình..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Section 2: Quản lý các bước trong lộ trình */}
            <div className={styles.form_section}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className={styles.section_title} style={{ margin: 0 }}>
                  <Icon name="List" size={16} />
                  <span>2. Các bước lộ trình (Roadmap Steps)</span>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>
                  <Icon name="Plus" size={14} />
                  <span>Thêm bước</span>
                </Button>
              </div>

              {steps.length === 0 ? (
                <p style={{ fontSize: "0.85rem", color: "var(--theme-text-secondary, #64748b)", fontStyle: "italic", margin: "4px 0" }}>
                  Chưa có bước nào. Hãy nhấn &quot;Thêm bước&quot; để thiết lập các giai đoạn học.
                </p>
              ) : (
                steps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--color-bg-secondary, rgba(0, 0, 0, 0.03))",
                      padding: "14px",
                      borderRadius: "12px",
                      border: "1px solid var(--theme-border-color, rgba(169, 183, 203, 0.2))",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: "800", color: "var(--color-primary, #0950c3)" }}>
                        Giai đoạn #{step.stepNumber}
                      </span>
                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.8rem",
                            padding: "4px 8px",
                            borderRadius: "6px",
                          }}
                          title="Xóa bước này"
                        >
                          <Icon name="Trash2" size={14} />
                          <span>Xóa bước</span>
                        </button>
                      )}
                    </div>

                    <div className={styles.row_grid}>
                      <input
                        className={styles.textarea}
                        placeholder="Tên bước (VD: 1. Nền tảng HTML, CSS và JavaScript)"
                        value={step.stepName}
                        onChange={(e) => handleStepChange(idx, "stepName", e.target.value)}
                        required
                      />

                      <div className={styles.form_group}>
                        <DropdownMenu
                          options={STEP_STATUS_OPTIONS}
                          value={step.status || "incompleted"}
                          onChange={(val) => handleStepChange(idx, "status", val)}
                        />
                      </div>
                    </div>

                    <textarea
                      className={styles.textarea}
                      placeholder="Mô tả chi tiết nội dung và yêu cầu hoàn thành của bước này..."
                      value={step.stepDescription}
                      onChange={(e) => handleStepChange(idx, "stepDescription", e.target.value)}
                      rows={2}
                      required
                    />

                    <input
                      className={styles.textarea}
                      placeholder="Tags của bước (cách nhau bởi dấu phẩy, vd: html, css, flexbox)"
                      value={step.tags}
                      onChange={(e) => handleStepChange(idx, "tags", e.target.value)}
                    />
                  </div>
                ))
              )}
            </div>

            {/* Section 3: Gợi ý khóa học & Bài tập liên quan */}
            <div className={styles.form_section}>
              <div className={styles.section_title}>
                <Icon name="Link" size={16} />
                <span>3. Gợi ý Khóa học & Bài tập (Tùy chọn)</span>
              </div>

              <div className={styles.row_grid}>
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
            </div>
          </div>

          {/* Footer */}
          <div className={styles.modal_footer}>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button type="submit" variant="primary">
              <Icon name={initialData ? "Save" : "Plus"} size={16} />
              <span>{initialData ? "Lưu Thay Đổi Vào Database" : "Tạo Lộ Trình & Lưu Database"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}