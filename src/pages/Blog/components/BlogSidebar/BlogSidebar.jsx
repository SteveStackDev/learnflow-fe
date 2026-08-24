import React from "react";
import { Link } from "react-router";
import { Card, Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogSidebar.module.css";

export default function BlogSidebar({
  popularArticles = [],
  topAuthors = [],
  onCreatePostClick,
  onSelectUser,
}) {
  return (
    <div className={styles.sidebar_container}>
      {/* Quick Action Create Post Card */}
      <div className={`${styles.create_cta_card} reveal-card`}>
        <div className={styles.cta_icon_box}>
          <Icon name="Edit3" size={24} />
        </div>
        <h3 className={styles.cta_title}>Bạn có chia sẻ thú vị?</h3>
        <p className={styles.cta_desc}>
          Đăng bài viết mới để chia sẻ kiến thức, kinh nghiệm coding và giao lưu cùng cộng đồng FySet!
        </p>
        <Button
          variant="gradient"
          size="md"
          className={styles.cta_btn}
          onClick={onCreatePostClick}
          leftIcon="Plus"
        >
          Đăng bài ngay
        </Button>
      </div>

      {/* Top Popular Articles */}
      <Card className={`${styles.widget_card} reveal-card`}>
        <div className={styles.widget_header}>
          <Icon name="Zap" size={18} style={{ color: "#f59e0b" }} />
          <h3 className={styles.widget_title}>Đọc nhiều nhất</h3>
        </div>

        <div className={styles.popular_list}>
          {popularArticles.map((item) => (
            <Link key={item.id} to="/blog" className={styles.popular_item}>
              <span className={`${styles.popular_rank} ${styles[`popular_rank_${item.rank}`]}`}>
                {item.rank}
              </span>
              <div className={styles.popular_info}>
                <h4 className={styles.popular_item_title}>{item.title}</h4>
                <span className={styles.popular_views}>{item.views}</span>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Top Authors / Contributors */}
      <Card className={styles.widget_card}>
        <div className={styles.widget_header}>
          <Icon name="Users" size={18} style={{ color: "#0950c3" }} />
          <h3 className={styles.widget_title}>Tác giả tiêu biểu</h3>
        </div>

        <div className={styles.authors_list}>
          {topAuthors.map((author) => (
            <div key={author.id} className={styles.author_item}>
              <div
                className={styles.author_left}
                onClick={() =>
                  onSelectUser?.({
                    id: author.id || "user-01",
                    username: author.name,
                    handle: author.name.toLowerCase().replace(/\s+/g, "_"),
                    avatar: author.avatar,
                    bio: "Tác giả tiêu biểu trên FySet Blog.",
                    statusMessage: "Tác giả tiêu biểu ⭐",
                  })
                }
                style={{ cursor: "pointer" }}
                title="Click để xem Profile tác giả"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className={styles.author_avatar}
                />
                <div className={styles.author_meta}>
                  <span className={styles.author_name}>{author.name}</span>
                  <span className={styles.author_sub}>{author.articlesCount}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Theo dõi
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
