import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogHeroHeader.module.css";

export default function BlogHeroHeader({
  searchTerm,
  onSearchChange,
  onCreatePostClick,
}) {
  return (
    <div className={styles.hero_container}>
      <div className={styles.hero_top_row}>
        <div>
          <span className={styles.hero_badge_tag}>
            <Icon name="Sparkles" size={14} />
            <span>FySet Community</span>
          </span>
          <h1 className={styles.hero_title}>FySet Blog & Knowledge Hub</h1>
          <p className={styles.hero_subtitle}>
            Cập nhật kiến thức lập trình, xu hướng công nghệ mới nhất và những chia sẻ chuyên sâu từ cộng đồng FySet.
          </p>
        </div>

        <button
          type="button"
          className={styles.create_post_btn}
          onClick={onCreatePostClick}
        >
          <Icon name="Plus" size={22} className={styles.btn_icon} />
          <span>Đăng bài ngay</span>
        </button>
      </div>

      <div className={styles.hero_actions}>
        <div className={styles.search_box}>
          <Icon name="Search" size={18} className={styles.search_icon} />
          <input
            type="text"
            className={styles.search_input}
            placeholder="Tìm kiếm bài viết, chủ đề, tác giả..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
