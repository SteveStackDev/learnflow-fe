import React from "react";
import catScubaGif from "~/assets/images/Admin/cat-scuba.gif";
import styles from "./AdminEmptyState.module.css";

export default function AdminEmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.content_box}>
        {/* Scuba Cat GIF Illustration */}
        <div className={styles.image_wrapper}>
          <img
            src={catScubaGif}
            alt="Scuba Cat Admin Assistant"
            className={styles.cat_image}
          />
        </div>

        {/* Heading & Instructions */}
        <h3 className={styles.title}>Chọn 1 tab để tiếp tục</h3>
        <p className={styles.subtitle}>
          Vui lòng chọn một danh mục quản lý từ thanh menu bên trái để bắt đầu xem thông tin
          và thực hiện công việc điều hành hệ thống <strong>FySet</strong>.
        </p>

        {/* Hint Pills */}
        <div className={styles.hint_tags}>
          <span className={styles.hint_tag}>🚀 Quản lý Khóa học</span>
          <span className={styles.hint_tag}>💻 Bài tập & Contest</span>
          <span className={styles.hint_tag}>👥 Người dùng & Blog</span>
        </div>
      </div>
    </div>
  );
}
