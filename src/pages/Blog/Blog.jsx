import React, { useState, useMemo } from "react";
import { Pagination } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import mockBlogData from "~/constants/mockBlog";

// Sub-components
import BlogHeroHeader from "./components/BlogHeroHeader/BlogHeroHeader";
import BlogTrendingTopics from "./components/BlogTrendingTopics/BlogTrendingTopics";
import BlogFeaturedPost from "./components/BlogFeaturedPost/BlogFeaturedPost";
import BlogFilterBar from "./components/BlogFilterBar/BlogFilterBar";
import BlogPostCard from "./components/BlogPostCard/BlogPostCard";
import BlogSidebar from "./components/BlogSidebar/BlogSidebar";
import CreatePostModal from "./components/CreatePostModal/CreatePostModal";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";

import styles from "./Blog.module.css";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const { toast } = useToast();

  const [posts, setPosts] = useState(mockBlogData.posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeHashtag, setActiveHashtag] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Filter posts based on Category, SearchTerm, and ActiveHashtag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchesCategory =
        activeCategory === "all" || post.categoryType === activeCategory;

      // Search term filter
      const matchesSearch =
        !searchTerm.trim() ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Hashtag filter
      const matchesHashtag =
        !activeHashtag ||
        post.title.toLowerCase().includes(activeHashtag.replace("#", "").toLowerCase()) ||
        post.category.toLowerCase().includes(activeHashtag.replace("#", "").toLowerCase());

      return matchesCategory && matchesSearch && matchesHashtag;
    });
  }, [posts, activeCategory, searchTerm, activeHashtag]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Featured / Spotlight Articles (filtered by category if available, otherwise fallback to default featured list)
  const displayFeaturedPosts = useMemo(() => {
    if (activeCategory === "all") return mockBlogData.featuredPosts;
    const catFiltered = mockBlogData.featuredPosts.filter(
      (p) => p.categoryType === activeCategory
    );
    return catFiltered.length > 0 ? catFiltered : mockBlogData.featuredPosts;
  }, [activeCategory]);

  // Scroll reveal animation for Blog elements
  useScrollReveal(".reveal-card", [paginatedPosts, activeCategory, viewMode, currentPage]);

  const handleCreatePostSubmit = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    toast.success("Xuất bản bài viết thành công! Bài viết đã xuất hiện trên trang Blog.", "Thành công");
  };

  const handleSelectHashtag = (hashtag) => {
    setActiveHashtag(hashtag);
    setCurrentPage(1);
    if (hashtag) {
      toast.info(`Đang lọc bài viết theo chủ đề ${hashtag}`, "Chủ đề nổi bật");
    }
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  return (
    <div className={styles.blog_page}>
      <div className={styles.blog_container}>
        {/* 1. Hero Header with Search & Create Post CTA */}
        <BlogHeroHeader
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          onCreatePostClick={() => setIsModalOpen(true)}
        />

        {/* 2. Top X-Style Trending Topics Bar */}
        <BlogTrendingTopics
          topics={mockBlogData.trendingTopics}
          activeHashtag={activeHashtag}
          onSelectHashtag={handleSelectHashtag}
        />

        {/* 3. Hot Articles Carousel (Persists during category filter/sort) */}
        <BlogFeaturedPost
          posts={displayFeaturedPosts}
          onSelectUser={(u) => setSelectedUserForModal(u)}
        />

        {/* 4. Filter Bar & View Mode Toggle */}
        <BlogFilterBar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* 5. Main 2-Column Layout */}
        <div className={styles.main_layout}>
          {/* Feed Column */}
          <main className={styles.feed_column}>
            <h2 className={styles.section_heading}>
              {activeHashtag
                ? `Bài viết thuộc chủ đề ${activeHashtag}`
                : "Bài viết mới nhất"}
            </h2>

            {paginatedPosts.length > 0 ? (
              <div
                className={
                  viewMode === "grid" ? styles.posts_grid : styles.posts_list
                }
              >
                {paginatedPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    viewMode={viewMode}
                    onSelectUser={(u) => setSelectedUserForModal(u)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty_box}>
                <h3 className={styles.empty_title}>
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p className={styles.empty_desc}>
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
                </p>
              </div>
            )}

            {/* Reusable Pagination Component */}
            {totalPages > 1 && (
              <div className={styles.pagination_wrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside>
            <BlogSidebar
              popularArticles={mockBlogData.popularArticles}
              topAuthors={mockBlogData.topAuthors}
              onCreatePostClick={() => setIsModalOpen(true)}
              onSelectUser={(u) => setSelectedUserForModal(u)}
            />
          </aside>
        </div>
      </div>

      {/* Interactive Modal for Creating New Blog Posts */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePostSubmit}
      />

      {/* Quick Profile Popover Card Modal (Image 2) */}
      <UserProfileCardModal
        isOpen={!!selectedUserForModal}
        onClose={() => setSelectedUserForModal(null)}
        user={selectedUserForModal}
      />
    </div>
  );
}
