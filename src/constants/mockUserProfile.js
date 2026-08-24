/**
 * Mock Data Chi Tiết Cho Trang User Profile (Portfolio & Social Hub)
 */

export const mockUserProfileData = {
  id: "user-01",
  handle: "alex_smith",
  username: "Alex Smith",
  userTitle: "Senior Frontend Engineer & Open Source Contributor",
  bio: "Frontend Developer | React Enthusiast | Đang trong chuỗi học tập 30 ngày liên tiếp. Đam mê xây dựng các giao diện người dùng mượt mà và tối ưu hiệu suất hệ thống web.",
  technicalBio: "Frontend Specialist | React 19 & Next.js | TypeScript & Web Performance Optimizations",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  status: "online", // 'online' | 'dnd' | 'offline'
  statusMessage: "Đang nghiên cứu React 19 Server Actions 🚀",
  isSelf: true, // Mặc định khi tự xem Profile của chính mình
  isFollowing: false,

  badgeTags: [
    { id: "bt1", label: "Senior Mentor", variant: "warning" },
    { id: "bt2", label: "Pro Student", variant: "primary" },
    { id: "bt3", label: "Top Author #1", variant: "purple" },
    { id: "bt4", label: "Verified Member", variant: "success" },
  ],

  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://alexsmith.dev",
  },

  stats: {
    totalXP: 14850,
    solvedProblems: 342,
    contestRank: "#12 Global",
    reputation: "4.9/5 ⭐",
    blogsCount: 12,
    projectsCount: 8,
    badgesCount: 18,
    followersCount: 1420,
    followingCount: 280,
    friendsCount: 96,
  },

  // 1. Overview Tab Data
  verifiedSkills: {
    score: "92/100",
    axes: [
      { key: "react", label: "React & FE", score: 95 },
      { key: "ts", label: "TypeScript", score: 90 },
      { key: "algo", label: "Algorithms", score: 85 },
      { key: "system", label: "System Design", score: 80 },
      { key: "sql", label: "SQL & DB", score: 88 },
      { key: "css", label: "CSS & UI/UX", score: 94 },
    ],
  },

  featuredProjects: [
    {
      id: "prj-1",
      title: "FySet Learning Control Center",
      description: "Hệ thống quản lý học tập & luyện thi thuật toán trực tuyến với giao diện 3-Column Grid và AI Assistant.",
      tags: ["React 19", "Vite", "CSS Modules", "AI Diagnostics"],
      demoLink: "https://fyset.dev",
      githubLink: "https://github.com/alexsmith/fyset-app",
      stars: 340,
      isFeatured: true,
    },
    {
      id: "prj-2",
      title: "E-Commerce Microservices Engine",
      description: "Nền tảng thương mại điện tử với kiến trúc Microservices, Redis Caching và tích hợp thanh toán Stripe.",
      tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
      demoLink: "https://shop-engine.dev",
      githubLink: "https://github.com/alexsmith/shop-engine",
      stars: 512,
      isFeatured: true,
    },
  ],

  badgesCollection: [
    { id: "b1", title: "Streak Master 30", category: "Learning", icon: "Zap", unlockedAt: "10/08/2026", isUnlocked: true },
    { id: "b2", title: "Contest Top 10%", category: "Contest", icon: "Trophy", unlockedAt: "15/08/2026", isUnlocked: true },
    { id: "b3", title: "Top Community Author", category: "Community", icon: "Award", unlockedAt: "01/08/2026", isUnlocked: true },
    { id: "b4", title: "Bug Hunter Pro", category: "Contest", icon: "Shield", unlockedAt: "20/07/2026", isUnlocked: true },
    { id: "b5", title: "500 Solved Problems", category: "Learning", icon: "Target", unlockedAt: null, isUnlocked: false },
    { id: "b6", title: "Algorithm Master", category: "Contest", icon: "Crown", unlockedAt: null, isUnlocked: false },
  ],

  certificates: [
    {
      id: "cert-1",
      title: "Advanced React & Web Performance Certificate",
      issuer: "FySet Academy",
      issueDate: "Tháng 7, 2026",
      credentialId: "FYSET-CERT-88421",
    },
    {
      id: "cert-2",
      title: "Algorithms & Competitive Programming Master",
      issuer: "FySet Coding Guild",
      issueDate: "Tháng 6, 2026",
      credentialId: "FYSET-CERT-77319",
    },
  ],

  mutualFriends: [
    {
      id: "user-02",
      name: "Elena Rostova",
      handle: "elena_r",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "user-03",
      name: "Michael Steve",
      handle: "michael_s",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
  ],

  // 2. Blog Tab Data
  articles: [
    {
      id: "blog-1",
      title: "Tối ưu hóa Database Query cho hệ thống triệu User",
      description: "Bí quyết đánh Index, tối ưu hóa câu lệnh SQL, tận dụng Redis Caching và đọc Execution Plan để tránh điểm nghẽn hiệu suất.",
      publishedAt: "12/10/2024",
      views: "24.5K",
      likes: 1240,
      commentsCount: 88,
      category: "Backend",
      slug: "tai-uu-hoa-database-query",
    },
    {
      id: "blog-2",
      title: "React 19 Server Actions vs Traditional API Routes: So sánh toàn diện",
      description: "Phân tích chi tiết ưu nhược điểm của Server Actions trong React 19 so với REST API / GraphQL truyền thống.",
      publishedAt: "02/10/2024",
      views: "18.2K",
      likes: 980,
      commentsCount: 54,
      category: "Frontend",
      slug: "react-19-server-actions-vs-api",
    },
    {
      id: "blog-3",
      title: "Bí quyết chinh phục vòng phỏng vấn Coding Interview tại Big Tech",
      description: "Chia sẻ lộ trình ôn tập thuật toán 3 tháng, chiến thuật phân tích bài tập LeetCode Medium/Hard.",
      publishedAt: "15/09/2024",
      views: "31.0K",
      likes: 1560,
      commentsCount: 142,
      category: "Career",
      slug: "bi-quyet-phong-van-coding-interview",
    },
  ],

  // 3. Projects Tab Data
  projects: [
    {
      id: "prj-1",
      title: "FySet Learning Control Center",
      description: "Hệ thống quản lý học tập & luyện thi thuật toán trực tuyến với giao diện 3-Column Grid và AI Assistant.",
      tags: ["React 19", "Vite", "CSS Modules", "AI Diagnostics"],
      demoLink: "https://fyset.dev",
      githubLink: "https://github.com/alexsmith/fyset-app",
      stars: 340,
      forks: 48,
      updatedAt: "3 ngày trước",
    },
    {
      id: "prj-2",
      title: "E-Commerce Microservices Engine",
      description: "Nền tảng thương mại điện tử với kiến trúc Microservices, Redis Caching và tích hợp thanh toán Stripe.",
      tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
      demoLink: "https://shop-engine.dev",
      githubLink: "https://github.com/alexsmith/shop-engine",
      stars: 512,
      forks: 89,
      updatedAt: "1 tuần trước",
    },
    {
      id: "prj-3",
      title: "Algorithm Visualizer Pro",
      description: "Công cụ minh họa các thuật toán sắp xếp (Sorting), tìm kiếm đồ thị (BFS/DFS) bằng animation sinh động.",
      tags: ["TypeScript", "Canvas API", "Algorithms"],
      demoLink: "https://algo-viz.dev",
      githubLink: "https://github.com/alexsmith/algo-visualizer",
      stars: 215,
      forks: 32,
      updatedAt: "2 tuần trước",
    },
  ],

  // 4. Network & Activity Data
  network: {
    friends: [
      { id: "user-02", name: "Elena Rostova", handle: "elena_r", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", title: "Fullstack Developer", status: "online" },
      { id: "user-03", name: "Michael Steve", handle: "michael_s", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", title: "Frontend Specialist", status: "online" },
      { id: "user-04", name: "DevQueen", handle: "dev_queen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen", title: "UI/UX Designer & FE", status: "busy" },
    ],
    followers: [
      { id: "user-05", name: "AlgoMaster", handle: "algo_master", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Algo", title: "Competitive Programmer", status: "online" },
      { id: "user-06", name: "Hoàng Vũ", handle: "hoang_vu", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80", title: "Senior Lead Mentor", status: "offline" },
    ],
  },

  activities: [
    { id: "act-1", type: "ANSWER", title: "Đã trả lời câu hỏi: Cách xử lý re-render thừa khi dùng React Context?", time: "2 giờ trước", upvotes: 18 },
    { id: "act-2", type: "CONTEST", title: "Đạt Top 12 Weekly Code Contest #42 với 300 pts", time: "Hôm qua", upvotes: 42 },
    { id: "act-3", type: "BLOG", title: "Đã xuất bản bài viết mới: Tối ưu hóa Database Query cho hệ thống triệu User", time: "3 ngày trước", upvotes: 1240 },
  ],
};

export const mockUsersMap = {
  "user-01": mockUserProfileData,
  "user-02": {
    ...mockUserProfileData,
    id: "user-02",
    handle: "elena_r",
    username: "Elena Rostova",
    userTitle: "Fullstack Engineer & Tech Content Creator",
    technicalBio: "Fullstack Specialist | Node.js & React 19 | Microservices & Cloud",
    bio: "Yêu thích xây dựng ứng dụng quy mô lớn và chia sẻ kiến thức cộng đồng.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80",
    status: "online",
    statusMessage: "Đang chia sẻ kiến thức mới trên Blog ✍️",
    isSelf: false,
    isFollowing: true,
  },
  "user-03": {
    ...mockUserProfileData,
    id: "user-03",
    handle: "michael_s",
    username: "Michael Steve",
    userTitle: "Algorithms & Competitive Programming Enthusiast",
    technicalBio: "C++ & Python Specialist | Data Structures & Algorithms | Top 5% Contestant",
    bio: "Luyện tập giải thuật toán hàng ngày tại FySet.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80",
    status: "online",
    statusMessage: "Đang thi đấu Contest #42 🚀",
    isSelf: false,
    isFollowing: false,
  },
};
