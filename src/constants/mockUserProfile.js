export const mockUserProfileData = {
  id: "user-01",
  handle: "alex_t",
  username: "Alex Tran",
  title: "Frontend Developer | React Enthusiast",
  bio: "Frontend Developer | React Enthusiast | Đang trong chuỗi học tập 30 ngày liên tiếp. Đam mê xây dựng các giao diện người dùng mượt mà và tối ưu hiệu suất.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  status: "online", // 'online' | 'dnd' | 'offline'
  statusMessage: "Đã đạt điểm cao trong...",
  userTitle: "Anh hùng bàn phím",
  badges: [
    { id: "b1", label: "Premium Member", variant: "primary" },
    { id: "b2", label: "Mentor", variant: "warning" },
  ],
  achievements: [
    { id: "a1", icon: "Code", label: "Code Master" },
    { id: "a2", icon: "Award", label: "Contest Winner" },
    { id: "a3", icon: "Rocket", label: "Top Performer" },
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  learning: {
    courseName: "Advanced Patterns in React",
    progress: 75,
  },
  stats: {
    totalXP: 12450,
    solvedProblems: 342,
    contestRank: "#12",
  },
  mutualFriendsCount: 12,
  mutualFriends: [
    {
      id: "user-02",
      name: "Alex Tran",
      handle: "alex_t",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "user-03",
      name: "Sarah Nguyen",
      handle: "sarahn",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
  ],
};

export const mockUsersMap = {
  "user-01": mockUserProfileData,
  "user-02": {
    ...mockUserProfileData,
    id: "user-02",
    handle: "corrupted_warrior",
    username: "Corrupted_Warrior",
    userTitle: "Anh hùng bàn phím",
    bio: "Ko có j khó sợ lòng ko bền =))",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80",
    status: "dnd",
    statusMessage: "Vui Lòng Không Làm Phiền 🔕",
  },
  "user-03": {
    ...mockUserProfileData,
    id: "user-03",
    handle: "sarahn",
    username: "Sarah Nguyen",
    userTitle: "Fullstack Developer",
    bio: "Yêu thích lập trình web và sáng tạo sản phẩm công nghệ.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80",
    status: "online",
    statusMessage: "Đang cày contest FySet 🚀",
  },
};
