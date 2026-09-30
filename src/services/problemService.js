import api from "./api";

export const adaptProblem = (problem) => {
  if (!problem) return null;

  const rawDiff = String(problem.difficulty || problem.level || problem.difficultyLabel || "easy").toLowerCase();
  let diffLabel = "Dễ";
  let diffKey = "easy";
  if (rawDiff === "hard" || rawDiff === "khó") {
    diffLabel = "Khó";
    diffKey = "hard";
  } else if (rawDiff === "medium" || rawDiff === "trung bình") {
    diffLabel = "Trung bình";
    diffKey = "medium";
  }

  const id = problem._id?.toString() || problem.id || String(problem.number || "");
  const code = problem.code || (problem._id ? String(problem._id).slice(-4).toUpperCase() : (problem.id || "001"));
  const topic = problem.topic || "Thuật toán";

  return {
    ...problem,
    id,
    _id: problem._id || id,
    code,
    title: problem.title || "Bài tập thuật toán",
    difficulty: diffKey,
    difficultyLabel: diffLabel,
    level: diffLabel,
    topic,
    acceptance: problem.acceptance || (problem.acceptanceRate != null ? `${problem.acceptanceRate}%` : "85%"),
    acceptanceRate: problem.acceptanceRate != null ? problem.acceptanceRate : 85,
  };
};

// Adapter chuẩn hóa dành riêng cho Bài nộp / Bài tập của User
export const adaptUserProblem = (item) => {
  if (!item) return null;

  // Nếu là item từ userProblem (có relation problemId)
  const problemDetail = item.problemId ? adaptProblem(item.problemId) : adaptProblem(item);

  // Chuẩn hóa status: "AC" / "solved" -> "solved", "attempted" / "WA" -> "attempted"
  const rawStatus = (item.status || item.userStatus || "").toUpperCase();
  let userStatus = "unsolved";
  if (["SOLVED", "AC", "ACCEPTED", "100"].includes(rawStatus) || item.score === item.maxScore) {
    userStatus = "solved";
  } else if (["ATTEMPTED", "WA", "WRONG", "IN_PROGRESS"].includes(rawStatus) || (item.score > 0 && item.score < item.maxScore)) {
    userStatus = "attempted";
  }

  return {
    id: item._id?.toString() || item.id,
    userStatus,
    score: item.score || 0,
    maxScore: item.maxScore || 100,
    createdAt: item.createdAt,
    // Trả về object problemId chuẩn hóa
    problemId: {
      ...problemDetail,
      _id: problemDetail.id || item.problemId?._id || item.id,
    },
    code: problemDetail.code,
    title: problemDetail.title,
    difficulty: problemDetail.difficulty,
    topic: problemDetail.topic,
    acceptanceRate: problemDetail.acceptanceRate,
  };
};

export const problemService = {
  getAllProblems: async (params = {}) => {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append("search", params.search);
      if (params.difficulty && params.difficulty !== "all") searchParams.append("difficulty", params.difficulty);
      if (params.topic && params.topic !== "all") searchParams.append("topic", params.topic);

      const qs = searchParams.toString() ? `?${searchParams.toString()}` : "";
      const response = await api.get(`/problem/all${qs}`);
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);

      return list.map(adaptProblem);
    } catch (error) {
      console.warn("⚠️ [problemService] Lỗi khi tải danh sách bài tập:", error.message || error);
      return [];
    }
  },

  getProblems: async (params = {}) => {
    return await problemService.getAllProblems(params);
  },

  getProblemById: async (idOrSlug) => {
    if (!idOrSlug) return null;
    try {
      const response = await api.get(`/problem/${idOrSlug}`);
      const rawData = response?.data || response;
      const problem = Array.isArray(rawData) ? rawData[0] : (rawData?.data || rawData);
      return adaptProblem(problem);
    } catch (error) {
      console.warn(`⚠️ [problemService] Lỗi khi tải chi tiết bài tập #${idOrSlug}:`, error.message || error);
      return null;
    }
  },

  getProblem: async (idOrSlug) => {
    return await problemService.getProblemById(idOrSlug);
  },

  getUserProblems: async () => {
    try {
      const response = await api.get("/problem/user");
      const rawData = response?.data || response;
      const list = Array.isArray(rawData) ? rawData : (rawData?.data || []);

      return list.map(adaptUserProblem);
    } catch (error) {
      console.warn("⚠️ [problemService] Lỗi khi lấy bài tập của user:", error.message || error);
      return [];
    }
  },

  saveProblem: async (payload) => {
    try {
      const response = await api.post("/problem/save", payload);
      return response?.data || response;
    } catch (error) {
      console.error("❌ [problemService] Lỗi khi lưu bài tập:", error.message || error);
      throw error;
    }
  },
};

export default problemService;