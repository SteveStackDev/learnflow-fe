import React, { useState, useMemo } from "react";
import { useParams } from "react-router";
import { useScrollReveal } from "~/hooks/useScrollReveal";
import { getBlogPostDetail } from "~/constants/mockBlogDetail";
import BlogDetailHeader from "./components/BlogDetailHeader/BlogDetailHeader";
import BlogDetailCover from "./components/BlogDetailCover/BlogDetailCover";
import BlogDetailContent from "./components/BlogDetailContent/BlogDetailContent";
import BlogDetailAuthorBox from "./components/BlogDetailAuthorBox/BlogDetailAuthorBox";
import BlogDetailRelated from "./components/BlogDetailRelated/BlogDetailRelated";
import BlogDetailComments from "./components/BlogDetailComments/BlogDetailComments";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { id } = useParams();
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Get rich post details matching slug/id or default
  const post = useMemo(() => getBlogPostDetail(id), [id]);

  // Activate scroll reveal for related cards
  useScrollReveal(".reveal-card", [id]);

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        {/* Component 1: Header (Title, Badge, Meta, Author avatar & name) */}
        <BlogDetailHeader post={post} onSelectUser={(u) => setSelectedUserForModal(u)} />

        {/* Component 2: Cover Image & Integrated Social Share Bar */}
        <BlogDetailCover coverImage={post.coverImage} title={post.title} />

        {/* Component 3: Article Content (Intro quote, sections, code snippet, tags, reactions) */}
        <BlogDetailContent post={post} />

        {/* Component 4: Author Bio Card & Follow Button */}
        <BlogDetailAuthorBox author={post.author} onSelectUser={(u) => setSelectedUserForModal(u)} />

        {/* Component 5: Related Posts Grid */}
        <BlogDetailRelated currentPostId={post.id} />

        {/* Component 6: Discussion & Comments Section */}
        <BlogDetailComments comments={post.comments} onSelectUser={(u) => setSelectedUserForModal(u)} />

        {/* User Profile Quick Card Modal */}
        <UserProfileCardModal
          isOpen={!!selectedUserForModal}
          onClose={() => setSelectedUserForModal(null)}
          user={selectedUserForModal}
        />
      </div>
    </div>
  );
}
