import api from "./api";
import { mockChatData } from "~/constants/mockChat";

const USE_MOCK = true;

// Adapter chuẩn hóa cuộc trò chuyện từ Backend MongoDB sang định dạng Chat UI
export const adaptConversation = (conv, currentUserId) => {
  if (!conv) return null;

  const convId = conv._id?.toString() || conv.id;
  const isGroup = Boolean(conv.isGroup);

  // Tìm đối phương nếu là chat 1-1
  let otherUser = null;
  if (!isGroup && Array.isArray(conv.participants)) {
    otherUser = conv.participants.find((p) => (p._id?.toString() || p.id) !== currentUserId);
  }

  const name =
    conv.title ||
    otherUser?.username ||
    otherUser?.name ||
    (isGroup ? "Nhóm học tập" : "Người dùng");

  const avatar =
    conv.avatar?.url ||
    otherUser?.avatar?.url ||
    otherUser?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

  return {
    id: convId,
    _id: convId,
    name,
    avatar,
    isOnline: otherUser?.interactionStatus === "online",
    statusText: otherUser?.interactionStatus === "online" ? "Đang trực tuyến" : "Ngoại tuyến",
    unreadCount: conv.unreadMessageCounts?.find((u) => u.userId === currentUserId)?.count || 0,
    isGroup,
    type: isGroup ? "group" : "direct",
    lastMessage: conv.lastMessageContent || "Chưa có tin nhắn",
    lastTime: conv.lastMessageAt
      ? new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "",
    messages: (conv.messages || []).map((msg) => ({
      id: msg._id?.toString() || msg.id,
      sender:
        (msg.senderId?._id?.toString() || msg.senderId?.toString()) === currentUserId
          ? "me"
          : "them",
      time: msg.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Vừa xong",
      text: msg.content || "",
      attachments: msg.attachments || [],
    })),
  };
};

export const chatService = {
  /**
   * Lấy danh sách cuộc trò chuyện
   */
  getConversations: async (currentUserId) => {
    if (USE_MOCK) return mockChatData.conversations;

    try {
      const data = await api.get("/chat/conversation");
      if (Array.isArray(data) && data.length > 0) {
        return data.map((c) => adaptConversation(c, currentUserId));
      }
      return mockChatData.conversations;
    } catch (error) {
      console.warn(
        "⚠️ [chatService] Dùng mock chat dự phòng do chưa có dữ liệu backend:",
        error.message,
      );
      return mockChatData.conversations;
    }
  },

  /**
   * Gửi tin nhắn mới (kèm tệp nếu có)
   */
  sendMessage: async ({ conversationId, content, attachments = [] }) => {
    if (USE_MOCK) {
      return {
        id: `msg-${Date.now()}`,
        content,
        conversationId,
        createdAt: new Date().toISOString(),
      };
    }

    const formData = new FormData();
    formData.append("conversationId", conversationId);
    formData.append("content", content);

    if (attachments && attachments.length > 0) {
      Array.from(attachments).forEach((file) => {
        formData.append("attachments", file);
      });
    }

    return await api.post("/chat/message", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Tạo cuộc trò chuyện mới
   */
  createConversation: async ({ title, participants, isGroup = false }) => {
    return await api.post("/chat/conversation", {
      title,
      participants: JSON.stringify(participants),
      isGroup,
    });
  },
};

export default chatService;
