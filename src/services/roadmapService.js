import api from "./api";

export const roadmapService = {
  getAllRoadmaps: async () => {
    try {
      const data = await api.get("/roadmap/all");
      return data;
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock danh hiệu dự phòng:", error.message);
    }
  },

  getRoadmap: async (id) => {
    try {
      const data = await api.get(`/roadmap/${id}`);

      return data;
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock danh hiệu dự phòng:", error.message);
    }
  },

  saveRoadmap: async (roadmapId) => {
    try {
      const data = await api.post("/roadmap/save", { roadmapId });

      return data;
    } catch (error) {
      console.warn("⚠️ [roadmapService] Dùng mock danh hiệu dự phòng:", error.message);
    }
  },
};

export default roadmapService;
