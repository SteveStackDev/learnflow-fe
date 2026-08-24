import React, { useState, useRef, useEffect } from "react";
import { Button, ScrollArea, DropdownMenu } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CreatePostModal.module.css";

const CATEGORY_OPTIONS = [
  { value: "FRONTEND", label: "FRONTEND" },
  { value: "BACKEND", label: "BACKEND" },
  { value: "DEVOPS", label: "DEVOPS" },
  { value: "AI & DATA", label: "AI & DATA" },
  { value: "SỰ NGHIỆP", label: "SỰ NGHIỆP" },
  { value: "TIN TỨC TECH", label: "TIN TỨC TECH" },
];

export default function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "FRONTEND",
    categoryType: "frontend",
    readTime: "5 phút đọc",
    description: "",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    authorName: "Nguyễn Văn Học",
  });

  const textareaRef = useRef(null);

  // Reset & adjust textarea height when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(280, Math.max(180, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    handleChange("description", val);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(280, Math.max(180, textareaRef.current.scrollHeight));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSelectCategory = (val) => {
    const catTypeMap = {
      FRONTEND: "frontend",
      BACKEND: "backend",
      DEVOPS: "devops",
      "AI & DATA": "ai",
      "SỰ NGHIỆP": "career",
      "TIN TỨC TECH": "tech",
    };
    setFormData((prev) => ({
      ...prev,
      category: val,
      categoryType: catTypeMap[val] || "frontend",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const newPost = {
      id: `custom-post-${Date.now()}`,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      category: formData.category,
      categoryType: formData.categoryType,
      readTime: formData.readTime,
      title: formData.title,
      description: formData.description,
      author: {
        name: formData.authorName || "Học viên FySet",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      publishedDate: "Vừa xong",
      views: "1",
      likes: 0,
      comments: 0,
      bookmarks: 0,
      image: formData.coverImage,
    };

    onSubmit(newPost);
    onClose();
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modal_header}>
          <div className={styles.header_left}>
            <Icon name="PenTool" size={20} className={styles.header_icon} />
            <h3 className={styles.modal_title}>Tạo bài viết bài chia sẻ</h3>
          </div>
          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Scrollable Form Body using UI ScrollArea */}
        <ScrollArea className={styles.modal_scroll}>
          <form onSubmit={handleSubmit} className={styles.modal_form}>
            <div className={styles.form_group}>
              <label className={styles.label}>Tiêu đề bài viết *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nhập tiêu đề ấn tượng cho bài viết..."
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Thể loại danh mục *</label>
              <DropdownMenu
                options={CATEGORY_OPTIONS}
                value={formData.category}
                onChange={handleSelectCategory}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Ảnh ảnh xem trước (Cover URL)</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Dán đường dẫn ảnh Unsplash hoặc URL ảnh của bạn..."
                value={formData.coverImage}
                onChange={(e) => handleChange("coverImage", e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label className={styles.label}>Nội dung & Chia sẻ bài viết *</label>
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder="Viết nội dung bài chia sẻ, kiến thức hoặc câu hỏi của bạn tại đây..."
                value={formData.description}
                onChange={handleDescriptionChange}
                required
              />
            </div>

            {/* Modal Actions */}
            <div className={styles.modal_footer}>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button type="submit" variant="primary">
                Đăng bài ngay
              </Button>
            </div>
          </form>
        </ScrollArea>
      </div>
    </div>
  );
}
