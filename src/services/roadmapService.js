import api from "./api";
import { roadmapData as mockRoadMapData } from "~/constants/mockRoadMap";
import { mockRoadmapDetailData } from "~/constants/mockRoadmapDetail";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu lộ trình từ MongoDB sang UI
export const adaptRoadmap = (roadmap) => {
  if (!roadmap) return null;

  return {
    id: roadmap._id?.toString() || roadmap.id,
    slug: roadmap.slug,
    title: roadmap.title,
    description: roadmap.description,
    banner:
      roadmap.banner ||
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    difficulty:
      roadmap.difficulty === "beginner"
        ? "Người mới bắt đầu"
        : roadmap.difficulty === "intermediate"
        ? "Trung cấp"
        : "Nâng cao",
    topics: roadmap.topics || [],
    enrolledCount: roadmap.enrolledUsers?.length || 120,
    author: roadmap.authorId?.name || "FySet DevTeam",
    raw: roadmap,
  };
};

export const roadmapService = {
  /**
   * Lấy danh sách lộ trình học
   */
  getRoadmaps: async (params = {}) => {
    if (USE_MOCK) {
      return mockRoadMapData;
    }

    try {
      const data = await api.get("/roadmaps", { params });
      if (Array.isArray(data)) {
        return data.map(adaptRoadmap);
      }
      return mockRoadMapData;
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock lộ trình dự phòng:", error.message);
      return mockRoadMapData;
    }
  },

  /**
   * Lấy chi tiết một lộ trình theo slug
   */
  getRoadmapBySlug: async (slug) => {
    if (USE_MOCK) {
      return mockRoadmapDetailData;
    }

    try {
      const data = await api.get(`/roadmaps/${slug}`);
      return adaptRoadmap(data) || mockRoadmapDetailData;
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock chi tiết lộ trình:", error.message);
      return mockRoadmapDetailData;
    }
  },
};

export default roadmapService;
