export const COMMENT_CONTENT_TYPE_OPTIONS = [
  { value: "all", label: "All Content Types" },
  { value: "Course", label: "Course (Khóa học)" },
  { value: "Problem", label: "Problem (Bài tập)" },
  { value: "Blog", label: "Blog (Bài viết)" },
  { value: "Contest", label: "Contest (Cuộc thi)" },
  { value: "Other", label: "Other (Khác)" },
];

export const COMMENT_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Published", label: "Published (Hiển thị)" },
  { value: "Hidden", label: "Hidden (Đã ẩn)" },
  { value: "Deleted", label: "Deleted (Đã xóa)" },
];

export const COMMENT_REPORTED_OPTIONS = [
  { value: "all", label: "Reported: Tất cả" },
  { value: "reported_only", label: "Chỉ bài bị báo cáo" },
  { value: "clean", label: "Không có báo cáo" },
];

export const COMMENT_DATE_OPTIONS = [
  { value: "all", label: "Date: Tất cả" },
  { value: "today", label: "Hôm nay" },
  { value: "this_week", label: "Tuần này" },
  { value: "this_month", label: "Tháng này" },
];

export const INITIAL_COMMENTS = [
  {
    id: "cmt-201",
    user: {
      id: "usr-101",
      name: "Michael Steve",
      username: "steve_dev",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    text: "Bài tập Two Sum này dùng giải thuật HashMap rất tối ưu O(N), mọi người nhớ lưu ý trường hợp trùng lặp giá trị nhé!",
    contentType: "Problem",
    relatedContent: {
      id: "p1",
      title: "PROB-001: Two Sum",
      link: "/problem/two-sum",
    },
    parentComment: null,
    reportsCount: 0,
    status: "Published",
    date: "22 Aug 2026 08:30",
    replies: [
      {
        id: "cmt-201-1",
        user: { name: "Alex Chen", username: "alexchen", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
        text: "Cảm ơn bác, giải thích rất dễ hiểu!",
        date: "22 Aug 2026 08:45",
      },
    ],
    reports: [],
  },
  {
    id: "cmt-202",
    user: {
      id: "usr-104",
      name: "John Doe",
      username: "johndoe_spammer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    text: "Truy cập ngay link này để nhận giftcode miễn phí 100$: http://fake-crypto-scam.xyz",
    contentType: "Course",
    relatedContent: {
      id: "c1",
      title: "ReactJS từ cơ bản đến nâng cao",
      link: "/course/reactjs-co-ban",
    },
    parentComment: null,
    reportsCount: 5,
    status: "Hidden",
    date: "21 Aug 2026 14:10",
    replies: [],
    reports: [
      { id: "rep-1", reporter: "Alex Chen", reason: "Spam link lừa đảo / Crypto scam", reportedAt: "21 Aug 2026 14:15", status: "Pending" },
      { id: "rep-2", reporter: "Minh Thu", reason: "Nội dung rác quảng cáo", reportedAt: "21 Aug 2026 14:20", status: "Pending" },
      { id: "rep-3", reporter: "Sophia Taylor", reason: "Phát tán liên kết độc hại", reportedAt: "21 Aug 2026 14:30", status: "Pending" },
    ],
  },
  {
    id: "cmt-203",
    user: {
      id: "usr-102",
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    },
    text: "Cho mình hỏi đề thi Weekly Challenge #42 tuần này có cho dùng thư viện C++ STL map không ạ?",
    contentType: "Contest",
    relatedContent: {
      id: "cnt-101",
      title: "Weekly Challenge #42",
      link: "/contest/weekly-42",
    },
    parentComment: null,
    reportsCount: 0,
    status: "Published",
    date: "20 Aug 2026 19:15",
    replies: [
      {
        id: "cmt-203-1",
        user: { name: "Elena Rostova", username: "elena_r", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
        text: "Có nhé bạn, tất cả thư viện chuẩn C++20 STL đều được chấp nhận.",
        date: "20 Aug 2026 19:20",
      },
    ],
    reports: [],
  },
  {
    id: "cmt-204",
    user: {
      id: "usr-103",
      name: "Elena Rostova",
      username: "elena_r",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    text: "Bài viết chia sẻ lộ trình học React 2026 rất chi tiết. Cảm ơn tác giả!",
    contentType: "Blog",
    relatedContent: {
      id: "b1",
      title: "Lộ trình Master ReactJS năm 2026",
      link: "/blog/react-2026",
    },
    parentComment: null,
    reportsCount: 0,
    status: "Published",
    date: "18 Aug 2026 11:00",
    replies: [],
    reports: [],
  },
];
