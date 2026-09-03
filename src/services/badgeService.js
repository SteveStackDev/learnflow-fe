import api from "./api";
import { badgeData as mockBadgeData } from "~/constants/mockBadge";

const USE_MOCK = true;

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
    category: badge.category || "learning",
    rarity: badge.rarity || "common",
    pointsReward: badge.pointsReward || 50,
    criteria: badge.criteria || {},
    earnedCount: badge.stats?.earnedCount || 0,
    raw: badge,
  };
};

export const badgeService = {
  /**
   * Lấy danh sách tất cả các danh hiệu có thể mở khóa
   */
  getBadges: async (params = {}) => {
    if (USE_MOCK) {
      return mockBadgeData;
    }

    try {
      const data = await api.get("/badges", { params });
      if (Array.isArray(data)) {
        return data.map(adaptBadge);
      }
      return mockBadgeData;
    } catch (error) {
      console.warn("⚠️ [badgeService] Dùng mock danh hiệu dự phòng:", error.message);
      return mockBadgeData;
    }
  },

  /**
   * Lấy danh sách danh hiệu của người dùng hiện tại
   */
  getMyBadges: async () => {
    if (USE_MOCK) {
      return mockBadgeData?.myBadges || [];
    }

    try {
      const data = await api.get("/badges/my-badges");
      return data;
    } catch (error) {
      console.warn("⚠️ [badgeService] Dùng mock danh hiệu cá nhân:", error.message);
      return mockBadgeData?.myBadges || [];
    }
  },
};

export default badgeService;
