import api from "./api";

/**
 * Adapter: Chuyển đổi dữ liệu từ MongoDB Mongoose Model sang định dạng chuẩn UI của FySet Frontend
 */
export const adaptProblem = (problem) => {
  if (!problem) return null;

  const rawDiff = String(problem.difficulty || problem.level || problem.difficultyLabel || "Easy").toLowerCase();
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

  // Đảm bảo topic & tags
  const topic = problem.topic || "Thuật toán";
  const tags = Array.isArray(problem.tags) && problem.tags.length > 0
    ? problem.tags
    : [topic];

  // Định dạng timeLimit và memoryLimit
  const timeLimit = problem.timeLimit
    ? (typeof problem.timeLimit === "number" ? `${problem.timeLimit}s` : problem.timeLimit)
    : "1.0s";

  const memoryLimit = problem.memoryLimit
    ? (typeof problem.memoryLimit === "number" ? `${problem.memoryLimit}MB` : problem.memoryLimit)
    : "256MB";

  return {
    ...problem,
    id,
    _id: problem._id,
    code,
    number: problem.number || code,
    slug: problem.slug || id,
    title: problem.title || "Bài tập thuật toán",
    difficulty: diffKey,
    difficultyLabel: diffLabel,
    level: diffLabel,
    topic,
    tags,
    points: problem.points || 100,
    statement: problem.statement || problem.description || "",
    description: problem.statement || problem.description || "",
    imageDescription: problem.imageDescription || problem.image_description || "",
    inputFormat: problem.inputFormat || problem.input_format || "",
    outputFormat: problem.outputFormat || problem.output_format || "",
    constraints: problem.constraints || [],
    examples: problem.examples || [],
    subtasks: problem.subtasks || [],
    testCases: problem.testCases || problem.testcases || [],
    timeLimit,
    memoryLimit,
    status: problem.status || "Active",
    acceptance: problem.acceptance || (problem.acceptanceRate != null ? `${problem.acceptanceRate}%` : "85%"),
    acceptanceRate: problem.acceptanceRate != null ? problem.acceptanceRate : 85,
    author: problem.author || "FySet Mentor",
    upvotes: problem.upvotes || 0,
    downvotes: problem.downvotes || 0,
    languages: problem.languages || [],
  };
};

export const problemService = {
  /**
   * 1. Lấy toàn bộ danh sách bài tập từ MongoDB Backend (/api/v1/problem/all)
   */
  getAllProblems: async (params = {}) => {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append("search", params.search);
      if (params.difficulty && params.difficulty !== "all") searchParams.append("difficulty", params.difficulty);
      if (params.topic && params.topic !== "all") searchParams.append("topic", params.topic);

      const qs = searchParams.toString() ? `?${searchParams.toString()}` : "";
      
      let data;
      try {
        data = await api.get(`/problem/all${qs}`);
      } catch (err) {
        // Fallback endpoint nếu backend cấu hình /problem
        if (err?.status === 404) {
          data = await api.get(`/problem${qs}`);
        } else {
          throw err;
        }
      }

      const list = Array.isArray(data) ? data : (data?.problems || data?.data || []);
      return list.map(adaptProblem);
    } catch (error) {
      console.warn("⚠️ [problemService] Lỗi khi tải danh sách bài tập từ Backend:", error.message || error);
      return [];
    }
  },

  /**
   * Alias tương thích cho getProblems
   */
  getProblems: async (params = {}) => {
    return await problemService.getAllProblems(params);
  },

  /**
   * 2. Lấy chi tiết 1 bài tập theo ID hoặc Slug từ MongoDB (/api/v1/problem/:id)
   */
  getProblemById: async (idOrSlug) => {
    if (!idOrSlug) return null;
    try {
      const data = await api.get(`/problem/${idOrSlug}`);
      // Nếu Backend dùng .find() trả về mảng 1 phần tử
      const rawProblem = Array.isArray(data) ? data[0] : (data?.problem || data);
      if (!rawProblem) return null;
      return adaptProblem(rawProblem);
    } catch (error) {
      console.warn(`⚠️ [problemService] Không thể tải chi tiết bài tập #${idOrSlug}:`, error.message || error);
      return null;
    }
  },

  /**
   * Alias tương thích cho getProblem
   */
  getProblem: async (idOrSlug) => {
    return await problemService.getProblemById(idOrSlug);
  },

  /**
   * 3. Lấy danh sách bài tập / lịch sử bài nộp của User (/api/v1/problem/user)
   */
  getUserProblems: async () => {
    try {
      let data;
      try {
        data = await api.get("/problem/user/all");
      } catch (err) {
        if (err?.status === 404) {
          data = await api.get("/problem/user");
        } else {
          throw err;
        }
      }
      return Array.isArray(data) ? data : (data?.problems || data?.submissions || []);
    } catch (error) {
      console.warn("⚠️ [problemService] Lỗi khi lấy bài tập của user:", error.message || error);
      return [];
    }
  },

  /**
   * 4. Lưu bài tập / bài nộp của User vào MongoDB (/api/v1/problem/save)
   */
  saveProblem: async (payload) => {
    try {
      let data;
      try {
        data = await api.post("/problem/save", payload);
      } catch (err) {
        if (err?.status === 404) {
          data = await api.post("/problem", payload);
        } else {
          throw err;
        }
      }
      return data;
    } catch (error) {
      console.error("❌ [problemService] Lỗi khi lưu bài tập:", error.message || error);
      throw error;
    }
  },

  /**
   * Lấy toàn bộ bài tập cho trang Admin
   */
  getAdminProblems: async (params = {}) => {
    return await problemService.getAllProblems(params);
  },

  /**
   * Tạo bài tập mới (Dành cho Admin)
   */
  createProblem: async (formData) => {
    return await api.post("/problem", formData);
  },

  /**
   * Cập nhật bài tập (Dành cho Admin)
   */
  updateProblem: async (id, formData) => {
    return await api.put(`/problem/${id}`, formData);
  },

  /**
   * Xóa bài tập (Dành cho Admin)
   */
  deleteProblem: async (id) => {
    return await api.delete(`/problem/${id}`);
  },
};

export default problemService;