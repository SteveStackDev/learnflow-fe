import React from "react";
import { Link, useNavigate } from "react-router";
import { Card, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogPostCard.module.css";

const CATEGORY_BADGE_VARIANTS = {
  frontend: "primary",
  backend: "success",
  devops: "warning",
  ai: "purple",
  career: "info",
  tech: "neutral",
};

export default function BlogPostCard({ post, viewMode = "grid", onSelectUser }) {
  const navigate = useNavigate();
  if (!post) return null;

  const targetPath = `/blog/${post.slug || post.id}`;
  const badgeVariant =
    CATEGORY_BADGE_VARIANTS[post.categoryType] || "primary";

  const likePercentage = post.likePercent || "98%";

  const handleCardClick = () => {
    navigate(targetPath);
  };

  return (
    <Card
      className={`${styles.post_card} reveal-card ${
        viewMode === "list" ? styles["post_card--list"] : ""
      }`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.cover_box}>
        <img
          src={post.coverImage}
          alt={post.title}
          className={styles.cover_img}
          loading="lazy"
        />
      </div>

      <div className={styles.card_body}>
        <div className={styles.meta_top}>
          <Badge variant={badgeVariant}>{post.category}</Badge>
          <span className={styles.date_text}>{post.publishedAt}</span>
        </div>

        <h3 className={styles.post_title}>{post.title}</h3>
        <p className={styles.post_desc}>{post.description}</p>

        {/* Stats Row: Lượt xem & Lượt Like (%) */}
        <div className={styles.stats_row}>
          <span className={styles.stat_item} title="Lượt xem bài viết">
            <Icon name="Eye" size={13} className={styles.stat_icon} />
            <span>{post.views || "14.2K"} lượt xem</span>
          </span>
          <span className={styles.stat_item_like} title="Tỷ lệ yêu thích & lượt Like">
            <Icon name="ThumbsUp" size={13} className={styles.like_icon} />
            <span>{likePercentage} ({post.likes || 1250})</span>
          </span>
        </div>

        <div className={styles.card_footer}>
          <div
            className={styles.author_block}
            onClick={(e) => {
              e.stopPropagation();
              onSelectUser?.({
                id: "user-01",
                username: post.author.name,
                handle: post.author.name.toLowerCase().replace(/\s+/g, "_"),
                avatar: post.author.avatar,
                bio: "Tác giả bài viết trên FySet Blog.",
                statusMessage: "Tác giả bài viết hot 🔥",
              });
            }}
            style={{ cursor: "pointer" }}
            title="Click để xem Profile tác giả"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className={styles.author_avatar}
            />
            <span className={styles.author_name}>{post.author.name}</span>
          </div>

          <Link to={`/blog/${post.slug || post.id}`} className={styles.read_link}>
            <span>Đọc tiếp</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
