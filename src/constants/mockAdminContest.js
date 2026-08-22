export const CONTEST_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Live", label: "Live (Đang diễn ra)" },
  { value: "Upcoming", label: "Upcoming (Sắp diễn ra)" },
  { value: "Ended", label: "Ended (Đã kết thúc)" },
];

export const CONTEST_TYPE_OPTIONS = [
  { value: "all", label: "Type: Tất cả" },
  { value: "Weekly", label: "Weekly Challenge" },
  { value: "Seasonal", label: "Seasonal Cup" },
  { value: "Special", label: "Special Event" },
];

export const CONTEST_DATE_OPTIONS = [
  { value: "all", label: "Date: Tất cả" },
  { value: "this_week", label: "Tuần này" },
  { value: "this_month", label: "Tháng này" },
  { value: "upcoming_7days", label: "7 ngày tới" },
];

export const FORM_CONTEST_STATUS_OPTIONS = [
  { value: "Live", label: "Live (Đang diễn ra)" },
  { value: "Upcoming", label: "Upcoming (Sắp diễn ra)" },
  { value: "Ended", label: "Ended (Đã kết thúc)" },
];

export const FORM_VISIBILITY_OPTIONS = [
  { value: "Public", label: "Public (Công khai)" },
  { value: "Private", label: "Private (Riêng tư - Yêu cầu mã)" },
];

export const INITIAL_CONTESTS = [
  {
    id: "cnt-101",
    title: "Weekly Challenge #42",
    type: "Weekly",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    description: "Thách thức thuật toán tuần với 4 bài tập từ dễ đến khó. Phù hợp cho luyện tập tư duy logic.",
    startTime: "20 Aug 2026 19:00",
    endTime: "20 Aug 2026 21:00",
    registrationTime: "15 Aug - 20 Aug 2026",
    participantsCount: 1284,
    activeParticipants: 1042,
    status: "Live",
    visibility: "Public",
    rules: "Thí sinh có 120 phút để hoàn thành 4 bài tập. Điểm số tính theo thời gian nộp bài và số testcase đúng. Mỗi lần nộp sai sẽ chịu phạt (penalty) 5 phút.",
    problems: [
      { id: "p1", code: "PROB-001", title: "Two Sum", score: 100, difficulty: "Easy" },
      { id: "p2", code: "PROB-002", title: "Valid Parentheses", score: 150, difficulty: "Easy" },
      { id: "p3", code: "PROB-003", title: "Binary Tree Level Order Traversal", score: 200, difficulty: "Medium" },
      { id: "p4", code: "PROB-004", title: "Trapping Rain Water", score: 300, difficulty: "Hard" },
    ],
  },
  {
    id: "cnt-102",
    title: "Summer Coding Cup 2026",
    type: "Seasonal",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    description: "Giải đấu lập trình mùa hè thường niên với tổng giải thưởng lên đến $5,000 USD.",
    startTime: "25 Aug 2026 14:00",
    endTime: "27 Aug 2026 18:00",
    registrationTime: "01 Aug - 24 Aug 2026",
    participantsCount: 3821,
    activeParticipants: 3100,
    status: "Upcoming",
    visibility: "Public",
    rules: "Thi đấu theo hình thức tự do trong 48 giờ. Hỗ trợ C++, Java, Python, JavaScript. Nghiêm cấm mọi hành vi gian lận hoặc chia sẻ bài làm.",
    problems: [
      { id: "p5", code: "PROB-005", title: "Longest Substring Without Repeating", score: 150, difficulty: "Medium" },
      { id: "p6", code: "PROB-006", title: "Merge K Sorted Lists", score: 250, difficulty: "Hard" },
      { id: "p7", code: "PROB-007", title: "Median of Two Sorted Arrays", score: 300, difficulty: "Hard" },
    ],
  },
  {
    id: "cnt-103",
    title: "AI Hackathon Warmup 2026",
    type: "Special",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    description: "Vòng khởi động kỳ thi lập trình chuyên sâu về cấu trúc dữ liệu nâng cao.",
    startTime: "10 Aug 2026 09:00",
    endTime: "10 Aug 2026 12:00",
    registrationTime: "01 Aug - 09 Aug 2026",
    participantsCount: 890,
    activeParticipants: 840,
    status: "Ended",
    visibility: "Public",
    rules: "Thời gian làm bài 180 phút.",
    problems: [
      { id: "p8", code: "PROB-008", title: "Climbing Stairs", score: 100, difficulty: "Easy" },
      { id: "p9", code: "PROB-009", title: "Coin Change", score: 200, difficulty: "Medium" },
    ],
  },
  {
    id: "cnt-104",
    title: "FySet Rookie Contest #10",
    type: "Weekly",
    banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    description: "Kỳ thi dành riêng cho các tân thủ mới làm quen với lập trình thuật toán.",
    startTime: "28 Aug 2026 20:00",
    endTime: "28 Aug 2026 22:00",
    registrationTime: "20 Aug - 28 Aug 2026",
    participantsCount: 2150,
    activeParticipants: 0,
    status: "Upcoming",
    visibility: "Public",
    rules: "4 bài tập độ khó Easy - Medium.",
    problems: [
      { id: "p1", code: "PROB-001", title: "Two Sum", score: 100, difficulty: "Easy" },
    ],
  },
];

export const MOCK_CONTEST_PARTICIPANTS = [
  { id: "usr-1", name: "Alex Chen", username: "alexchen", email: "alex.c@gmail.com", joinedDate: "16 Aug 2026", status: "Active" },
  { id: "usr-2", name: "Minh Thu", username: "minhthu_dev", email: "thu.minh@gmail.com", joinedDate: "17 Aug 2026", status: "Active" },
  { id: "usr-3", name: "David Miller", username: "dmiller99", email: "david.m@yahoo.com", joinedDate: "18 Aug 2026", status: "Active" },
  { id: "usr-4", name: "Nguyen Van B", username: "nguyenb", email: "vanb@gmail.com", joinedDate: "19 Aug 2026", status: "Active" },
  { id: "usr-5", name: "Sophia Taylor", username: "sophiat", email: "sophia@gmail.com", joinedDate: "20 Aug 2026", status: "Active" },
];

export const MOCK_CONTEST_RANKINGS = [
  { rank: 1, name: "Alex Chen", username: "alexchen", score: 750, solved: "4/4", penalty: "42:15", status: "Finished" },
  { rank: 2, name: "David Miller", username: "dmiller99", score: 650, solved: "4/4", penalty: "58:30", status: "Finished" },
  { rank: 3, name: "Minh Thu", username: "minhthu_dev", score: 450, solved: "3/4", penalty: "35:10", status: "In Progress" },
  { rank: 4, name: "Sophia Taylor", username: "sophiat", score: 250, solved: "2/4", penalty: "20:45", status: "In Progress" },
  { rank: 5, name: "Nguyen Van B", username: "nguyenb", score: 100, solved: "1/4", penalty: "12:00", status: "In Progress" },
];
