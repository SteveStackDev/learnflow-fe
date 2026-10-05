import api from "./api";

export const adaptRoadmap = (rm) => {
  if (!rm) return null;

  // Chuẩn hóa Level hiển thị
  const rawLevel = String(rm.level || "beginner").toLowerCase();
  let levelLabel = "Beginner";
  if (rawLevel === "intermediate") levelLabel = "Intermediate";
  if (rawLevel === "advanced") levelLabel = "Advanced";

  const totalSteps = Array.isArray(rm.roadmap) ? rm.roadmap.length : (rm.totalSteps || 0);
  const estimatedTime = rm.duration ? `${rm.duration} tháng` : (rm.estimatedTime || "Linh hoạt");

  return {
    ...rm,
    id: rm._id?.toString() || rm.id,
    _id: rm._id || rm.id,
    title: rm.title || "Chưa có tên lộ trình",
    slug: rm.slug || rm._id,
    description: rm.description || "Lộ trình học tập chuyên sâu",
    level: levelLabel,
    totalSteps,
    estimatedTime,
    icon: rm.icon || "🗺️",
  };
};

export const roadmapService = {
  getAllRoadmaps: async () => {
    try {
      const response = await api.get("/roadmap/all");
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);
      return list.map(adaptRoadmap);
    } catch (error) {
      console.error("Lỗi khi tải tất cả roadmaps:", error);
      return [];
    }
  },

  getUserRoadmaps: async () => {
    try {
      const response = await api.get("/roadmap/user");
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);
      return list.map(adaptRoadmap);
    } catch (error) {
      console.error("Lỗi khi tải roadmaps của user:", error);
      return [];
    }
  },

  getRoadmap: async (idOrSlug) => {
    try {
      const response = await api.get(`/roadmap/${idOrSlug}`);
      const rawData = response?.data || response;
      const data = rawData?.data || rawData;
      return adaptRoadmap(data);
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết roadmap #${idOrSlug}:`, error);
      return null;
    }
  },

  saveRoadmap: async (roadmapId) => {
    try {
      const response = await api.post("/user/roadmap/save", { roadmapId });
      return response?.data || response;
    } catch (error) {
      console.error("Lỗi khi saveRoadmap:", error);
      throw error;
    }
  },

  createRoadmap: async (data) => {
    try {
      const response = await api.post("/roadmap", data);
      return response?.data || response;
    } catch (error) {
      console.error("Lỗi khi tạo roadmap:", error);
      throw error;
    }
  },

  updateRoadmap: async (id, data) => {
    try {
      const response = await api.put(`/roadmap/${id}`, data);
      return response?.data || response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật roadmap #${id}:`, error);
      throw error;
    }
  },

  deleteRoadmap: async (id) => {
    try {
      const response = await api.delete(`/roadmap/${id}`);
      return response?.data || response;
    } catch (error) {
      console.error(`Lỗi khi xóa roadmap #${id}:`, error);
      throw error;
    }
  },
};

export default roadmapService;