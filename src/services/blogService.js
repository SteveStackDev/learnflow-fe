import api from "./api";
import { mockBlogData } from "~/constants/mockBlog";
import { mockBlogDetailData } from "~/constants/mockBlogDetail";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu bài viết từ MongoDB sang UI
export const adaptBlog = (blog) => {
  if (!blog) return null;

  return {
    id: blog._id?.toString() || blog.id,
    slug: blog.slug,
    title: blog.title,
    description: blog.description || blog.excerpt,
    content: blog.content,
    thumbnail:
      blog.thumbnail ||
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=80",
    readingTime: `${blog.readingTime || 5} phút đọc`,
    author: {
      name: blog.authorId?.name || blog.authorId?.username || "FySet Author",
      avatar:
        blog.authorId?.avatar?.url ||
        blog.authorId?.avatar ||
        "https://api.dicebear.com/7.x/avataaars/svg?seed=author",
    },
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString("vi-VN")
      : "Gần đây",
    category: blog.category || "Công nghệ",
    tags: blog.tags || [],
    stats: {
      views: blog.stats?.views || 120,
      likes: blog.stats?.likes || 45,
      comments: blog.stats?.comments || 12,
    },
    raw: blog,
  };
};

export const blogService = {
  /**
   * Lấy danh sách bài viết blog
   */
  getBlogs: async (params = {}) => {
    if (USE_MOCK) {
      return mockBlogData;
    }

    try {
      const data = await api.get("/blogs", { params });
      if (Array.isArray(data)) {
        return data.map(adaptBlog);
      }
      return mockBlogData;
    } catch (error) {
      console.warn("⚠️ [blogService] Dùng mock blogs dự phòng:", error.message);
      return mockBlogData;
    }
  },

  /**
   * Lấy chi tiết bài viết theo Slug
   */
  getBlogBySlug: async (slug) => {
    if (USE_MOCK) {
      return mockBlogDetailData;
    }

    try {
      const data = await api.get(`/blogs/${slug}`);
      return adaptBlog(data) || mockBlogDetailData;
    } catch (error) {
      console.warn("⚠️ [blogService] Dùng mock chi tiết blog:", error.message);
      return mockBlogDetailData;
    }
  },

  /**
   * Tạo bài viết mới
   */
  createBlog: async (blogData) => {
    if (USE_MOCK) {
      return {
        id: `blog-${Date.now()}`,
        ...blogData,
        createdAt: new Date().toISOString(),
      };
    }

    return await api.post("/blogs", blogData);
  },
};

export default blogService;
