export const leaderboardData = {
  tabs: ["Tổng xếp hạng", "Challenge", "Contest", "Streak", "Roadmap"],

  podium: [
    {
      rank: 2,
      name: "Minh Quân",
      points: "11,250 điểm",
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
    {
      rank: 1,
      name: "Khánh Vy",
      points: "12,500 điểm",
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
    {
      rank: 3,
      name: "Hoàng Nam",
      points: "10,800 điểm",
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
  ],

  rankings: [
    {
      rank: "#4",
      name: "Anh Đức",
      points: "10,240 điểm",
      trend: "up",
      isCurrentUser: false,
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
    {
      rank: "#5",
      name: "Bạn (Tôi)",
      points: "9,850 điểm",
      trend: "same",
      isCurrentUser: true,
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
    {
      rank: "#6",
      name: "Lan Hương",
      points: "9,420 điểm",
      trend: "down",
      isCurrentUser: false,
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
    {
      rank: "#7",
      name: "Quốc Bảo",
      points: "9,100 điểm",
      trend: "up",
      isCurrentUser: false,
      avatarUrl: "/src/assets/images/Home/hero.webp",
    },
  ],

  guides: [
    {
      title: "Giải challenge",
      description:
        "Hoàn thành các thử thách lập trình hàng ngày để nhận điểm thưởng lớn.",
      iconName: "IconPuzzle",
    },
    {
      title: "Thi đấu contest",
      description:
        "Tham gia các giải đấu hàng tuần và đánh bại đối thủ để bứt phá thứ hạng.",
      iconName: "IconTrophy",
    },
    {
      title: "Giữ streak",
      description:
        "Duy trì học tập mỗi ngày để nhận số nhân điểm thưởng (Multiplier).",
      iconName: "IconFire",
    },
    {
      title: "Hoàn thành roadmap",
      description:
        "Mỗi khóa học hoàn thành mang lại lượng kinh nghiệm (XP) khổng lồ.",
      iconName: "IconMap",
    },
  ],

  faqs: [
    {
      question: "Điểm xếp hạng được tính như thế nào?",
      answer:
        "Điểm được tổng hợp từ việc hoàn thành bài học, giải bài tập Lab chính xác và duy trì chuỗi học tập đều đặn.",
    },
    {
      question: "Bảng xếp hạng được cập nhật lúc nào?",
      answer:
        "Hệ thống cập nhật điểm số theo thời gian thực (Real-time) để đảm bảo tính cạnh tranh chính xác nhất.",
    },
    {
      question: "Phần thưởng cho Top 1 là gì?",
      answer:
        "Top 1 tuần và tháng sẽ nhận được huy hiệu độc quyền trên hồ sơ cùng quà tặng công nghệ hấp dẫn.",
    },
  ],
};
