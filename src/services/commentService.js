import api from "./api";

const USE_MOCK = true;

// Mock thảo luận ban đầu cho bài tập nếu backend chưa có dữ liệu
export const mockProblemDiscussions = [
  {
    id: "c-1",
    name: "Elena Rostova",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    time: "2 giờ trước",
    text: "Bài này giải thuật Greedy sắp xếp tăng dần mảng a[i] là tối ưu nhất nha mọi người!",
  },
  {
    id: "c-2",
    name: "Michael Steve",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    time: "5 giờ trước",
    text: "Lưu ý trường hợp T lớn (10^12) nên dùng kiểu long long trong C++ nhé.",
  },
];

// Adapter chuẩn hóa comment từ MongoDB sang UI
export const adaptComment = (comment) => {
  if (!comment) return null;

  const author = comment.authorId;
  const authorName =
    author?.username || author?.name || "Lập trình viên FySet";
  const authorAvatar =
    author?.avatar?.url ||
    author?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`;

  return {
    id: comment._id?.toString() || comment.id,
    name: authorName,
    avatar: authorAvatar,
    time: comment.createdAt
      ? new Date(comment.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Vừa xong",
    text: comment.content,
    replies: comment.stats?.replies || 0,
    likes: comment.stats?.likes || 0,
    raw: comment,
  };
};

export const commentService = {
  /**
   * Lấy danh sách bình luận thảo luận theo đối tượng (Problem, Blog, Lesson...)
   */
  getComments: async ({ targetType = "Problem", targetId }) => {
    if (USE_MOCK || !targetId) return mockProblemDiscussions;

    try {
      const data = await api.get("/comment/message", {
        params: { targetType, targetId },
      });

      if (Array.isArray(data) && data.length > 0) {
        return data.map(adaptComment);
      }
      return mockProblemDiscussions;
    } catch (error) {
      console.warn(
        "⚠️ [commentService] Dùng mock thảo luận dự phòng:",
        error.message,
      );
      return mockProblemDiscussions;
    }
  },

  /**
   * Gửi bình luận / thảo luận mới
   */
  createComment: async ({ targetType = "Problem", targetId, content, parentId = null }) => {
    if (USE_MOCK || !targetId) {
      return {
        id: `c-${Date.now()}`,
        content,
        targetType,
        targetId,
        createdAt: new Date().toISOString(),
      };
    }

    const data = await api.post("/comment/message", {
      targetType,
      targetId,
      content,
      parentId,
    });

    return adaptComment(data);
  },
};

export default commentService;
