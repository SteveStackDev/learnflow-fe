import { io } from "socket.io-client";

let socket = null;

/**
 * Lấy hoặc khởi tạo Socket.IO client kết nối namespace /chat
 */
export const getSocket = () => {
  if (!socket) {
    socket = io("/chat", {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: false,
    });

    socket.on("connect", () => {
      console.log("⚡ [FySet Socket] Đã kết nối thành công:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.warn("⚠️ [FySet Socket] Lỗi kết nối:", error.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 [FySet Socket] Đã ngắt kết nối:", reason);
    });
  }
  return socket;
};

/**
 * Chủ động kết nối socket khi user đã đăng nhập
 */
export const connectSocket = () => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  return s;
};

/**
 * Ngắt kết nối socket khi logout
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Tham gia vào phòng chat
 */
export const joinConversationRoom = (roomId) => {
  const s = getSocket();
  if (s && roomId) {
    s.emit("joinConversation", { roomId });
  }
};

/**
 * Rời khỏi phòng chat
 */
export const leaveConversationRoom = (roomId) => {
  const s = getSocket();
  if (s && roomId) {
    s.emit("leaveConversation", { roomId });
  }
};

export default {
  getSocket,
  connectSocket,
  disconnectSocket,
  joinConversationRoom,
  leaveConversationRoom,
};
