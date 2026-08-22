import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogTrendingTopics.module.css";

export default function BlogTrendingTopics({
  topics = [],
  activeHashtag,
  onSelectHashtag,
}) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className={`${styles.trending_section} reveal-card`}>
      <div className={styles.trending_header}>
        <div className={styles.trending_title_group}>
          <Icon name="Sparkles" size={20} className={styles.trending_fire_icon} />
          <h2 className={styles.trending_title}>Chủ đề nổi bật trên FySet</h2>
        </div>
        <span className={styles.trending_subtitle}>Cập nhật xu hướng thảo luận hot nhất</span>
      </div>

      <div className={styles.trending_grid}>
        {topics.map((topic) => {
          const isActive = activeHashtag === topic.hashtag;
          return (
            <div
              key={topic.id}
              className={`${styles.trending_card} ${
                isActive ? styles["trending_card--active"] : ""
              }`}
              onClick={() => onSelectHashtag(isActive ? "" : topic.hashtag)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.trending_top_meta}>
                <span className={styles.trending_hashtag}>{topic.hashtag}</span>
                {topic.isHot && <span className={styles.hot_tag}>🔥 HOT</span>}
              </div>
              <p className={styles.trending_name}>{topic.name}</p>
              <span className={styles.trending_count}>{topic.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
