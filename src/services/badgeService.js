import api from "./api";
import { badgeData as mockBadgeData } from "~/constants/mockBadge";

// Adapter chuẩn hóa dữ liệu danh hiệu từ MongoDB sang UI
export const adaptBadge = (badge) => {
  if (!badge) return null;

  return {
    id: badge._id?.toString() || badge.id,
    name: badge.name,
    description: badge.description,
    iconUrl:
      badge.thumbnail ||
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&auto=format&fit=crop&q=80",
    category: badge.category,
    rarity: badge.rarity,
    pointsReward: badge.pointsReward || 50,
    criteria: badge.criteria || {},
    earnedCount: badge.stats.earnedCount,
    tabs: [],
    raw: badge,
  };
};

export const badgeService = {
  getAllBadges: async () => {
    try {
      const data = await api.get("/badge/all");
      console.log(data.map(adaptBadge));
      return data.map(adaptBadge);
    } catch (error) {
      console.warn("⚠️ [badgeService] Dùng mock danh hiệu dự phòng:", error.message);
      return mockBadgeData;
    }
  },
};

export default badgeService;
