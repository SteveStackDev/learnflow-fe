/**
 * FySet Problem Service
 * Giao tiếp trực tiếp với Django SQLite Backend (/api/judge/problems/)
 */

const API_BASE_URL = "/api/judge";
const FALLBACK_DIRECT_URL = "http://127.0.0.1:8000/api/judge";

async function fetchJudgeAPI(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    // 1. Thử gọi qua Vite Proxy
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.ok) {
      return await res.json();
    }

    // Nếu proxy trả về lỗi 503 (server offline), thử kết nối trực tiếp
    if (res.status === 503 || res.status === 404) {
      try {
        const directRes = await fetch(`${FALLBACK_DIRECT_URL}${endpoint}`, {
          ...options,
          headers,
        });
        if (directRes.ok) {
          return await directRes.json();
        }
      } catch {
        // bỏ qua lỗi fallback
      }
    }

    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || errData.message || `Lỗi API (${res.status})`);
  } catch (err) {
    // 2. Thử gọi thẳng tới port 8000 nếu fetch proxy thất bại hoàn toàn
    try {
      const directRes = await fetch(`${FALLBACK_DIRECT_URL}${endpoint}`, {
        ...options,
        headers,
      });
      if (directRes.ok) {
        return await directRes.json();
      }
    } catch {
      // bỏ qua
    }

    console.warn(`[problemService] Không thể kết nối tới máy chủ máy chấm (${endpoint}):`, err.message);
    throw err;
  }
}

export const problemService = {
  /**
   * Lấy danh sách bài tập đang Active cho người dùng
   */
  getProblems: async (params = {}) => {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append("search", params.search);
      if (params.difficulty && params.difficulty !== "all") searchParams.append("difficulty", params.difficulty);
      if (params.topic && params.topic !== "all") searchParams.append("topic", params.topic);

      const qs = searchParams.toString() ? `?${searchParams.toString()}` : "";
      const data = await fetchJudgeAPI(`/problems/${qs}`);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Lấy toàn bộ bài tập (Active + Draft + Archived) cho trang Admin
   */
  getAdminProblems: async (params = {}) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append("all", "true");
      if (params.search) searchParams.append("search", params.search);
      if (params.difficulty && params.difficulty !== "all") searchParams.append("difficulty", params.difficulty);
      if (params.topic && params.topic !== "all") searchParams.append("topic", params.topic);

      const qs = `?${searchParams.toString()}`;
      const data = await fetchJudgeAPI(`/problems/${qs}`);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Lấy thống kê số lượng bài tập thực tế từ Database
   */
  getProblemStats: async () => {
    try {
      const data = await fetchJudgeAPI("/stats/");
      return {
        total: data.total || 0,
        topicsCount: data.topicsCount || 0,
        recentCount: data.recentCount || 0,
      };
    } catch {
      return { total: 0, topicsCount: 0, recentCount: 0 };
    }
  },

  /**
   * Lấy chi tiết 1 bài tập theo ID hoặc Slug
   */
  getProblemById: async (idOrSlug) => {
    if (!idOrSlug) return null;
    try {
      const data = await fetchJudgeAPI(`/problems/${idOrSlug}/`);
      return data;
    } catch (err) {
      console.warn(`[problemService] Không tìm thấy bài tập: ${idOrSlug}`, err.message);
      return null;
    }
  },

  /**
   * Tạo bài tập mới kèm Test cases vào Database SQLite
   */
  createProblem: async (formData) => {
    return await fetchJudgeAPI("/problems/", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  },

  /**
   * Cập nhật bài tập đã có
   */
  updateProblem: async (id, formData) => {
    return await fetchJudgeAPI(`/problems/${id}/`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
  },

  /**
   * Xóa bài tập khỏi Database
   */
  deleteProblem: async (id) => {
    return await fetchJudgeAPI(`/problems/${id}/`, {
      method: "DELETE",
    });
  },

  /**
   * Chuyển đổi trạng thái bài tập Active <-> Draft
   */
  toggleStatus: async (id) => {
    return await fetchJudgeAPI(`/problems/${id}/toggle-status/`, {
      method: "POST",
    });
  },

  /**
   * Xóa toàn bộ bài tập khỏi Database (Reset dữ liệu sạch)
   */
  clearAllProblems: async () => {
    return await fetchJudgeAPI("/problems/", {
      method: "DELETE",
    });
  },
};

export default problemService;