import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardCommunityDigest.module.css";

export default function DashboardCommunityDigest({
  blogHighlights = [],
  hotDiscussions = [],
  onSelectUser,
}) {
  return (
    <div className={`${styles.digest_card} reveal-card`}>
      <div className={styles.card_header}>
        <div className={styles.header_title_block}>
          <div className={styles.icon_box}>
            <Icon name="MessageSquare" size={18} />
          </div>
          <div>
            <h3 className={styles.title}>Community Digest & Blog Highlights</h3>
            <p className={styles.subtitle}>Bài viết nổi bật & thảo luận nóng trên diễn đàn</p>
          </div>
        </div>

        <Link to="/blog" className={styles.view_all_link}>
          <span>Khám phá Blog</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      <div className={styles.digest_grid}>
        {/* Left: Top 3 Daily Blogs */}
        <div className={styles.blogs_col}>
          <h4 className={styles.column_label}>
            <Icon name="TrendingUp" size={15} />
            <span>Top Blog Bài Viết Nổi Bật</span>
          </h4>

          <div className={styles.blogs_list}>
            {blogHighlights.map((blog) => (
              <div key={blog.id} className={styles.blog_item}>
                <div className={styles.blog_meta_top}>
                  <div
                    className={styles.author_block}
                    onClick={() =>
                      onSelectUser?.({
                        id: blog.author.id || "usr-01",
                        username: blog.author.name,
                        handle: blog.author.name.toLowerCase().replace(/\s+/g, "_"),
                        avatar: blog.author.avatar,
                        bio: "Tác giả chia sẻ kiến thức trên FySet Community.",
                      })
                    }
                    title="Click để xem Profile tác giả"
                  >
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className={styles.author_avatar}
                    />
                    <span className={styles.author_name}>{blog.author.name}</span>
                  </div>
                  <span className={styles.category_tag}>{blog.category}</span>
                </div>

                <Link to={`/blog/${blog.id}`} className={styles.blog_title}>
                  {blog.title}
                </Link>

                <div className={styles.blog_stats}>
                  <span className={styles.stat}>
                    <Icon name="Eye" size={12} />
                    <span>{blog.views}</span>
                  </span>
                  <span className={styles.stat}>
                    <Icon name="Heart" size={12} />
                    <span>{blog.likes} lượt thích</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hot Forum Discussions */}
        <div className={styles.forum_col}>
          <h4 className={styles.column_label}>
            <Icon name="Flame" size={15} style={{ color: "#ef4444" }} />
            <span>Thảo Luận Nóng Hổi</span>
          </h4>

          <div className={styles.discussions_list}>
            {hotDiscussions.map((disc) => (
              <div key={disc.id} className={styles.disc_item}>
                <h5 className={styles.disc_title}>{disc.title}</h5>

                <div className={styles.disc_footer}>
                  <span className={styles.disc_author}>Đăng bởi {disc.authorName}</span>
                  <div className={styles.disc_counts}>
                    <span>💬 {disc.replies} trả lời</span>
                    <span>• {disc.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
