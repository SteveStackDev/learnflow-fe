import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import Badge from "~/components/ui/Badge/Badge";
import styles from "./BlogDetailHeader.module.css";

export default function BlogDetailHeader({ post }) {
  const navigate = useNavigate();
  if (!post) return null;

  const { category, publishedAt, readTime, title, subtitle, author } = post;

  const handleBack = () => {
    navigate("/blog");
  };

  return (
    <header className={styles.header}>
      {/* Back Button to return to Blog list */}
      <button type="button" className={styles.back_btn} onClick={handleBack}>
        <Icon name="ArrowLeft" size={16} />
        <span>Quay lại Blog</span>
      </button>
      {/* Category badge + Published date & Read time meta */}
      <div className={styles.meta_row}>
        <Badge variant="primary" className={styles.category_badge}>
          {category || "FRONTEND"}
        </Badge>
        <span className={styles.meta_item}>
          <Icon name="Calendar" size={15} />
          {publishedAt}
        </span>
        <span className={styles.meta_dot}>•</span>
        <span className={styles.meta_item}>
          <Icon name="Clock" size={15} />
          {readTime}
        </span>
      </div>

      {/* Main Title */}
      <h1 className={styles.title}>{title}</h1>

      {/* Subtitle / Hero tagline if any */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {/* Author info row at top */}
      {author && (
        <div
          className={styles.author_row}
          onClick={() =>
            onSelectUser?.({
              id: "user-01",
              username: author.name,
              handle: "alex_t",
              avatar: author.avatar,
              userTitle: author.role,
              bio: "Frontend Developer | React Enthusiast | Đam mê sáng tạo.",
              statusMessage: "Đã đăng bài viết mới 📝",
            })
          }
          style={{ cursor: "pointer" }}
          title="Click để xem Hồ sơ tác giả"
        >
          <img src={author.avatar} alt={author.name} className={styles.author_avatar} />
          <div className={styles.author_info}>
            <span className={styles.author_name}>{author.name}</span>
            <span className={styles.author_role}>{author.role}</span>
          </div>
        </div>
      )}
    </header>
  );
}
