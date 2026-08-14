export const mockBadgeDetailMap = {
  "30-day-streak": {
    id: "30-day-streak",
    title: "30 Day Streak",
    description:
      "Dành cho những người học duy trì chuỗi học tập trong 30 ngày liên tiếp. Sự kỷ luật là chìa khóa của thành công.",
    iconName: "Flame",
    tierTag: "Huyền thoại",
    tierVariant: "legendary",
    categoryTag: "Kỷ luật",
    requirementText: "Duy trì chuỗi học tập (Streak) 30 ngày liên tục.",
    progressCurrent: 30,
    progressTotal: 30,
    progressUnit: "ngày",
    earnedDate: "01 tháng 08, 2026",
    totalOwners: "1,240 người",
    status: "received",
  },
  "badge-1": {
    id: "badge-1",
    title: "Chiến binh Streak",
    description: "Duy trì streak học tập trong 7 ngày liên tiếp không nghỉ.",
    iconName: "Flame",
    tierTag: "Xuất sắc",
    tierVariant: "gold",
    categoryTag: "Kỷ luật",
    requirementText: "Hoàn thành 1 bài học mỗi ngày trong 7 ngày liên tục.",
    progressCurrent: 7,
    progressTotal: 7,
    progressUnit: "ngày",
    earnedDate: "15 tháng 07, 2026",
    totalOwners: "3,890 người",
    status: "received",
  },
  "badge-2": {
    id: "badge-2",
    title: "Người tiên phong",
    description: "Hoàn thành khóa học đầu tiên trong tuần đầu tham gia.",
    iconName: "Crown",
    tierTag: "Huyền thoại",
    tierVariant: "legendary",
    categoryTag: "Khóa học",
    requirementText: "Hoàn thành 100% video và bài kiểm tra khóa nhập môn.",
    progressCurrent: 1,
    progressTotal: 1,
    progressUnit: "khóa",
    earnedDate: "20 tháng 06, 2026",
    totalOwners: "2,150 người",
    status: "received",
  },
  "badge-3": {
    id: "badge-3",
    title: "Master Frontend",
    description: "Hoàn thành toàn bộ lộ trình học Frontend Developer chuyên nghiệp.",
    iconName: "Code",
    tierTag: "Huyền thoại",
    tierVariant: "legendary",
    categoryTag: "Lộ trình",
    requirementText: "Đạt 100% chứng chỉ thuộc Lộ trình Frontend.",
    progressCurrent: 4,
    progressTotal: 6,
    progressUnit: "chủ đề",
    earnedDate: "Chưa đạt",
    totalOwners: "412 người",
    status: "locked",
  },
};

export const defaultBadgeDetail = mockBadgeDetailMap["30-day-streak"];

export function getBadgeDetailById(id) {
  if (!id) return defaultBadgeDetail;
  const normalizedId = String(id).toLowerCase();
  return (
    mockBadgeDetailMap[normalizedId] || {
      ...defaultBadgeDetail,
      id: id,
      title: id.replace(/-/g, " ").toUpperCase(),
    }
  );
}
