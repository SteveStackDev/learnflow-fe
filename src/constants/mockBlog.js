/**
 * Mock data cho trang Blog / Cộng đồng bài viết FySet
 */

export const mockBlogData = {
  trendingTopics: [
    { id: "tt-1", hashtag: "#React19", name: "React 19 & Server Components", count: "14.2K bài viết", isHot: true },
    { id: "tt-2", hashtag: "#MicroFrontends", name: "Micro-Frontends Architecture", count: "9.8K bài viết", isHot: true },
    { id: "tt-3", hashtag: "#AIandCoding", name: "Ứng dụng AI trong Code Review", count: "18.5K bài viết", isHot: true },
    { id: "tt-4", hashtag: "#SystemDesign", name: "Tối ưu hóa Hệ thống Triệu User", count: "11.3K bài viết", isHot: false },
    { id: "tt-5", hashtag: "#DevOpsPipeline", name: "CI/CD & GitHub Actions", count: "7.6K bài viết", isHot: false },
    { id: "tt-6", hashtag: "#CleanCode", name: "Design Patterns & Refactoring", count: "12.1K bài viết", isHot: false },
  ],

  featuredPosts: [
    {
      id: "fp-1",
      slug: "kien-truc-micro-frontends-tuong-lai-web-quy-mo-lon",
      category: "FRONTEND",
      readTime: "8 phút đọc",
      title: "Kiến trúc Micro-Frontends: Tương lai của phát triển Web quy mô lớn?",
      description:
        "Tìm hiểu cách chia nhỏ các ứng dụng frontend khổng lồ thành các module độc lập, dễ quản lý và deploy hơn bằng cách áp dụng triết lý microservices vào UI.",
      author: {
        name: "Nguyễn Văn Lập Trình",
        role: "Senior Frontend Engineer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "12 Tháng 10, 2024",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      views: "24.5K",
      likes: 1240,
      commentsCount: 86,
    },
    {
      id: "fp-2",
      slug: "ung-dung-llm-vao-quy-trinh-code-review-tu-dong",
      category: "AI & DATA",
      readTime: "6 phút đọc",
      title: "Ứng dụng LLM vào quy trình Code Review tự động trong Doanh nghiệp",
      description:
        "Sử dụng sức mạnh của Large Language Models để bắt lỗi, đề xuất cải tiến và tối ưu hóa quy trình review code trong các dự án quy mô lớn.",
      author: {
        name: "Minh Trần",
        role: "AI & ML Specialist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "10 Tháng 10, 2024",
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&auto=format&fit=crop&q=80",
      views: "18.2K",
      likes: 890,
      commentsCount: 42,
    },
    {
      id: "fp-3",
      slug: "tu-junior-len-senior-nhung-ky-nang-mem-khong-ai-day",
      category: "SỰ NGHIỆP",
      readTime: "7 phút đọc",
      title: "Từ Junior lên Senior: Những kỹ năng 'mềm' quyết định thành công",
      description:
        "Code giỏi chưa đủ. Khám phá những kỹ năng giao tiếp, quản lý thời gian và giải quyết vấn đề cần thiết để thăng tiến nhanh trong sự nghiệp phần mềm.",
      author: {
        name: "Lan Anh",
        role: "Engineering Manager",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "05 Tháng 10, 2024",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      views: "32.1K",
      likes: 2150,
      commentsCount: 120,
    },
  ],

  posts: [
    {
      id: "post-1",
      slug: "ung-dung-llm-vao-quy-trinh-code-review-tu-dong",
      category: "AI & DATA",
      categoryType: "ai",
      readTime: "6 phút đọc",
      title: "Ứng dụng LLM vào quy trình Code Review tự động",
      description:
        "Sử dụng sức mạnh của Large Language Models để bắt lỗi, đề xuất cải tiến và tối ưu hóa quy trình review code trong các dự án thực tế.",
      author: {
        name: "Minh Trần",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "10/10/2024",
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
      views: "18.2K",
      likes: 890,
      commentsCount: 42,
    },
    {
      id: "post-2",
      slug: "xay-dung-cicd-pipeline-hoan-chinh-voi-github-actions",
      category: "DEVOPS",
      categoryType: "devops",
      readTime: "10 phút đọc",
      title: "Xây dựng CI/CD Pipeline hoàn chỉnh với GitHub Actions",
      description:
        "Hướng dẫn chi tiết từng bước (step-by-step) để thiết lập một luồng CI/CD vững chắc, từ tự động test đến tự động deploy lên AWS/Vercel.",
      author: {
        name: "Hải Phạm",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "08/10/2024",
      coverImage:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
      views: "15.4K",
      likes: 640,
      commentsCount: 31,
    },
    {
      id: "post-3",
      slug: "tu-junior-len-senior-nhung-ky-nang-mem-khong-ai-day",
      category: "SỰ NGHIỆP",
      categoryType: "career",
      readTime: "7 phút đọc",
      title: "Từ Junior lên Senior: Những kỹ năng 'mềm' mà không ai dạy bạn",
      description:
        "Code giỏi chưa đủ. Khám phá những kỹ năng giao tiếp, quản lý thời gian và giải quyết vấn đề cần thiết để thăng tiến nhanh trong sự nghiệp phần mềm.",
      author: {
        name: "Lan Anh",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "05/10/2024",
      coverImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      views: "32.1K",
      likes: 2150,
      commentsCount: 120,
    },
    {
      id: "post-4",
      slug: "toi-uu-hoa-database-query-cho-he-thong-trieu-user",
      category: "BACKEND",
      categoryType: "backend",
      readTime: "12 phút đọc",
      title: "Tối ưu hóa Database Query cho hệ thống triệu User",
      description:
        "Bí quyết đánh Index, tối ưu hóa câu lệnh SQL, tận dụng Redis Caching và đọc Execution Plan để tránh điểm nghẽn hiệu suất.",
      author: {
        name: "Hoàng Vũ",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "02/10/2024",
      coverImage:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
      views: "21.0K",
      likes: 1120,
      commentsCount: 54,
    },
    {
      id: "post-5",
      slug: "10-design-patterns-moi-lap-trinh-vien-can-biet",
      category: "FRONTEND",
      categoryType: "frontend",
      readTime: "9 phút đọc",
      title: "10 Design Patterns mọi lập trình viên JS/TS cần biết",
      description:
        "Giải thích dễ hiểu về Singleton, Observer, Factory, Strategy và các pattern phổ biến ứng dụng trong các thư viện UI hiện đại.",
      author: {
        name: "Đức Nguyễn",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "28/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      views: "27.8K",
      likes: 1540,
      commentsCount: 92,
    },
    {
      id: "post-6",
      slug: "giai-ma-do-phuc-tap-big-o-cho-nguoi-moi-bat-dau",
      category: "TIN TỨC TECH",
      categoryType: "tech",
      readTime: "5 phút đọc",
      title: "Giải mã độ phức tạp thuật toán (Big O Notation) cho người mới",
      description:
        "Hình dung sinh động về O(1), O(log n), O(n), O(n^2) giúp bạn đánh giá hiệu năng giải thuật chính xác mà không tốn công sức.",
      author: {
        name: "Thu Trang",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "25/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
      views: "19.6K",
      likes: 980,
      commentsCount: 38,
    },
    {
      id: "post-7",
      slug: "xay-dung-ci-cd-pipeline-voi-github-actions-cho-du-an-react",
      category: "DEVOPS",
      categoryType: "devops",
      readTime: "8 phút đọc",
      title: "Xây dựng CI/CD Pipeline tự động hóa với GitHub Actions cho React",
      description:
        "Hướng dẫn từng bước cấu hình file workflow YAML để tự động chạy Unit Test, Linting và Deploy lên Server Vercel/Netlify khi Push Code.",
      author: {
        name: "Tuấn Phạm",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "20/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
      views: "15.4K",
      likes: 820,
      commentsCount: 29,
    },
    {
      id: "post-8",
      slug: "cac-tinh-nang-moi-dang-chu-y-trong-ecmascript-2024",
      category: "FRONTEND",
      categoryType: "frontend",
      readTime: "7 phút đọc",
      title: "Các tính năng mới đáng chú ý nhất trong ECMAScript 2024 (ES15)",
      description:
        "Khám phá Array.prototype.groupBy, Promise.withResolvers, Temporal API và các cải tiến cú pháp mới giúp viết code JavaScript ngắn gọn hơn.",
      author: {
        name: "Nguyễn Văn Lập Trình",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "18/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=80",
      views: "31.2K",
      likes: 1890,
      commentsCount: 94,
    },
    {
      id: "post-9",
      slug: "cach-quan-ly-state-hieu-qua-voi-zustand-va-tanstack-query",
      category: "FRONTEND",
      categoryType: "frontend",
      readTime: "10 phút đọc",
      title: "Cách quản lý State hiệu quả với Zustand và TanStack Query (React Query)",
      description:
        "Tách biệt giữa Client State và Server State trong ứng dụng React thực tế giúp đơn giản hóa Codebase và tăng tốc độ trải nghiệm người dùng.",
      author: {
        name: "Minh Trần",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "15/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      views: "23.9K",
      likes: 1420,
      commentsCount: 67,
    },
    {
      id: "post-10",
      slug: "bao-mat-ung-dung-web-voi-owasp-top-10",
      category: "DEVOPS",
      categoryType: "devops",
      readTime: "11 phút đọc",
      title: "Bảo mật ứng dụng Web chống lại lỗ hổng OWASP Top 10",
      description:
        "Tìm hiểu các lỗi bảo mật phổ biến như SQL Injection, XSS, CSRF, Broken Authentication và cách phòng chống cho ứng dụng Fullstack.",
      author: {
        name: "Tuấn Phạm",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "10/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
      views: "17.3K",
      likes: 950,
      commentsCount: 41,
    },
    {
      id: "post-11",
      slug: "xay-dung-restful-api-chuan-rest-cho-doanh-nghiep",
      category: "BACKEND",
      categoryType: "backend",
      readTime: "9 phút đọc",
      title: "Xây dựng RESTful API chuẩn RESTful cho dự án Doanh nghiệp",
      description:
        "Quy chuẩn thiết kế URI, chọn HTTP Status Code chính xác, xử lý error response tập trung và quản lý versioning API mượt mà.",
      author: {
        name: "Hoàng Vũ",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "05/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
      views: "20.5K",
      likes: 1100,
      commentsCount: 52,
    },
    {
      id: "post-12",
      slug: "cam-nang-phong-van-system-design-danh-cho-developer",
      category: "SỰ NGHIỆP",
      categoryType: "career",
      readTime: "15 phút đọc",
      title: "Cẩm nang phỏng vấn System Design dành cho Developer",
      description:
        "Phương pháp 4 bước trả lời các câu hỏi thiết kế hệ thống lớn: Load Balancer, Caching, Sharding, Message Queue và CAP Theorem.",
      author: {
        name: "Lan Anh",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      },
      publishedAt: "01/09/2024",
      coverImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
      views: "45.0K",
      likes: 2980,
      commentsCount: 165,
    },
  ],

  popularArticles: [
    {
      id: "pop-1",
      rank: "01",
      title: "Lộ trình học Frontend Web Development chi tiết năm 2024 - 2025",
      views: "42K lượt đọc",
      category: "Frontend",
    },
    {
      id: "pop-2",
      rank: "02",
      title: "10 Design Patterns mọi lập trình viên Java/JS cần biết",
      views: "27.8K lượt đọc",
      category: "Clean Code",
    },
    {
      id: "pop-3",
      rank: "03",
      title: "Giải mã độ phức tạp Big O Notation cho người mới bắt đầu",
      views: "19.6K lượt đọc",
      category: "Thuật toán",
    },
    {
      id: "pop-4",
      rank: "04",
      title: "Học ReactJS từ zero đến hero trong 30 ngày: Lộ trình thực chiến",
      views: "16.2K lượt đọc",
      category: "ReactJS",
    },
  ],

  topAuthors: [
    {
      id: "author-1",
      name: "Nguyễn Văn Lập Trình",
      role: "Senior Frontend Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      articlesCount: "42 bài viết",
      followers: "3.4K người theo dõi",
    },
    {
      id: "author-2",
      name: "Minh Trần",
      role: "AI & ML Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      articlesCount: "28 bài viết",
      followers: "2.1K người theo dõi",
    },
    {
      id: "author-3",
      name: "Lan Anh",
      role: "Engineering Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      articlesCount: "35 bài viết",
      followers: "4.8K người theo dõi",
    },
  ],
};

export default mockBlogData;
