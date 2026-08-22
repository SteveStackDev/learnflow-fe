import React from "react";
import BlogPostCard from "~/pages/Blog/components/BlogPostCard/BlogPostCard";
import { mockBlogData } from "~/constants/mockBlog";
import styles from "./BlogDetailRelated.module.css";

export default function BlogDetailRelated({ currentPostId }) {
  // Select 3 related posts from mock data excluding current post
  const relatedPosts = mockBlogData.posts
    .filter((p) => p.id !== currentPostId)
    .slice(0, 3);

  return (
    <section className={styles.related_section}>
      <h2 className={styles.heading}>Bài viết liên quan</h2>
      <div className={styles.grid}>
        {relatedPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
