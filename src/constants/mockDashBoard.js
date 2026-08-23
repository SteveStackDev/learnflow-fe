/**
 * Mock data cho trang Dashboard người dùng (FySet Private Control Center)
 */

export const dashboardData = {
  student: {
    id: "FYSET-84209",
    name: "Alex Smith",
    username: "Alex Smith",
    handle: "alex_smith",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    role: "FRONTEND DEVELOPER",
    joinDate: "01/01/2024",
    overallProgress: 82,
    completedLessonsCount: "82/100 bài",
    streakDays: 30,
    xpPoints: 4850,
    level: "Lv.14 Advanced Coder",
    badgeLevel: "THẺ HỌC VIÊN CAO CẤP",
    badgeIcons: [
      { name: "Award", label: "Chứng nhận Thành tựu" },
      { name: "Trophy", label: "Top 10% Contest" },
      { name: "CheckCircle", label: "Học viên Xác thực" },
      { name: "Zap", label: "Streak Master 30 ngày" },
    ],
  },

  // 1. Hero Action Banner (AI Powered)
  heroBanner: {
    tag: "BÀI HỌC GẦN NHẤT",
    title: "Mastering React 19 Compiler & Performance",
    currentModule: "Module 4: Advanced React Patterns & Custom Hooks Optimization",
    progress: 74,
    remainingInfo: "Còn 2 bài học • 14/18 bài đã hoàn thành",
    actionText: "Tiếp tục học ngay",
    to: "/course/react-19-mastery",
    aiNudge: {
      type: "warning",
      title: "Nhắc nhở từ AI Assistant",
      message: "Bạn có 2 bài tập thuật toán 'Binary Search' tỷ lệ làm đúng 45%. Nên ôn tập lại để củng cố lỗ hổng kiến thức!",
      actionText: "Ôn tập bài tập",
      to: "/problem",
    },
  },

  // 2. AI Skill Diagnostics & Radar Chart Data
  skillDiagnostics: {
    score: "85/100",
    status: "RẤT TỐT",
    axes: [
      { key: "algo", label: "Algorithms", score: 85, fullMark: 100 },
      { key: "ds", label: "Data Struct", score: 78, fullMark: 100 },
      { key: "react", label: "React & FE", score: 92, fullMark: 100 },
      { key: "system", label: "System Design", score: 70, fullMark: 100 },
      { key: "sql", label: "SQL & DB", score: 88, fullMark: 100 },
      { key: "solving", label: "Problem Solving", score: 84, fullMark: 100 },
    ],
    strengths: [
      "Khả năng đóng gói React Custom Hooks & State Management tối ưu.",
      "Xử lý truy vấn SQL & Indexing cơ sở dữ liệu rất chắc chắn.",
    ],
    weaknesses: [
      "Cần cải thiện giải thuật Quy hoạch động (Dynamic Programming).",
      "Thiết kế kiến trúc Cache với Redis cần thực hành thêm.",
    ],
    aiRecommendation: "Thực hành 2 bài tập LeetCode Medium về Dynamic Programming & Redis Caching để đạt mốc 90 điểm kĩ năng!",
  },

  // 3. Learning Roadmap & Capstone Progress
  enrolledCourses: [
    {
      id: "crs-1",
      title: "React 19 & Next.js App Router Mastery",
      progress: 74,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: "Lesson 19: Server Actions & React Compiler",
      category: "Frontend",
      to: "/course",
    },
    {
      id: "crs-2",
      title: "Data Structures & Algorithmic Problem Solving",
      progress: 60,
      totalLessons: 30,
      completedLessons: 18,
      nextLesson: "Lesson 19: Graph Traversal (BFS / DFS)",
      category: "Algorithms",
      to: "/course",
    },
    {
      id: "crs-3",
      title: "Node.js & Microservices Architecture",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: "Lesson 10: Event Driven Architecture with RabbitMQ",
      category: "Backend",
      to: "/course",
    },
  ],

  capstoneProject: {
    id: "cap-1",
    title: "Capstone #2: E-Commerce Microservices Platform",
    status: "REVIEWED", // 'SUBMITTED' | 'REVIEWED' | 'IN_PROGRESS'
    score: "8.5 / 10",
    mentorName: "Hoàng Vũ (Senior Lead)",
    mentorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    feedback: "Code tổ chức sạch sẽ, áp dụng đúng pattern. Cần tối ưu lại chỉ mục SQL ở bảng Transactions.",
    submittedAt: "22 Tháng 8, 2026",
  },

  // 4. Community Digest & Blog Highlights
  blogHighlights: [
    {
      id: "blog-1",
      title: "Tối ưu hóa Database Query cho hệ thống triệu User",
      author: {
        id: "usr-dev-1",
        name: "Nguyễn Văn Lập Trình",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      },
      likes: 1240,
      views: "24.5K",
      publishedAt: "Hôm nay",
      category: "Backend",
    },
    {
      id: "blog-2",
      title: "React 19 Server Actions vs Traditional API Routes: So sánh toàn diện",
      author: {
        id: "usr-dev-2",
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      },
      likes: 980,
      views: "18.2K",
      publishedAt: "Hôm qua",
      category: "Frontend",
    },
    {
      id: "blog-3",
      title: "Bí quyết chinh phục vòng phỏng vấn Coding Interview tại Big Tech",
      author: {
        id: "usr-dev-3",
        name: "Minh Trần",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      },
      likes: 1560,
      views: "31.0K",
      publishedAt: "2 ngày trước",
      category: "Career",
    },
  ],

  hotDiscussions: [
    {
      id: "disc-1",
      title: "Làm sao để xử lý re-render thừa khi dùng React Context với state phức tạp?",
      authorName: "DevQueen",
      replies: 18,
      likes: 45,
      time: "3 giờ trước",
    },
    {
      id: "disc-2",
      title: "Nên dùng Redis Caching ở tầng Service hay tầng Controller trong Node.js?",
      authorName: "AlgoMaster",
      replies: 12,
      likes: 29,
      time: "5 giờ trước",
    },
  ],

  // 5. Contribution Heatmap & Weekly Goal
  weeklyGoal: {
    hoursSpent: 12.5,
    hoursTarget: 15,
    problemsSolved: 9,
    problemsTarget: 10,
  },

  attendanceMatrix: [
    { date: "2026-07-08", count: 2, level: 1 },
    { date: "2026-07-09", count: 5, level: 3 },
    { date: "2026-07-10", count: 8, level: 4 },
    { date: "2026-07-11", count: 1, level: 1 },
    { date: "2026-07-12", count: 0, level: 0 },
    { date: "2026-07-13", count: 3, level: 2 },
    { date: "2026-07-14", count: 6, level: 3 },
    { date: "2026-07-15", count: 4, level: 2 },
    { date: "2026-07-16", count: 7, level: 4 },
    { date: "2026-07-17", count: 2, level: 1 },
    { date: "2026-07-18", count: 9, level: 4 },
    { date: "2026-07-19", count: 3, level: 2 },
    { date: "2026-07-20", count: 0, level: 0 },
    { date: "2026-07-21", count: 4, level: 2 },
    { date: "2026-07-22", count: 6, level: 3 },
    { date: "2026-07-23", count: 10, level: 4 },
    { date: "2026-07-24", count: 5, level: 3 },
    { date: "2026-07-25", count: 1, level: 1 },
    { date: "2026-07-26", count: 2, level: 1 },
    { date: "2026-07-27", count: 0, level: 0 },
    { date: "2026-07-28", count: 4, level: 2 },
    { date: "2026-07-29", count: 7, level: 4 },
    { date: "2026-07-30", count: 3, level: 2 },
    { date: "2026-07-31", count: 5, level: 3 },
    { date: "2026-08-01", count: 6, level: 3 },
    { date: "2026-08-02", count: 2, level: 1 },
    { date: "2026-08-03", count: 0, level: 0 },
    { date: "2026-08-04", count: 4, level: 2 },
    { date: "2026-08-05", count: 8, level: 4 },
    { date: "2026-08-06", count: 5, level: 3 },
    { date: "2026-08-07", count: 3, level: 2 },
    { date: "2026-08-08", count: 6, level: 3 },
    { date: "2026-08-09", count: 9, level: 4 },
    { date: "2026-08-10", count: 4, level: 2 },
    { date: "2026-08-11", count: 7, level: 4 },
    { date: "2026-08-12", count: 5, level: 3 },
  ],

  // RIGHT PANEL DATA
  // 1. AI Tutor Quick Assistant Presets
  aiTutorPresets: [
    "Giải thích lỗi Syntax",
    "Tối ưu độ phức tạp O(n)",
    "Ví dụ Code C++",
    "Cách dùng useMemo",
  ],

  // 2. Upcoming Events & Deadlines
  upcomingEvents: [
    {
      id: "evt-1",
      type: "DEADLINE",
      title: "Deadline Capstone Project #2",
      dueDate: "2026-08-25T23:59:59",
      targetText: "Còn 02 ngày 14 giờ",
      isUrgent: true,
      to: "/roadmap",
    },
    {
      id: "evt-2",
      type: "CONTEST",
      title: "Weekly Code Contest #42",
      time: "Thứ 7, 20:00 PM",
      targetText: "Đang mở đăng ký",
      to: "/contest",
    },
    {
      id: "evt-3",
      type: "LIVESTREAM",
      title: "Livestream Code Review với Senior Mentor",
      time: "Chủ Nhật, 15:00 PM",
      targetText: "Trực tuyến",
      to: "/chat",
    },
  ],

  // 3. Online Friends & Direct Messaging
  onlineFriends: [
    {
      id: "fnd-1",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      status: "online",
      currentActivity: "Đang giải bài Two Sum",
      bio: "Fullstack Developer | Đam mê Algorithmic Competitions.",
    },
    {
      id: "fnd-2",
      name: "Michael Steve",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      status: "online",
      currentActivity: "Đang học React 19 Masterclass",
      bio: "Frontend Engineer @ FySet Tech.",
    },
    {
      id: "fnd-3",
      name: "DevQueen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen",
      status: "busy",
      currentActivity: "Đang làm Capstone Project",
      bio: "UI/UX & Frontend Developer enthusiast.",
    },
    {
      id: "fnd-4",
      name: "AlgoMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Algo",
      status: "online",
      currentActivity: "Đang luyện tập Contest",
      bio: "Competitive Programmer - Top 5% Leaderboard.",
    },
  ],

  // 4. Mini Leaderboard (Top XP Gainers This Week)
  miniLeaderboard: [
    { rank: 1, name: "Michael Steve", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", xpGained: "+520 XP", isCurrentUser: false },
    { rank: 2, name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", xpGained: "+480 XP", isCurrentUser: false },
    { rank: 3, name: "Alex Smith", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", xpGained: "+420 XP", isCurrentUser: true },
    { rank: 4, name: "DevQueen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen", xpGained: "+350 XP", isCurrentUser: false },
  ],
};
