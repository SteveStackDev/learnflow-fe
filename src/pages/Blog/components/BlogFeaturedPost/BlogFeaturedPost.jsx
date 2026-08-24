import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogFeaturedPost.module.css";

export default function BlogFeaturedPost({ posts = [], onSelectUser }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentIndex] || posts[0];
  const targetPath = `/blog/${currentPost.slug || currentPost.id}`;

  const handleCardClick = () => {
    navigate(targetPath);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`${styles.carousel_container} reveal-card`}>
      <div
        className={styles.featured_card}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cover_wrapper}>
          <img
            src={currentPost.coverImage}
            alt={currentPost.title}
            className={styles.cover_img}
          />
        </div>

        <div className={styles.content_wrapper}>
          <div className={styles.meta_header_row}>
            <div className={styles.meta_left}>
              <Badge variant="primary">{currentPost.category}</Badge>
              <span className={styles.read_time}>
                <Icon name="Clock" size={14} />
                <span>{currentPost.readTime}</span>
              </span>
            </div>

            {/* Clean Top-Right Carousel Nav Controls */}
            {posts.length > 1 && (
              <div className={styles.carousel_nav_group}>
                <span className={styles.slide_counter}>
                  {currentIndex + 1} / {posts.length}
                </span>
                <button
                  type="button"
                  className={styles.arrow_btn}
                  onClick={handlePrev}
                  title="Bài viết trước"
                  aria-label="Previous Featured Post"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  type="button"
                  className={styles.arrow_btn}
                  onClick={handleNext}
                  title="Bài viết tiếp theo"
                  aria-label="Next Featured Post"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            )}
          </div>

          <h2 className={styles.title}>{currentPost.title}</h2>
          <p className={styles.description}>{currentPost.description}</p>

          <div className={styles.author_footer}>
            <div
              className={styles.author_info}
              onClick={(e) => {
                e.stopPropagation();
                onSelectUser?.({
                  id: "user-01",
                  username: currentPost.author.name,
                  handle: currentPost.author.name.toLowerCase().replace(/\s+/g, "_"),
                  avatar: currentPost.author.avatar,
                  bio: "Tác giả bài viết tiêu biểu trên FySet Blog.",
                  statusMessage: "Tác giả bài viết tiêu biểu ⭐",
                });
              }}
              style={{ cursor: "pointer" }}
              title="Click để xem Profile tác giả"
            >
              <img
                src={currentPost.author.avatar}
                alt={currentPost.author.name}
                className={styles.author_avatar}
              />
              <div>
                <h4 className={styles.author_name}>{currentPost.author.name}</h4>
                <span className={styles.published_date}>{currentPost.publishedAt}</span>
              </div>
            </div>

            <div className={styles.stats_group}>
              <span className={styles.stat_item}>
                <Icon name="Eye" size={15} />
                <span>{currentPost.views}</span>
              </span>
              <span className={styles.stat_item}>
                <Icon name="Heart" size={15} />
                <span>{currentPost.likes}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
