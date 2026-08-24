export const USER_ROLE_OPTIONS = [
  { value: "all", label: "Role: Tất cả" },
  { value: "User", label: "User (Học viên)" },
  { value: "Admin", label: "Admin (Quản trị)" },
  { value: "Moderator", label: "Moderator (Điều hành)" },
];

export const USER_PLAN_OPTIONS = [
  { value: "all", label: "Plan: Tất cả" },
  { value: "Free", label: "Free Plan" },
  { value: "Pro", label: "Pro Membership" },
  { value: "Enterprise", label: "Enterprise Plan" },
];

export const USER_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Active", label: "Active (Hoạt động)" },
  { value: "Blocked", label: "Blocked (Tạm khóa)" },
  { value: "Banned", label: "Banned (Cấm vĩnh viễn)" },
];

export const USER_JOINED_OPTIONS = [
  { value: "all", label: "Joined Date: Tất cả" },
  { value: "this_month", label: "Tháng này" },
  { value: "this_year", label: "Năm 2026" },
  { value: "older", label: "Cũ hơn" },
];

export const FORM_USER_ROLE_OPTIONS = [
  { value: "User", label: "User (Học viên)" },
  { value: "Admin", label: "Admin (Quản trị)" },
  { value: "Moderator", label: "Moderator (Điều hành)" },
];

export const FORM_USER_PLAN_OPTIONS = [
  { value: "Free", label: "Free Plan" },
  { value: "Pro", label: "Pro Membership" },
  { value: "Enterprise", label: "Enterprise Plan" },
];

export const FORM_USER_STATUS_OPTIONS = [
  { value: "Active", label: "Active (Hoạt động)" },
  { value: "Blocked", label: "Blocked (Tạm khóa)" },
  { value: "Banned", label: "Banned (Cấm vĩnh viễn)" },
];

export const INITIAL_USERS = [
  {
    id: "usr-101",
    name: "Michael Steve",
    username: "steve_dev",
    email: "michael.steve@fytech.io",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    role: "User",
    plan: "Pro",
    status: "Active",
    joinedDate: "15 Jan 2026",
    lastLogin: "22 Aug 2026 09:15",
    ipAddress: "118.69.182.45 (Ho Chi Minh, Vietnam)",
    subscription: "Pro Yearly - Renews on 15 Jan 2027",
    phone: "+84 912 345 678",
    bio: "Fullstack developer passionate about algorithms and React architecture.",
    coursesEnrolled: [
      { id: "c1", title: "ReactJS từ cơ bản đến nâng cao", progress: 85, status: "In Progress" },
      { id: "c2", title: "Cấu trúc dữ liệu & Thuật toán C++", progress: 100, status: "Completed" },
    ],
    solvedProblems: [
      { id: "p1", code: "PROB-001", title: "Two Sum", difficulty: "Easy", solvedAt: "20 Aug 2026" },
      { id: "p2", code: "PROB-002", title: "Valid Parentheses", difficulty: "Easy", solvedAt: "21 Aug 2026" },
    ],
    contestsParticipated: [
      { id: "cnt1", title: "Weekly Challenge #42", rank: 1, score: 750, status: "Finished" },
    ],
    badgesEarned: [
      { id: "b1", title: "Algorithm Master", icon: "Award", description: "Giải thành công 100+ bài tập" },
      { id: "b2", title: "Contest Champion", icon: "Trophy", description: "Đạt Top 1 cuộc thi tuần" },
    ],
    transactions: [
      { id: "tx-901", date: "15 Jan 2026", item: "Pro Membership (1 Year)", amount: "$119.00 USD", status: "Paid" },
    ],
    commentsCount: 24,
    reportsCount: 0,
  },
  {
    id: "usr-102",
    name: "Alex Chen",
    username: "alexchen",
    email: "alex.chen@gmail.com",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    role: "User",
    plan: "Free",
    status: "Active",
    joinedDate: "10 Feb 2026",
    lastLogin: "21 Aug 2026 18:30",
    ipAddress: "14.241.12.89 (Ha Noi, Vietnam)",
    subscription: "Free Tier",
    phone: "+84 987 654 321",
    bio: "Computer Science student.",
    coursesEnrolled: [
      { id: "c1", title: "ReactJS từ cơ bản đến nâng cao", progress: 40, status: "In Progress" },
    ],
    solvedProblems: [
      { id: "p1", code: "PROB-001", title: "Two Sum", difficulty: "Easy", solvedAt: "19 Aug 2026" },
    ],
    contestsParticipated: [],
    badgesEarned: [
      { id: "b3", title: "First Step", icon: "Zap", description: "Hoàn thành bài tập đầu tiên" },
    ],
    transactions: [],
    commentsCount: 5,
    reportsCount: 0,
  },
  {
    id: "usr-103",
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena.rostova@tech.de",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "Admin",
    plan: "Enterprise",
    status: "Active",
    joinedDate: "01 Jan 2026",
    lastLogin: "22 Aug 2026 08:45",
    ipAddress: "85.214.132.10 (Berlin, Germany)",
    subscription: "Enterprise License",
    phone: "+49 30 123456",
    bio: "Senior System Architect & FySet Instructor.",
    coursesEnrolled: [],
    solvedProblems: [],
    contestsParticipated: [],
    badgesEarned: [
      { id: "b4", title: "FySet Founding Admin", icon: "Shield", description: "Thành viên ban quản trị sáng lập" },
    ],
    transactions: [],
    commentsCount: 142,
    reportsCount: 0,
  },
  {
    id: "usr-104",
    name: "John Doe",
    username: "johndoe_spammer",
    email: "john.spam@fake.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "User",
    plan: "Free",
    status: "Banned",
    joinedDate: "05 Aug 2026",
    lastLogin: "12 Aug 2026 14:10",
    ipAddress: "192.168.1.1 (Proxy Detected)",
    subscription: "Free Tier",
    phone: "N/A",
    bio: "Spam account detected by security layer.",
    coursesEnrolled: [],
    solvedProblems: [],
    contestsParticipated: [],
    badgesEarned: [],
    transactions: [],
    commentsCount: 88,
    reportsCount: 12,
  },
];
