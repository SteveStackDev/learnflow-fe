import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileBlogTab.module.css";

export default function ProfileBlogTab({ articles = [] }) {
  if (!articles || articles.length === 0) {
    return (
      <div className={`${styles.empty_box} reveal-card`}>
        <Icon name="FileText" size={32} className={styles.empty_icon} />
        <p>Tác giả chưa xuất bản bài viết Blog nào.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.tab_card} reveal-card`}>
      <div className={styles.tab_header}>
        <h3 className={styles.tab_title}>Bài Viết Đã Xuất Bản ({articles.length})</h3>
        <span className={styles.tab_subtitle}>Tất cả các bài viết chia sẻ chuyên môn của tác giả</span>
      </div>

      <div className={styles.articles_grid}>
        {articles.map((art) => (
          <div key={art.id} className={styles.article_item}>
            <div className={styles.article_top}>
              <span className={styles.category_tag}>{art.category}</span>
              <span className={styles.pub_date}>{art.publishedAt}</span>
            </div>

            <Link to={`/blog/${art.id}`} className={styles.article_title}>
              {art.title}
            </Link>

            <p className={styles.article_desc}>{art.description}</p>

            <div className={styles.article_footer}>
              <div className={styles.stats_group}>
                <span className={styles.stat_item}>
                  <Icon name="Eye" size={13} />
                  <span>{art.views} lượt xem</span>
                </span>

                <span className={styles.stat_item}>
                  <Icon name="Heart" size={13} />
                  <span>{art.likes} thích</span>
                </span>

                <span className={styles.stat_item}>
                  <Icon name="MessageSquare" size={13} />
                  <span>{art.commentsCount} phản hồi</span>
                </span>
              </div>

              <Link to={`/blog/${art.id}`} className={styles.read_link}>
                <span>Đọc bài viết</span>
                <Icon name="ArrowRight" size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
