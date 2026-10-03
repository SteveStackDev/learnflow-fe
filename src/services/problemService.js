import api from "./api";

export const adaptProblem = (problem) => {
  if (!problem) return null;

  const rawDiff = String(problem.difficulty || problem.level || "easy").toLowerCase();
  let diffLabel = "Dễ";
  let diffKey = "easy";
  if (rawDiff === "hard" || rawDiff === "khó") {
    diffLabel = "Khó";
    diffKey = "hard";
  } else if (rawDiff === "medium" || rawDiff === "trung bình") {
    diffLabel = "Trung bình";
    diffKey = "medium";
  }

  const id = problem._id?.toString() || problem.id || "";
  const code = problem.code || (problem._id ? String(problem._id).slice(-4).toUpperCase() : "---");

  return {
    ...problem,
    id,
    _id: problem._id || id,
    code,
    title: problem.title || "Bài tập thuật toán",
    difficulty: diffKey,
    difficultyLabel: diffLabel,
    level: diffLabel,
    topic: problem.topic || "Thuật toán",
    acceptance: problem.acceptance || (problem.acceptanceRate != null ? `${problem.acceptanceRate}%` : "0%"),
    acceptanceRate: problem.acceptanceRate ?? 0,
  };
};

export const adaptUserProblem = (item) => {
  if (!item) return null;

  const problemDetail = item.problemId ? adaptProblem(item.problemId) : adaptProblem(item);

  const rawStatus = String(item.status || "").toUpperCase();
  let userStatus = "unsolved";
  if (
    ["SOLVED", "AC", "ACCEPTED"].includes(rawStatus) ||
    (item.score != null && item.maxScore != null && item.score === item.maxScore && item.maxScore > 0)
  ) {
    userStatus = "solved";
  } else if (
    ["ATTEMPTED", "WA", "WRONG", "TLE", "RE", "CE", "IN_PROGRESS"].includes(rawStatus) ||
    (item.score > 0 && item.score < item.maxScore)
  ) {
    userStatus = "attempted";
  }

  return {
    id: item._id?.toString() || item.id,
    _id: item._id || item.id,
    userStatus,
    status: rawStatus,
    score: item.score || 0,
    maxScore: item.maxScore || 100,
    createdAt: item.createdAt,
    problemId: problemDetail || {
      _id: item.problemId?._id || item.id,
      title: "Bài tập thuật toán",
      code: "---",
      difficulty: "easy",
      topic: "General",
    },
    code: problemDetail?.code || "---",
    title: problemDetail?.title || "Chưa có tên bài tập",
    difficulty: problemDetail?.difficulty || "easy",
    topic: problemDetail?.topic || "",
    acceptanceRate: problemDetail?.acceptanceRate || 0,
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
      console.error("Lỗi khi lấy tất cả bài tập:", error);
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
      if (problem) {
        return adaptProblem(problem);
      }
      return null;
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết bài tập #${idOrSlug}:`, error);
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
      console.error("Lỗi khi lấy danh sách bài tập của user:", error);
      return [];
    }
  },

  saveProblem: async (payload) => {
    const response = await api.post("/problem/save", payload);
    return response?.data || response;
  },

  getAdminProblems: async () => {
    return await problemService.getAllProblems();
  },

  createProblem: async (data) => {
    const response = await api.post("/problem", data);
    return response?.data || response;
  },

  deleteProblem: async (id) => {
    const response = await api.delete(`/problem/${id}`);
    return response?.data || response;
  },
};

export default problemService;
