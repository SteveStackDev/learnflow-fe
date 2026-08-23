import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./EditProfileModal.module.css";

export default function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    handle: user?.handle || "",
    technicalBio: user?.technicalBio || "",
    bio: user?.bio || "",
    github: user?.socialLinks?.github || "",
    linkedin: user?.socialLinks?.linkedin || "",
    website: user?.socialLinks?.website || "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(formData);
    toast.success("Đã cập nhật thông tin Profile thành công!", "Profile");
    onClose();
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <div className={styles.header_title}>
            <Icon name="Edit3" size={18} className={styles.header_icon} />
            <h3>Chỉnh Sửa Hồ Sơ Cá Nhân</h3>
          </div>

          <button type="button" className={styles.close_btn} onClick={onClose}>
            <Icon name="X" size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form_body}>
          <div className={styles.form_group}>
            <label>Họ và Tên</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="VD: Alex Smith"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label>Username / Handle</label>
            <input
              type="text"
              name="handle"
              value={formData.handle}
              onChange={handleChange}
              placeholder="VD: alex_smith"
              required
            />
          </div>

          <div className={styles.form_group}>
            <label>Bio Kỹ Thuật (Technical Tagline)</label>
            <input
              type="text"
              name="technicalBio"
              value={formData.technicalBio}
              onChange={handleChange}
              placeholder="VD: Frontend Dev | React Enthusiast"
            />
          </div>

          <div className={styles.form_group}>
            <label>Bio Giới Thiệu Chi Tiết</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Viết đôi dòng giới thiệu bản thân..."
            />
          </div>

          <div className={styles.form_row_grid}>
            <div className={styles.form_group}>
              <label>GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className={styles.form_group}>
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div className={styles.modal_footer}>
            <button type="button" className={styles.cancel_btn} onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className={styles.save_btn}>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
