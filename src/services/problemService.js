import api from "./api";

/**
 * Hàm chuẩn hóa mã bài tập (code) dạng số tịnh tiến liên tục (01, 02, 03,...) hoàn toàn tự động
 */
export const formatSequentialCode = (problem, index) => {
  if (!problem) return "01";

  // 1. Ưu tiên số thứ tự index nếu có (khi render theo danh sách)
  if (index !== undefined && index !== null && !isNaN(index)) {
    const num = Number(index) + 1;
    return String(num).padStart(2, "0");
  }

  // 2. Nếu bài tập có trường order hoặc orderNumber do server trả về
  if (problem.order != null || problem.orderNumber != null) {
    const num = Number(problem.order ?? problem.orderNumber);
    if (!isNaN(num) && num > 0) {
      return String(num).padStart(2, "0");
    }
  }

  // 3. Nếu problem.code là số nguyên hợp lệ (ví dụ "1", "02", "3")
  const rawCode = String(problem.code || "").trim();
  if (/^\d+$/.test(rawCode)) {
    const num = Number(rawCode);
    if (!isNaN(num)) return String(num).padStart(2, "0");
  }

  // 4. Nếu problem._id hoặc problem.id là số ngắn (ví dụ "01", "2")
  const rawId = String(problem._id || problem.id || "").trim();
  if (/^\d+$/.test(rawId) && rawId.length <= 4) {
    const num = Number(rawId);
    if (!isNaN(num)) return String(num).padStart(2, "0");
  }

  // 5. Fallback giữ nguyên code đã có hoặc "01"
  return rawCode || "01";
};

export const adaptProblem = (problem, index) => {
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
  const code = formatSequentialCode(problem, index);

  return {
    ...problem,
    id,
    _id: problem._id || id,
    code,
    number: code,
    title: problem.title || "Bài tập thuật toán",
    difficulty: diffKey,
    difficultyLabel: diffLabel,
    level: diffLabel,
    topic: problem.topic || "Thuật toán",
    acceptance: problem.acceptance || (problem.acceptanceRate != null ? `${problem.acceptanceRate}%` : "0%"),
    acceptanceRate: problem.acceptanceRate ?? 0,
  };
};

export const adaptUserProblem = (item, index, problemMap) => {
  if (!item) return null;

  const rawProblem = item.problemId || item;
  let problemDetail = null;

  if (problemMap) {
    const rawPId = String(rawProblem?._id || rawProblem?.id || rawProblem || "");
    const matched = problemMap.get(rawPId) || (typeof rawProblem === "object" && rawProblem.title ? rawProblem : null);
    if (matched) {
      problemDetail = adaptProblem(matched);
    }
  }

  if (!problemDetail) {
    problemDetail = adaptProblem(rawProblem, index);
  }

  const rawStatus = String(item.status || item.userStatus || "").toUpperCase();
  let userStatus = "unsolved";
  if (
    ["SOLVED", "AC", "ACCEPTED"].includes(rawStatus) ||
    item.userStatus === "solved" ||
    (item.score != null && item.maxScore != null && Number(item.score) >= Number(item.maxScore) && Number(item.maxScore) > 0)
  ) {
    userStatus = "solved";
  } else if (
    ["ATTEMPTED", "WA", "WRONG", "TLE", "RE", "CE", "IN_PROGRESS"].includes(rawStatus) ||
    item.userStatus === "attempted" ||
    (item.score > 0 && Number(item.score) < Number(item.maxScore))
  ) {
    userStatus = "attempted";
  }

  const code = problemDetail?.code || formatSequentialCode(rawProblem, index);

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
      code,
      difficulty: "easy",
      topic: "General",
    },
    code,
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

      return list.map((p, idx) => adaptProblem(p, idx));
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
      // 1. Lấy danh sách tất cả problems để map đúng mã bài tập tịnh tiến (#01, #02) và thông tin tiêu đề
      let problemMap = new Map();
      try {
        const allProblems = await problemService.getAllProblems();
        allProblems.forEach((p) => {
          if (p._id) problemMap.set(String(p._id), p);
          if (p.id) problemMap.set(String(p.id), p);
          if (p.code) problemMap.set(String(p.code), p);
        });
      } catch (e) {
        console.warn("Không thể map allProblems trong getUserProblems:", e);
      }

      let list = [];
      try {
        let currentUserId = "";
        try {
          const savedUser = JSON.parse(localStorage.getItem("fyset_user") || localStorage.getItem("fySet_user"));
          currentUserId = savedUser?._id || savedUser?.id || "";
        } catch (storageUserErr) {
          console.debug("Lỗi đọc fyset_user từ storage:", storageUserErr);
        }

        const qs = currentUserId ? `?userId=${encodeURIComponent(currentUserId)}` : "";
        const response = await api.get(`/problem/user${qs}`);
        const rawData = response?.data || response;
        list = Array.isArray(rawData) ? rawData : (rawData?.data || []);
      } catch (apiErr) {
        console.warn("API /problem/user error, fallback to local storage:", apiErr);
      }

      // 2. Merge với dữ liệu cache từ localStorage (nếu có) để đảm bảo các bài đã AC không bao giờ bị mất
      try {
        const cachedSolved = JSON.parse(localStorage.getItem("fyset_solved_problems") || "[]");
        if (Array.isArray(cachedSolved) && cachedSolved.length > 0) {
          const apiProblemIds = new Set(
            list.map((item) => String(item.problemId?._id || item.problemId?.id || item.problemId || item.id || ""))
          );
          cachedSolved.forEach((cacheItem) => {
            const cachePid = String(
              cacheItem.problemId?._id || cacheItem.problemId?.id || cacheItem.problemId || cacheItem.id || ""
            );
            if (!apiProblemIds.has(cachePid)) {
              list.unshift(cacheItem);
              apiProblemIds.add(cachePid);
            }
          });
        }
      } catch (cacheErr) {
        console.debug("Lỗi đọc fyset_solved_problems từ storage:", cacheErr);
      }

      return list.map((item, idx) => adaptUserProblem(item, idx, problemMap));
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
