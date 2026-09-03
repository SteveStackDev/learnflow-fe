import api from "./api";
import { dashboardData } from "~/constants/mockDashBoard";

const USE_MOCK = true;

// Adapter chuẩn hóa dữ liệu bạn bè từ MongoDB sang định dạng UI
export const adaptFriend = (friendItem) => {
  if (!friendItem) return null;

  const u = friendItem.userId || friendItem;
  const friendId = u._id?.toString() || u.id || `friend-${Date.now()}`;
  const name = u.name || u.username || "Học viên FySet";
  const avatar =
    u.avatar?.url ||
    u.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username || name}`;

  return {
    id: friendId,
    _id: friendId,
    name,
    username: u.username || name,
    handle: (u.username || name).toLowerCase().replace(/\s+/g, "_"),
    avatar,
    status: u.interactionStatus === "online" ? "online" : "busy",
    friendshipStatus: friendItem.status || "accepted", // "accepted" | "pending"
    currentActivity: u.dailyStreak ? `🔥 Streak ${u.dailyStreak} ngày` : (u.title || "Đang học thuật toán"),
    bio: u.bio || "Học viên tích cực tại FySet.",
    dailyStreak: u.dailyStreak || 0,
    pomodoroStreak: u.pomodoroStreak || 0,
    xp: u.experiencePoints || 0,
    rating: u.rating || 1200,
  };
};

export const userService = {
  /**
   * Lấy danh sách bạn bè
   */
  getFriends: async () => {
    if (USE_MOCK) {
      return dashboardData.onlineFriends || [];
    }

    try {
      const data = await api.get("/user/friend");
      if (Array.isArray(data) && data.length > 0) {
        return data.map(adaptFriend).filter(Boolean);
      }
      return dashboardData.onlineFriends || [];
    } catch (error) {
      console.warn("⚠️ [userService] Dùng danh sách bạn bè mock dự phòng:", error.message);
      return dashboardData.onlineFriends || [];
    }
  },

  /**
   * Gửi lời mời kết bạn (POST /api/v1/user/friend/add)
   */
  sendFriendRequest: async (receiverId) => {
    if (USE_MOCK || !receiverId) {
      return { success: true, message: "Đã gửi lời mời kết bạn (Mock)" };
    }

    return await api.post("/user/friend/add", { receiverId });
  },

  /**
   * Phản hồi lời mời kết bạn (POST /api/v1/user/friend/accept)
   * @param {string} receiverId - ID người gửi lời mời
   * @param {"accepted"|"declined"} status - Trạng thái phản hồi
   */
  replyFriendRequest: async (receiverId, status = "accepted") => {
    if (USE_MOCK || !receiverId) {
      return { success: true, message: "Phản hồi kết bạn thành công (Mock)" };
    }

    return await api.post("/user/friend/accept", { receiverId, status });
  },

  /**
   * Tải ảnh đại diện lên Cloudinary (POST /api/v1/user/avatar)
   * @param {File} file - Tệp ảnh từ thẻ input
   */
  updateAvatar: async (file) => {
    if (USE_MOCK || !file) {
      const mockUrl = URL.createObjectURL(file);
      return {
        url: mockUrl,
        message: "Cập nhật ảnh đại diện thành công (Mock)",
      };
    }

    const formData = new FormData();
    formData.append("image", file);

    const data = await api.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },

  /**
   * Lấy chỉ số thành tích học tập cá nhân
   */
  getUserStats: (currentUser) => {
    return {
      dailyStreak: currentUser?.dailyStreak || 5,
      pomodoroStreak: currentUser?.pomodoroStreak || 3,
      focusHours: currentUser?.focusHours || "42.5h",
      xp: currentUser?.experiencePoints || currentUser?.xp || 1250,
      rating: currentUser?.rating || 1520,
    };
  },
};

export default userService;
