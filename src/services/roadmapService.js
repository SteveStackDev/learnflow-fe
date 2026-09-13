import api from "./api";
import { roadmapData as mockRoadMapData } from "~/constants/mockRoadMap";

export const adaptRoadmap = (roadmap) => {
  if (!roadmap) return null;

  return {
    id: roadmap._id?.toString() || roadmap.id,
    slug: roadmap.slug,
    title: roadmap.title,
    description: roadmap.description,
    banner: roadmap.thumbnail,
    difficulty:
      roadmap.level === "beginner"
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
  getRoadmaps: async () => {
    try {
      const data = await api.get("/roadmap/all");
      return data.map(adaptRoadmap);
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock lộ trình dự phòng:", error.message);
      return mockRoadMapData;
    }
  },
};

export default roadmapService;
