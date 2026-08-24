export const BLOG_CATEGORY_OPTIONS = [
  { value: "all", label: "Category: Tất cả" },
  { value: "Technology", label: "Technology (Công nghệ)" },
  { value: "Tutorial", label: "Tutorial (Hướng dẫn)" },
  { value: "Announcement", label: "Announcement (Thông báo)" },
  { value: "Career", label: "Career (Sự nghiệp)" },
];

export const BLOG_AUTHOR_OPTIONS = [
  { value: "all", label: "Author: Tất cả" },
  { value: "Michael Steve", label: "Michael Steve" },
  { value: "Elena Rostova", label: "Elena Rostova" },
  { value: "Alex Chen", label: "Alex Chen" },
];

export const BLOG_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Published", label: "Published (Đã xuất bản)" },
  { value: "Draft", label: "Draft (Bản nháp)" },
  { value: "Archived", label: "Archived (Lưu trữ)" },
];

export const BLOG_DATE_OPTIONS = [
  { value: "all", label: "Date: Tất cả" },
  { value: "this_month", label: "Tháng này" },
  { value: "this_year", label: "Năm 2026" },
  { value: "older", label: "Cũ hơn" },
];

export const FORM_BLOG_CATEGORY_OPTIONS = [
  { value: "Technology", label: "Technology (Công nghệ)" },
  { value: "Tutorial", label: "Tutorial (Hướng dẫn)" },
  { value: "Announcement", label: "Announcement (Thông báo)" },
  { value: "Career", label: "Career (Sự nghiệp)" },
];

export const FORM_BLOG_STATUS_OPTIONS = [
  { value: "Published", label: "Published (Đã xuất bản)" },
  { value: "Draft", label: "Draft (Bản nháp)" },
  { value: "Archived", label: "Lưu trữ (Archived)" },
];

export const INITIAL_BLOGS = [
  {
    id: "blog-301",
    title: "Lộ Trình Học Master ReactJS Từ Cơ Bản Đến Nâng Cao 2026",
    slug: "lo-trinh-master-reactjs-2026",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    category: "Tutorial",
    tags: "ReactJS, Frontend, WebDev, JavaScript",
    author: "Elena Rostova",
    status: "Published",
    date: "18 Aug 2026",
    content: "ReactJS 19 mang đến nhiều tính năng vượt trội như Server Actions, Compiler tự động tối ưu hóa re-render và các Hooks mới như useFormStatus, useOptimistic. Trong bài viết này chúng ta sẽ cùng tìm hiểu chi tiết...",
    seoTitle: "Lộ Trình Học Master ReactJS Từ Cơ Bản Đến Nâng Cao 2026 | FySet",
    seoDescription: "Khám phá lộ trình học ReactJS mới nhất năm 2026 cùng các tính năng hàng đầu của React 19 dành cho Frontend Developer.",
    stats: {
      views: 12450,
      likes: 890,
      comments: 142,
      shares: 320,
      readingTime: "8 phút",
    },
  },
  {
    id: "blog-302",
    title: "Bí Quyết Chinh Phục Đấu Trường Contest Thuật Toán Hàng Tuần",
    slug: "bi-quyet-chinh-phuc-contest-thuat-toan",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    category: "Technology",
    tags: "Algorithm, Contest, C++, Competitive Programming",
    author: "Michael Steve",
    status: "Published",
    date: "15 Aug 2026",
    content: "Competitive Programming không chỉ đòi hỏi kiến thức về Cấu trúc dữ liệu & Thuật toán mà còn yêu cầu kỹ năng quản lý thời gian, chiến thuật giải bài và tối ưu bộ nhớ...",
    seoTitle: "Bí Quyết Chinh Phục Đấu Trường Contest Thuật Toán Hàng Tuần | FySet",
    seoDescription: "Tổng hợp chiến thuật tham gia contest lập trình hiệu quả giúp bạn nâng cao thứ hạng trên bảng xếp hạng FySet.",
    stats: {
      views: 8920,
      likes: 640,
      comments: 78,
      shares: 195,
      readingTime: "6 phút",
    },
  },
  {
    id: "blog-303",
    title: "Thông Báo Cập Nhật Phiên Bản FySet v2.5: Đấu Trường Contest Mới",
    slug: "thong-bao-cap-nhat-fyset-v25",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    category: "Announcement",
    tags: "FySet, Release, Updates, Contest",
    author: "Elena Rostova",
    status: "Draft",
    date: "20 Aug 2026",
    content: "Đội ngũ phát triển FySet xin trân trọng thông báo phiên bản v2.5 với giao diện quản lý cuộc thi hoàn toàn mới, tích hợp chấm bài tự động theo thời gian thực...",
    seoTitle: "Thông Báo Cập Nhật Phiên Bản FySet v2.5 | FySet",
    seoDescription: "Khám phá các tính năng mới nhất trong bản cập nhật FySet v2.5 vừa được ra mắt.",
    stats: {
      views: 450,
      likes: 32,
      comments: 5,
      shares: 12,
      readingTime: "3 phút",
    },
  },
];
