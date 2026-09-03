import api from "./api";
import { problemDetailData } from "~/constants/mockProblemDetail";
import { problemData as mockProblemData } from "~/constants/mockProblem";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu bài tập từ MongoDB sang UI
export const adaptProblem = (p) => {
  if (!p) return null;

  return {
    id: p._id?.toString() || p.id,
    number: p.number || 1,
    title: p.title,
    slug: p.slug,
    difficulty:
      p.difficulty === "easy"
        ? "Dễ"
        : p.difficulty === "medium"
        ? "Trung bình"
        : "Khó",
    category: p.category || "Thuật toán",
    tags: p.tags || [],
    acceptanceRate: p.acceptanceRate ? `${p.acceptanceRate}%` : "68.5%",
    points: p.points || 100,
    description: p.description,
    codeStubs: p.codeStubs || [],
    author: p.author || "FySet Team",
    raw: p,
  };
};

export const problemService = {
  /**
   * Lấy danh sách bài tập (hỗ trợ phân trang, lọc độ khó, category)
   */
  getProblems: async (params = {}) => {
    if (USE_MOCK) {
      return mockProblemData;
    }

    try {
      const data = await api.get("/problems", { params });
      if (Array.isArray(data)) {
        return data.map(adaptProblem);
      }
      return mockProblemData;
    } catch (error) {
      console.warn("⚠️ [problemService] Dùng mock bài tập dự phòng:", error.message);
      return mockProblemData;
    }
  },

  /**
   * Lấy chi tiết bài tập theo ID hoặc Slug
   */
  getProblemById: async (idOrSlug) => {
    if (USE_MOCK) {
      return problemDetailData;
    }

    try {
      const data = await api.get(`/problems/${idOrSlug}`);
      return adaptProblem(data) || problemDetailData;
    } catch (error) {
      console.warn("⚠️ [problemService] Dùng mock chi tiết bài tập:", error.message);
      return problemDetailData;
    }
  },

  /**
   * Nộp bài giải thuật toán (POST /api/v1/submissions)
   */
  submitSolution: async ({ problemId, language, code }) => {
    if (USE_MOCK) {
      return {
        submissionId: `sub-${Date.now()}`,
        status: "Accepted",
        runtime: "4ms",
        memory: "10.2MB",
        passedCount: 15,
        totalCount: 15,
      };
    }

    return await api.post("/submissions", {
      problemId,
      language,
      code,
    });
  },

  /**
   * Lấy lịch sử nộp bài của một bài tập
   */
  getSubmissions: async (problemId) => {
    if (USE_MOCK) {
      return [];
    }

    return await api.get("/submissions", {
      params: { problemId },
    });
  },
};

export default problemService;