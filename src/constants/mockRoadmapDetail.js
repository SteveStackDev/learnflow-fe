export const mockRoadmapDetailData = {
  id: "frontend-developer",
  title: "Lộ trình Nghề nghiệp Lập trình viên Frontend",
  badge: "Lộ trình Chứng chỉ Chuyên nghiệp",
  description:
    "Thành thạo nghệ thuật xây dựng ứng dụng web hiện đại, chuẩn responsive và hiệu năng cao. Từ nền tảng HTML/CSS đến các React Pattern nâng cao, lộ trình này sẽ dẫn dắt bạn qua từng kỹ năng cốt lõi.",
  difficulty: "Trung bình",
  estTime: "6 Tháng",
  learners: "12.450+",

  outcomes: [
    {
      id: "out-1",
      code: "HTML",
      title: "Semantic HTML",
      description: "Xây dựng cấu trúc trang chuẩn SEO, dễ truy cập & tối ưu chuẩn web.",
      color: "#ea580c",
      bgLight: "#fff7ed",
    },
    {
      id: "out-2",
      code: "CSS",
      title: "Modern CSS & Grid",
      description: "Tạo giao diện tương thích đa màn hình (Responsive) & hiệu ứng mượt mà.",
      color: "#0284c7",
      bgLight: "#f0f9ff",
    },
    {
      id: "out-3",
      code: "JS",
      title: "JS DOM Manipulation",
      description: "Thành thạo JavaScript thuần để tương tác và điều khiển trình duyệt.",
      color: "#d97706",
      bgLight: "#fefce8",
    },
    {
      id: "out-4",
      code: "RE",
      title: "Hệ sinh thái React",
      description: "Phát triển ứng dụng SPA quy mô lớn với Component, JSX & Custom Hooks.",
      color: "#0950c3",
      bgLight: "#e0ebff",
    },
    {
      id: "out-5",
      code: "ST",
      title: "Quản lý State nâng cao",
      description: "Quản lý luồng dữ liệu ứng dụng phức tạp với Redux Toolkit hoặc Zustand.",
      color: "#7c3aed",
      bgLight: "#f5f3ff",
    },
    {
      id: "out-6",
      code: "TE",
      title: "Testing & Deployment",
      description: "Đảm bảo chất lượng phần mềm với Unit Test và triển khai lên Production.",
      color: "#059669",
      bgLight: "#ecfdf5",
    },
  ],

  timelinePath: [
    {
      id: "step-1",
      stepNumber: 1,
      title: "Tong quan Internet & HTML5",
      status: "completed", // 'completed' | 'in-progress' | 'locked'
      description:
        "Hiểu về nguyên lý hoạt động của Web, DNS, HTTP và viết mã HTML5 chuẩn Semantic.",
      tags: ["Semantic Tags", "Form Validation", "Accessibility"],
    },
    {
      id: "step-2",
      stepNumber: 2,
      title: "Nền tảng CSS3 & Responsive",
      status: "completed",
      description:
        "Thành thạo tạo kiểu giao diện, thiết kế Responsive với Flexbox, CSS Grid và Animation.",
      tags: ["Flexbox", "CSS Grid", "Animations"],
    },
    {
      id: "step-3",
      stepNumber: 3,
      title: "Lập trình JavaScript cơ bản & Bất đồng bộ",
      status: "in-progress",
      description:
        "Nắm vững cú pháp ES6+, cấu trúc dữ liệu, thao tác DOM API và xử lý Promise/Async-Await.",
      tags: ["ES6+", "Promises/Async", "DOM API"],
      actionLabel: "Tiếp tục học mốc này",
    },
    {
      id: "step-4",
      stepNumber: 4,
      title: "Quản lý mã nguồn với Git & GitHub",
      status: "locked",
      description:
        "Học cách quản lý phiên bản code, phân nhánh (Branching) và làm việc nhóm trên GitHub.",
      tags: ["Git CLI", "GitHub", "Branching"],
    },
    {
      id: "step-5",
      stepNumber: 5,
      title: "Lập trình ReactJS & Custom Hooks",
      status: "locked",
      description:
        "Bắt đầu với hệ sinh thái React hiện đại, JSX, State, Props và kiến trúc Component.",
      tags: ["JSX", "Component State", "Custom Hooks"],
    },
  ],

  technologies: [
    { code: "H5", name: "HTML5", color: "#ea580c" },
    { code: "C3", name: "CSS3", color: "#0284c7" },
    { code: "JS", name: "JavaScript", color: "#d97706" },
    { code: "Re", name: "React", color: "#0950c3" },
    { code: "TS", name: "TypeScript", color: "#2563eb" },
  ],

  recommendedCourses: [
    {
      id: "rec-1",
      title: "Chuyên sâu về Async JavaScript",
      duration: "4h 30m",
      type: "Khóa học",
      thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "rec-2",
      title: "Các Pattern thao tác DOM hiện đại",
      duration: "2h 15m",
      type: "Khóa học",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
    },
  ],

  practiceProblems: [
    {
      id: "prob-1",
      title: "Viết Polyfill cho Promise.all()",
      difficulty: "Trung bình",
      topic: "JavaScript",
      description: "Thực hành viết lại phương thức Promise.all bằng JS thuần.",
    },
    {
      id: "prob-2",
      title: "Viết hàm Debounce tối ưu",
      difficulty: "Dễ",
      topic: "JavaScript",
      description: "Xây dựng hàm utility debounce xử lý sự kiện gõ phím.",
    },
  ],
};
