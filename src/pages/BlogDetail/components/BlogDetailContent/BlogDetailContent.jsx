import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./BlogDetailContent.module.css";

export default function BlogDetailContent({ post }) {
  const { toast } = useToast();
  const [likesCount, setLikesCount] = useState(post?.likes || 124);
  const [isLiked, setIsLiked] = useState(false);

  if (!post) return null;

  const { description, sections = [], tags = [] } = post;

  const handleToggleLike = () => {
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      toast.success("Cảm ơn phản hồi của bạn! Bài viết rất hữu ích.", "Thả tim");
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <article className={styles.article_body}>
      {/* Intro blockquote callout */}
      {description && (
        <blockquote className={styles.quote_callout}>
          <p>{description}</p>
        </blockquote>
      )}

      {/* Main text sections */}
      {sections.map((section) => (
        <div key={section.id} className={styles.section_block}>
          {section.title && <h2 className={styles.section_title}>{section.title}</h2>}

          {section.content && <p className={styles.paragraph}>{section.content}</p>}

          {section.bullets && (
            <ul className={styles.bullet_list}>
              {section.bullets.map((bullet, idx) => (
                <li key={idx} className={styles.bullet_item}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {section.codeSnippet && (
            <div className={styles.code_box}>
              <div className={styles.code_header}>
                <span className={styles.code_lang}>webpack.config.js</span>
                <span className={styles.code_copy}>Code Snippet</span>
              </div>
              <pre className={styles.code_pre}>
                <code>{section.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      ))}

      {/* Topic Tag Chips & Helpful Reaction Button */}
      <div className={styles.footer_row}>
        <div className={styles.tags_list}>
          {tags.map((tag, idx) => (
            <span key={idx} className={styles.tag_chip}>
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.helpful_btn} ${isLiked ? styles.helpful_active : ""}`}
          onClick={handleToggleLike}
        >
          <Icon name="ThumbsUp" size={18} />
          <span>Hữu ích ({likesCount})</span>
        </button>
      </div>
    </article>
  );
}
