import api from "./api";
import { contestData as mockContestData } from "~/constants/mockContest";
import { leaderboardData as mockLeaderBoardData } from "~/constants/mockLeaderBoard";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu cuộc thi từ MongoDB sang UI
export const adaptContest = (contest) => {
  if (!contest) return null;

  return {
    id: contest._id?.toString() || contest.id,
    slug: contest.slug,
    title: contest.title,
    description: contest.description,
    startTime: contest.startTime,
    endTime: contest.endTime,
    durationMinutes: contest.duration || 90,
    status: contest.status || "upcoming",
    registeredCount: contest.stats?.registeredCount || 240,
    participantsCount: contest.stats?.participantsCount || 180,
    problemsCount: contest.problems?.length || 4,
    raw: contest,
  };
};

export const contestService = {
  /**
   * Lấy danh sách các cuộc thi (đang diễn ra, sắp tới, đã kết thúc)
   */
  getContests: async (params = {}) => {
    if (USE_MOCK) {
      return mockContestData;
    }

    try {
      const data = await api.get("/contests", { params });
      if (Array.isArray(data)) {
        return data.map(adaptContest);
      }
      return mockContestData;
    } catch (error) {
      console.warn("⚠️ [contestService] Dùng mock cuộc thi dự phòng:", error.message);
      return mockContestData;
    }
  },

  /**
   * Lấy chi tiết một cuộc thi theo ID hoặc Slug
   */
  getContestById: async (idOrSlug) => {
    if (USE_MOCK) {
      return mockContestData?.activeContest || mockContestData;
    }

    try {
      const data = await api.get(`/contests/${idOrSlug}`);
      return adaptContest(data) || mockContestData;
    } catch (error) {
      console.warn("⚠️ [contestService] Dùng mock chi tiết cuộc thi:", error.message);
      return mockContestData;
    }
  },

  /**
   * Lấy bảng xếp hạng (Leaderboard) của một cuộc thi cụ thể
   */
  getContestLeaderboard: async (contestId) => {
    if (USE_MOCK) {
      return mockLeaderBoardData;
    }

    try {
      const data = await api.get(`/contests/${contestId}/leaderboard`);
      return data;
    } catch (error) {
      console.warn("⚠️ [contestService] Dùng mock bảng xếp hạng contest:", error.message);
      return mockLeaderBoardData;
    }
  },

  /**
   * Lấy bảng xếp hạng toàn cầu (Global Leaderboard)
   */
  getGlobalLeaderboard: async (params = {}) => {
    if (USE_MOCK) {
      return mockLeaderBoardData;
    }

    try {
      const data = await api.get("/leaderboard", { params });
      return data;
    } catch (error) {
      console.warn("⚠️ [contestService] Dùng mock bảng xếp hạng toàn cầu:", error.message);
      return mockLeaderBoardData;
    }
  },
};

export default contestService;
