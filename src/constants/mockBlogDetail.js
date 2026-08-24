/**
 * Mock data chi tiết bài viết Blog cho FySet (mockBlogDetail.js)
 */
import { mockBlogData } from "./mockBlog";

export const mockBlogDetailData = {
  id: "fp-1",
  slug: "kien-truc-micro-frontends-tuong-lai-web-quy-mo-lon",
  category: "FRONTEND",
  categoryType: "frontend",
  readTime: "8 phút đọc",
  title: "Chi Tiết Bài Viết Blog: Micro-Frontends",
  subtitle: "Kiến trúc Micro-Frontends: Tương lai của phát triển Web quy mô lớn?",
  description:
    "Khi các ứng dụng web ngày càng trở nên phức tạp, kiến trúc monolithic truyền thống dần bộc lộ những hạn chế. Micro-Frontends xuất hiện như một giải pháp để chia nhỏ các ứng dụng lớn, giúp các nhóm phát triển độc lập và linh hoạt hơn.",
  author: {
    name: "Nguyễn Văn Lập Trình",
    role: "Senior Frontend Architect @ TechFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Với hơn 8 năm kinh nghiệm xây dựng các hệ thống Frontend quy mô lớn. Đam mê về hiệu năng web, kiến trúc phân tán và chia sẻ kiến thức cho cộng đồng.",
    followers: "3.4K người theo dõi",
  },
  publishedAt: "04 Tháng 10, 2024",
  coverImage:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
  views: "24.5K",
  likes: 124,
  commentsCount: 2,
  tags: ["#Architecture", "#React", "#Webpack"],
  sections: [
    {
      id: "section-1",
      title: "1. Micro-Frontends là gì?",
      content:
        "Khái niệm Micro-Frontends được lấy cảm hứng từ Microservices ở phía backend. Thay vì xây dựng một ứng dụng Single Page Application (SPA) khổng lồ duy nhất, kiến trúc này chia giao diện người dùng thành các phần nhỏ hơn, độc lập. Mỗi phần (hay 'micro-frontend') có thể được phát triển, kiểm thử, và triển khai bởi các nhóm (teams) khác nhau, sử dụng các công nghệ khác nhau nếu cần.",
    },
    {
      id: "section-2",
      title: "1.1. Tại sao lại cần nó?",
      bullets: [
        "Phát triển độc lập: Các nhóm có thể làm việc song song mà không dẫm chân lên nhau.",
        "Triển khai nhanh hơn: Không cần build lại toàn bộ ứng dụng chỉ để cập nhật một tính năng nhỏ.",
        "Khả năng mở rộng công nghệ: Dễ dàng áp dụng framework mới cho các tính năng mới thay vì kẹt lại với công nghệ cũ.",
      ],
    },
    {
      id: "section-3",
      title: "2. Các phương pháp triển khai",
      content:
        "Có nhiều cách để kết hợp các micro-frontends lại với nhau, từ việc sử dụng các thẻ <iframe> truyền thống cho đến các công nghệ hiện đại như Webpack Module Federation.",
    },
    {
      id: "section-4",
      title: "2.1. Ví dụ thực tế với Module Federation",
      content:
        "Webpack 5 đã giới thiệu Module Federation, cho phép các ứng dụng chia sẻ code với nhau tại runtime. Đây là một bước đột phá trong việc xây dựng Micro-Frontends. Dưới đây là một ví dụ sơ bản về cấu hình:",
      codeSnippet: `// webpack.config.js của ứng dụng host
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "host_app",
      remotes: {
        header_app: "header_app@http://localhost:3001/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};`,
    },
    {
      id: "section-5",
      title: "3. Thách thức và cân nhắc",
      content:
        "Dù mang lại nhiều lợi ích, kiến trúc này không phải là 'viên đạn bạc'. Nó đi kèm với độ phức tạp cao hơn về mặt vận hành, khó khăn trong việc chia sẻ trạng thái chung (global state) giữa các ứng dụng, và rủi ro tải trùng lặp các thư viện.",
    },
  ],
  comments: [
    {
      id: "c-1",
      author: "Trần Thị Thiết Kế",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      time: "2 giờ trước",
      content: "Bài viết rất hay và chi tiết. Mình đang tìm hiểu về Module Federation để áp dụng cho dự án công ty. Cảm ơn tác giả!",
      likes: 12,
    },
    {
      id: "c-2",
      author: "Phạm Văn Code",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      time: "5 giờ trước",
      content: "Bài viết giải thích rất trực quan. Cho mình hỏi thêm về cách quản lý CSS tránh bị đè styles giữa các micro-app với nhau ạ?",
      likes: 5,
    },
  ],
};

export const getBlogPostDetail = (slugOrId) => {
  if (!slugOrId) return mockBlogDetailData;
  const foundInPosts = mockBlogData.posts.find((p) => p.slug === slugOrId || p.id === slugOrId);
  const foundInFeatured = mockBlogData.featuredPosts.find((p) => p.slug === slugOrId || p.id === slugOrId);
  const base = foundInPosts || foundInFeatured;

  if (base) {
    return {
      ...mockBlogDetailData,
      id: base.id,
      slug: base.slug,
      title: base.title,
      category: base.category,
      categoryType: base.categoryType || "frontend",
      readTime: base.readTime,
      publishedAt: base.publishedAt,
      coverImage: base.coverImage,
      description: base.description,
      author: {
        ...mockBlogDetailData.author,
        name: base.author?.name || mockBlogDetailData.author.name,
        avatar: base.author?.avatar || mockBlogDetailData.author.avatar,
      },
    };
  }
  return mockBlogDetailData;
};

export default mockBlogDetailData;
