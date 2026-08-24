export const INITIAL_MESSAGE_OVERVIEW = {
  totalMessages: "1.28M",
  totalConversations: "24,821",
  activeUsers: "2,481",
  reportedChats: "182",
  chartData: [
    { day: "T2", count: 42000 },
    { day: "T3", count: 58000 },
    { day: "T4", count: 64000 },
    { day: "T5", count: 72000 },
    { day: "T6", count: 89000 },
    { day: "T7", count: 95000 },
    { day: "CN", count: 81000 },
  ],
  stats: {
    newConversations: "1,240 / ngày",
    activeConversations: "2,481 cuộc gọi & chat",
    avgMessagesPerConv: "51 tin nhắn",
    avgResponseTime: "1.8 phút",
  },
};

export const MESSAGE_STATUS_OPTIONS = [
  { value: "all", label: "Status: Tất cả" },
  { value: "Active", label: "Active (Hoạt động)" },
  { value: "Reported", label: "Reported (Bị báo cáo)" },
  { value: "Archived", label: "Archived (Lưu trữ)" },
];

export const INITIAL_CONVERSATIONS = [
  {
    id: "conv-801",
    userA: {
      id: "usr-101",
      name: "Michael Steve",
      username: "steve_dev",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    userB: {
      id: "usr-103",
      name: "Elena Rostova",
      username: "elena_r",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    messagesCount: 84,
    lastActive: "22 Aug 2026 09:40",
    createdDate: "15 Jan 2026",
    reportsCount: 0,
    status: "Active",
    messages: [
      { id: "m1", sender: "Michael Steve", text: "Chào cô Elena, cho em hỏi về bài tập thuật toán Two Sum với ạ?", time: "09:30" },
      { id: "m2", sender: "Elena Rostova", text: "Chào Steve! Em có thể dùng phương pháp Hash Table để đạt độ phức tạp O(N) nhé.", time: "09:35" },
      { id: "m3", sender: "Michael Steve", text: "Dạ em cảm ơn cô nhiều ạ!", time: "09:40" },
    ],
  },
  {
    id: "conv-802",
    userA: {
      id: "usr-104",
      name: "John Doe",
      username: "johndoe_spammer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    userB: {
      id: "usr-102",
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    },
    messagesCount: 12,
    lastActive: "21 Aug 2026 14:12",
    createdDate: "21 Aug 2026",
    reportsCount: 4,
    status: "Reported",
    messages: [
      { id: "m10", sender: "John Doe", text: "Nhấp ngay vào đường link lừa đảo này để nhận tiền thưởng: http://crypto-fake.xyz", time: "14:10" },
      { id: "m11", sender: "Alex Chen", text: "Đã báo cáo tài khoản spam này cho quản trị viên.", time: "14:12" },
    ],
  },
  {
    id: "conv-803",
    userA: {
      id: "usr-102",
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    },
    userB: {
      id: "usr-101",
      name: "Michael Steve",
      username: "steve_dev",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    messagesCount: 38,
    lastActive: "20 Aug 2026 18:25",
    createdDate: "10 Feb 2026",
    reportsCount: 0,
    status: "Active",
    messages: [
      { id: "m20", sender: "Alex Chen", text: "Cậu có định tham gia Weekly Challenge #42 tối nay không?", time: "18:20" },
      { id: "m21", sender: "Michael Steve", text: "Có chứ, chiến thôi!", time: "18:25" },
    ],
  },
];
