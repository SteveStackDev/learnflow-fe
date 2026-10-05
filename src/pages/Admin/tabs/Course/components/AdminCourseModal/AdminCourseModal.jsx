import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { Button, FormField, DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./AdminCourseModal.module.css";

const DRAFT_STORAGE_KEY = "fyset_admin_course_draft_v1";

const CATEGORY_OPTIONS = [
  { value: "Lập trình Web", label: "Lập trình Web" },
  { value: "Frontend Development", label: "Frontend Development" },
  { value: "Backend Development", label: "Backend Development" },
  { value: "Fullstack Development", label: "Fullstack Development" },
  { value: "Data Science & AI", label: "Data Science & AI" },
  { value: "Lập trình Mobile", label: "Lập trình Mobile" },
  { value: "Competitive Programming", label: "Competitive Programming" },
];

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner (Người mới / Cơ bản)" },
  { value: "intermediate", label: "Intermediate (Trung cấp)" },
  { value: "advanced", label: "Advanced (Nâng cao)" },
];

export default function AdminCourseModal({ isOpen, onClose, onSave, initialData }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1); // 1: Course Info | 2: Chapters & Lessons
  const [hasDraft, setHasDraft] = useState(false);

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
    lessonsCount: 1,
    durationHours: 1,
    level: "beginner",
    isPublished: true,
    isFree: false,
  });

  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Chương 1: Bắt đầu",
      order: 1,
      lessons: [
        {
          id: 1,
          title: "Lời khuyên trước khóa học",
          videoUrl: "",
          duration: 10,
          description: "Giới thiệu tổng quan lộ trình và phương pháp học hiệu quả.",
          isPreview: false,
        },
      ],
    },
  ]);

  // 1. Khôi phục dữ liệu từ initialData (nếu Sửa) hoặc localStorage Draft (nếu Tạo mới)
  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(1);

    if (initialData) {
      setHasDraft(false);
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || initialData.imageUrl || "",
        promoVideoUrl: initialData.promoVideoUrl || "",
        benefits: Array.isArray(initialData.benefits)
          ? initialData.benefits.join(", ")
          : initialData.benefits || "",
        requirements: Array.isArray(initialData.requirements)
          ? initialData.requirements.join(", ")
          : initialData.requirements || "",
        category: initialData.category || "Lập trình Web",
        tags: Array.isArray(initialData.tags)
          ? initialData.tags.join(", ")
          : initialData.tags || "",
        price: initialData.price || 0,
        salePrice: initialData.salePrice || 0,
        lessonsCount: initialData.stats?.lessons ?? initialData.lessonsCount ?? 1,
        durationHours: initialData.stats?.duration ?? initialData.durationHours ?? 1,
        level:
          initialData.level?.toLowerCase() === "cơ bản" || initialData.level?.toLowerCase() === "beginner"
            ? "beginner"
            : initialData.level?.toLowerCase() === "trung cấp" || initialData.level?.toLowerCase() === "intermediate"
            ? "intermediate"
            : initialData.level?.toLowerCase() === "nâng cao" || initialData.level?.toLowerCase() === "advanced"
            ? "advanced"
            : "beginner",
        isPublished: initialData.isPublished ?? true,
        isFree: initialData.isFree ?? false,
      });

      if (Array.isArray(initialData.chapters) && initialData.chapters.length > 0) {
        setChapters(
          initialData.chapters.map((ch, cIdx) => ({
            id: ch.id || ch.chapterId || cIdx + 1,
            title: ch.title || `Chương ${cIdx + 1}`,
            order: ch.order || cIdx + 1,
            lessons: Array.isArray(ch.lessons) && ch.lessons.length > 0
              ? ch.lessons.map((ls, lIdx) => ({
                  id: ls.id || ls.lessonId || lIdx + 1,
                  title: ls.title || `Bài học ${lIdx + 1}`,
                  videoUrl: ls.videoUrl || "",
                  duration: ls.duration || 10,
                  description: ls.description || "",
                  isPreview: Boolean(ls.isPreview),
                }))
              : [
                  {
                    id: 1,
                    title: `Bài học 1`,
                    videoUrl: "",
                    duration: 10,
                    description: "",
                    isPreview: false,
                  },
                ],
          }))
        );
      } else {
        setChapters([
          {
            id: 1,
            title: "Chương 1: Bắt đầu",
            order: 1,
            lessons: [
              {
                id: 1,
                title: "Lời khuyên trước khóa học",
                videoUrl: "",
                duration: 10,
                description: "Giới thiệu tổng quan lộ trình và phương pháp học hiệu quả.",
                isPreview: false,
              },
            ],
          },
        ]);
      }
    } else {
      // Đang tạo mới -> Thử nạp từ bản nháp
      let restored = false;
      try {
        const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed && parsed.formData) {
            setFormData(parsed.formData);
            if (Array.isArray(parsed.chapters) && parsed.chapters.length > 0) {
              setChapters(parsed.chapters);
            }
            setHasDraft(true);
            restored = true;
          }
        }
      } catch (err) {
        console.warn("[AdminCourseModal] Lỗi đọc draft:", err);
      }

      if (!restored) {
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
          lessonsCount: 1,
          durationHours: 1,
          level: "beginner",
          isPublished: true,
          isFree: false,
        });
        setChapters([
          {
            id: 1,
            title: "Chương 1: Bắt đầu",
            order: 1,
            lessons: [
              {
                id: 1,
                title: "Lời khuyên trước khóa học",
                videoUrl: "",
                duration: 10,
                description: "Giới thiệu tổng quan lộ trình và phương pháp học hiệu quả.",
                isPreview: false,
              },
            ],
          },
        ]);
        setHasDraft(false);
      }
    }
  }, [initialData, isOpen]);

  // 2. Tự động lưu bản nháp vào localStorage (Autosave debounced)
  useEffect(() => {
    if (!isOpen || initialData) return;

    const hasContent = Boolean(
      (formData.title && formData.title.trim()) ||
      (formData.description && formData.description.trim()) ||
      (formData.thumbnail && formData.thumbnail.trim()) ||
      chapters.some((c) => c.lessons && c.lessons.some((l) => l.title || l.videoUrl))
    );

    if (!hasContent) return;

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({
            formData,
            chapters,
            savedAt: Date.now(),
          })
        );
        setHasDraft(true);
      } catch (err) {
        console.warn("[AdminCourseModal] Lỗi lưu draft:", err);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, chapters, isOpen, initialData]);

  // Xóa bản nháp làm mới
  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // bỏ qua
    }
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
      lessonsCount: 1,
      durationHours: 1,
      level: "beginner",
      isPublished: true,
      isFree: false,
    });
    setChapters([
      {
        id: 1,
        title: "Chương 1: Bắt đầu",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lời khuyên trước khóa học",
            videoUrl: "",
            duration: 10,
            description: "Giới thiệu tổng quan lộ trình và phương pháp học hiệu quả.",
            isPreview: false,
          },
        ],
      },
    ]);
    setHasDraft(false);
    toast?.info("Đã xóa bản nháp và làm mới form điền!", "Làm mới");
  };

  if (!isOpen) return null;

  // Tự sinh slug từ tiêu đề
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

  // Chapter Handlers
  const handleAddChapter = () => {
    const newNum = chapters.length + 1;
    setChapters((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Chương ${newNum}: Chuyên đề mới`,
        order: newNum,
        lessons: [
          {
            id: Date.now() + 1,
            title: `Bài học 1`,
            videoUrl: "",
            duration: 10,
            description: "",
            isPreview: false,
          },
        ],
      },
    ]);
  };

  const handleRemoveChapter = (cIdx) => {
    if (chapters.length <= 1) {
      toast?.warning("Khóa học phải có ít nhất 1 Chương học!", "Thông báo");
      return;
    }
    setChapters((prev) => prev.filter((_, idx) => idx !== cIdx));
  };

  const handleChapterTitleChange = (cIdx, title) => {
    setChapters((prev) =>
      prev.map((ch, idx) => (idx === cIdx ? { ...ch, title } : ch))
    );
  };

  // Lesson Handlers inside Chapter
  const handleAddLesson = (cIdx) => {
    setChapters((prev) =>
      prev.map((ch, idx) => {
        if (idx !== cIdx) return ch;
        const currentLessons = ch.lessons || [];
        const nextNum = currentLessons.length + 1;
        return {
          ...ch,
          lessons: [
            ...currentLessons,
            {
              id: Date.now(),
              title: `Bài học ${nextNum}`,
              videoUrl: "",
              duration: 10,
              description: "",
              isPreview: false,
            },
          ],
        };
      })
    );
  };

  const handleRemoveLesson = (cIdx, lIdx) => {
    setChapters((prev) =>
      prev.map((ch, idx) => {
        if (idx !== cIdx) return ch;
        if (ch.lessons.length <= 1) {
          toast?.warning("Mỗi chương phải có ít nhất 1 bài học!", "Thông báo");
          return ch;
        }
        return {
          ...ch,
          lessons: ch.lessons.filter((_, lIndex) => lIndex !== lIdx),
        };
      })
    );
  };

  const handleLessonChange = (cIdx, lIdx, field, value) => {
    setChapters((prev) =>
      prev.map((ch, idx) => {
        if (idx !== cIdx) return ch;
        const updatedLessons = ch.lessons.map((ls, lIndex) =>
          lIndex === lIdx ? { ...ls, [field]: value } : ls
        );
        return { ...ch, lessons: updatedLessons };
      })
    );
  };

  // Tính toán tổng số bài và tổng thời lượng từ chương trình học
  const totalLessonsCalculated = chapters.reduce(
    (sum, ch) => sum + (ch.lessons?.length || 0),
    0
  );
  const totalDurationMinutes = chapters.reduce(
    (sum, ch) =>
      sum + (ch.lessons?.reduce((lSum, ls) => lSum + (Number(ls.duration) || 0), 0) || 0),
    0
  );
  const totalDurationHoursCalculated = Math.max(1, Math.round(totalDurationMinutes / 60));

  // Chuyển sang Bước 2
  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast?.warning("Vui lòng nhập Tên khóa học!", "Thiếu thông tin");
      return;
    }
    setCurrentStep(2);
  };

  // Lưu hoàn tất vào DB
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast?.warning("Vui lòng nhập Tên khóa học!", "Thiếu thông tin");
      setCurrentStep(1);
      return;
    }

    // Validate chapters & lessons
    for (let c = 0; c < chapters.length; c++) {
      const ch = chapters[c];
      if (!ch.title.trim()) {
        toast?.warning(`Vui lòng nhập tên cho Chương #${c + 1}!`, "Thiếu tên chương");
        setCurrentStep(2);
        return;
      }
      for (let l = 0; l < (ch.lessons || []).length; l++) {
        const ls = ch.lessons[l];
        if (!ls.title.trim()) {
          toast?.warning(`Vui lòng nhập tên cho Bài học #${l + 1} trong ${ch.title}!`, "Thiếu tên bài");
          setCurrentStep(2);
          return;
        }
      }
    }

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

    const benefitsArr = formData.benefits
      ? formData.benefits.split(",").map((i) => i.trim()).filter(Boolean)
      : [];
    const requirementsArr = formData.requirements
      ? formData.requirements.split(",").map((i) => i.trim()).filter(Boolean)
      : [];
    const tagsArr = formData.tags
      ? formData.tags.split(",").map((i) => i.trim()).filter(Boolean)
      : [];

    const formattedChapters = chapters.map((ch, cIdx) => ({
      title: ch.title.trim(),
      order: cIdx + 1,
      isPublished: true,
      lessons: (ch.lessons || []).map((ls, lIdx) => ({
        title: ls.title.trim(),
        videoUrl: ls.videoUrl ? ls.videoUrl.trim() : "",
        duration: Number(ls.duration) || 10,
        description: ls.description ? ls.description.trim() : "",
        order: lIdx + 1,
        isPreview: Boolean(ls.isPreview),
        isPublished: true,
      })),
    }));

    const payload = {
      title: formData.title.trim(),
      slug: finalSlug,
      description: formData.description.trim() || "Mô tả chi tiết khóa học",
      thumbnail:
        formData.thumbnail.trim() ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      promoVideoUrl: formData.promoVideoUrl.trim() || "https://www.youtube.com",
      benefits: benefitsArr.length > 0 ? benefitsArr : ["Nắm vững kiến thức nền tảng và nâng cao"],
      requirements: requirementsArr.length > 0 ? requirementsArr : ["Không yêu cầu kiến thức trước"],
      category: formData.category,
      tags: tagsArr.length > 0 ? tagsArr : ["course", "programming"],
      price: formData.isFree ? 0 : Number(formData.price) || 0,
      salePrice: formData.isFree ? 0 : Number(formData.salePrice) || 0,
      stats: {
        lessons: totalLessonsCalculated > 0 ? totalLessonsCalculated : Number(formData.lessonsCount) || 1,
        duration: totalDurationHoursCalculated > 0 ? totalDurationHoursCalculated : Number(formData.durationHours) || 1,
        learners: initialData?.stats?.learners || 0,
        rating: initialData?.stats?.rating || 5.0,
        reviews: initialData?.stats?.reviews || 0,
      },
      level: formData.level,
      isPublished: formData.isPublished,
      isFree: formData.isFree,
      chapters: formattedChapters,
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
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header with Steps Indicator */}
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Book" size={20} className={styles.header_icon} />
            <div>
              <h3 className={styles.title_text}>
                {initialData ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}
              </h3>
              <div className={styles.stepper_sub}>
                <span
                  className={`${styles.step_badge} ${currentStep === 1 ? styles.step_badge_active : styles.step_badge_done}`}
                  onClick={() => setCurrentStep(1)}
                  style={{ cursor: "pointer" }}
                >
                  Bước 1: Thông tin khóa học
                </span>
                <Icon name="ChevronRight" size={14} className={styles.step_arrow} />
                <span
                  className={`${styles.step_badge} ${currentStep === 2 ? styles.step_badge_active : ""}`}
                  onClick={() => setCurrentStep(2)}
                  style={{ cursor: "pointer" }}
                >
                  Bước 2: Chương trình học & Bài học ({totalLessonsCalculated} bài)
                </span>
              </div>
            </div>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose} title="Đóng">
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Auto-save Draft Bar (Chỉ hiển thị khi tạo mới) */}
        {!initialData && (
          <div className={styles.draft_bar}>
            <div className={styles.draft_info}>
              <Icon name="Save" size={14} />
              <span>
                {hasDraft
                  ? "Tự động lưu bản nháp: Dữ liệu bài học và khóa học sẽ được giữ nguyên khi bạn tải lại"
                  : "Hệ thống tự động lưu bản nháp khi bạn nhập"}
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

        {/* STEP 1: GENERAL INFO & PRICING */}
        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className={styles.modal_form}>
            <div className={styles.modal_body}>
              {/* Section 1: Thông tin cơ bản */}
              <div className={styles.form_section}>
                <div className={styles.section_title}>
                  <Icon name="Info" size={16} />
                  <span>1. Thông tin chung</span>
                </div>

                <FormField
                  label="Tên khóa học (Title) *"
                  placeholder="VD: Node & ExpressJS từ cơ bản đến nâng cao"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />

                <div className={styles.row_grid}>
                  <FormField
                    label="Slug (Định danh URL) *"
                    placeholder="node-expressjs"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />

                  <div className={styles.form_group}>
                    <label className={styles.label}>
                      Danh mục (Category) <span className={styles.required_star}>*</span>
                    </label>
                    <DropdownMenu
                      options={CATEGORY_OPTIONS}
                      value={formData.category}
                      onChange={(val) => setFormData({ ...formData, category: val })}
                    />
                  </div>
                </div>

                <div className={styles.row_grid}>
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

                  <FormField
                    label="Thẻ Tags (Phân cách bởi dấu phẩy)"
                    placeholder="nodejs, express, backend, javascript"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className={styles.form_group}>
                  <label className={styles.label}>
                    Mô tả khóa học (Description) <span className={styles.required_star}>*</span>
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Nhập tổng quan mục tiêu và nội dung khóa học..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* Section 2: Media */}
              <div className={styles.form_section}>
                <div className={styles.section_title}>
                  <Icon name="Image" size={16} />
                  <span>2. Media & Giới thiệu</span>
                </div>

                <div className={styles.row_grid}>
                  <FormField
                    label="Ảnh Thumbnail URL *"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    required
                  />

                  <FormField
                    label="Promo Video URL *"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.promoVideoUrl}
                    onChange={(e) => setFormData({ ...formData, promoVideoUrl: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Section 3: Quyền lợi & Yêu cầu */}
              <div className={styles.form_section}>
                <div className={styles.section_title}>
                  <Icon name="CheckCircle" size={16} />
                  <span>3. Quyền lợi & Yêu cầu đầu vào</span>
                </div>

                <div className={styles.form_group}>
                  <label className={styles.label}>
                    Benefits (Quyền lợi học viên nhận được - cách nhau bởi dấu phẩy) *
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder="VD: Hiểu sâu Node & Express, Xây dựng RESTful API thực chiến, Tự deploy dự án lên cloud"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    rows={2}
                    required
                  />
                </div>

                <div className={styles.form_group}>
                  <label className={styles.label}>
                    Requirements (Yêu cầu kiến thức đầu vào - cách nhau bởi dấu phẩy) *
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder="VD: Cần biết cơ bản về JavaScript ES6, HTML, CSS"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={2}
                    required
                  />
                </div>
              </div>

              {/* Section 4: Học phí & Trạng thái */}
              <div className={styles.form_section}>
                <div className={styles.section_title}>
                  <Icon name="DollarSign" size={16} />
                  <span>4. Học phí & Xuất bản</span>
                </div>

                <div className={styles.row_grid}>
                  <label className={styles.checkbox_card}>
                    <input
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                    />
                    <div className={styles.checkbox_text}>
                      <span className={styles.checkbox_title}>Khóa học Miễn phí (Free)</span>
                      <span className={styles.checkbox_desc}>Học viên có thể học miễn phí 100%</span>
                    </div>
                  </label>

                  <label className={styles.checkbox_card}>
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    />
                    <div className={styles.checkbox_text}>
                      <span className={styles.checkbox_title}>Xuất bản (Published)</span>
                      <span className={styles.checkbox_desc}>Hiển thị công khai trên website</span>
                    </div>
                  </label>
                </div>

                {!formData.isFree && (
                  <div className={styles.row_grid} style={{ marginTop: "8px" }}>
                    <FormField
                      label="Giá gốc (VNĐ)"
                      type="number"
                      min={0}
                      step={10000}
                      placeholder="VD: 599000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                    <FormField
                      label="Giá khuyến mãi (VNĐ)"
                      type="number"
                      min={0}
                      step={10000}
                      placeholder="VD: 299000"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 1 Footer */}
            <div className={styles.modal_footer}>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button type="submit" variant="primary">
                <span>Tiếp tục: Thêm bài học</span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: CHAPTERS & LESSONS (CURRICULUM BUILDER) */}
        {currentStep === 2 && (
          <form onSubmit={handleFinalSubmit} className={styles.modal_form}>
            <div className={styles.modal_body}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "1rem", fontWeight: "800", color: "var(--theme-text-primary, #0f172a)" }}>
                    Quản lý Chương trình học & Bài giảng
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.825rem", color: "var(--theme-text-secondary, #64748b)" }}>
                    Tổng cộng: <b>{chapters.length}</b> chương | <b>{totalLessonsCalculated}</b> bài học | ~<b>{totalDurationHoursCalculated}</b> giờ
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleAddChapter}>
                  <Icon name="Plus" size={14} />
                  <span>Thêm chương mới</span>
                </Button>
              </div>

              {chapters.map((chapter, cIdx) => (
                <div key={chapter.id || cIdx} className={styles.chapter_card}>
                  <div className={styles.chapter_header}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--color-primary, #0950c3)" }}>
                        #{cIdx + 1}
                      </span>
                      <input
                        className={`${styles.textarea} ${styles.chapter_title_input}`}
                        placeholder="Tên chương (VD: Bắt đầu / Phần 1: Cài đặt môi trường)"
                        value={chapter.title}
                        onChange={(e) => handleChapterTitleChange(cIdx, e.target.value)}
                        required
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddLesson(cIdx)}
                        title="Thêm bài học vào chương này"
                      >
                        <Icon name="Plus" size={14} />
                        <span>Thêm bài</span>
                      </Button>
                      {chapters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChapter(cIdx)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            padding: "6px",
                            borderRadius: "6px",
                          }}
                          title="Xóa chương này"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Danh sách các bài học nhỏ trong chương */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
                    {(chapter.lessons || []).map((lesson, lIdx) => (
                      <div key={lesson.id || lIdx} className={styles.lesson_card}>
                        <div className={styles.lesson_header}>
                          <span className={styles.lesson_badge}>
                            Bài {lIdx + 1}
                          </span>
                          {chapter.lessons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(cIdx, lIdx)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                fontSize: "0.775rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                              title="Xóa bài học"
                            >
                              <Icon name="Trash2" size={13} />
                              <span>Xóa</span>
                            </button>
                          )}
                        </div>

                        <div className={styles.row_grid}>
                          <input
                            className={styles.textarea}
                            placeholder="Tên bài học (VD: Lời khuyên trước khóa học Node Express)"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(cIdx, lIdx, "title", e.target.value)}
                            required
                          />
                          <input
                            className={styles.textarea}
                            placeholder="Link video Youtube (VD: https://www.youtube.com/watch?v=...)"
                            value={lesson.videoUrl}
                            onChange={(e) => handleLessonChange(cIdx, lIdx, "videoUrl", e.target.value)}
                          />
                        </div>

                        <div className={styles.row_grid}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "0.8rem", color: "var(--theme-text-secondary, #64748b)", whiteSpace: "nowrap" }}>
                              Thời lượng (Phút):
                            </span>
                            <input
                              type="number"
                              min={1}
                              className={styles.textarea}
                              placeholder="10"
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(cIdx, lIdx, "duration", Number(e.target.value))}
                              style={{ width: "100px" }}
                            />
                          </div>

                          <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.825rem", cursor: "pointer", color: "var(--theme-text-primary, #0f172a)" }}>
                            <input
                              type="checkbox"
                              checked={lesson.isPreview}
                              onChange={(e) => handleLessonChange(cIdx, lIdx, "isPreview", e.target.checked)}
                            />
                            <span>Cho phép học thử (Preview)</span>
                          </label>
                        </div>

                        <input
                          className={styles.textarea}
                          placeholder="Mô tả bài giảng / Ghi chú nội dung ngắn gọn..."
                          value={lesson.description}
                          onChange={(e) => handleLessonChange(cIdx, lIdx, "description", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2 Footer */}
            <div className={styles.modal_footer}>
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                <Icon name="ChevronLeft" size={16} />
                <span>Quay lại Bước 1</span>
              </Button>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button type="button" variant="ghost" onClick={onClose}>
                  Hủy bỏ
                </Button>
                <Button type="submit" variant="primary">
                  <Icon name="Save" size={16} />
                  <span>{initialData ? "Lưu Thay Đổi Vào Database" : "Tạo Khóa Học & Lưu Database"}</span>
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}