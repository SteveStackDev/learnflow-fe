import React, { useState, useEffect } from "react";
import { mockChatData } from "~/constants/mockChat";
import { chatService } from "~/services/chatService";
import {
  getSocket,
  connectSocket,
  joinConversationRoom,
  leaveConversationRoom,
} from "~/services/socket";
import ChatSidebar from "./components/ChatSidebar/ChatSidebar";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import styles from "./Chat.module.css";

export default function Chat() {
  const [conversations, setConversations] = useState(mockChatData.conversations);
  const [activeChatId, setActiveChatId] = useState(mockChatData.conversations[0]?.id || "chat-1");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);

  // Lấy thông tin user hiện tại từ localStorage
  const currentUserId = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("fySet_user"));
      return u?.id || u?._id || "my-user-id";
    } catch {
      return "my-user-id";
    }
  })();

  // 1. Tải danh sách cuộc trò chuyện từ API / mock
  useEffect(() => {
    chatService.getConversations(currentUserId).then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setConversations(data);
        setActiveChatId((prev) => (data.some((c) => c.id === prev) ? prev : data[0].id));
      }
    });
  }, [currentUserId]);

  // 2. Kết nối Socket.IO và lắng nghe tin nhắn thời gian thực
  useEffect(() => {
    const socket = connectSocket();

    if (activeChatId) {
      joinConversationRoom(activeChatId);
    }

    const handleIncomingMessage = (incomingMsg) => {
      if (!incomingMsg) return;

      const targetRoomId = incomingMsg.conversationId || incomingMsg.roomId;
      const formattedMsg = {
        id: incomingMsg._id || incomingMsg.id || `msg-${Date.now()}`,
        sender: incomingMsg.senderId === currentUserId ? "me" : "them",
        time: incomingMsg.createdAt
          ? new Date(incomingMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "Vừa xong",
        text: incomingMsg.content || incomingMsg.text || "",
        attachments: incomingMsg.attachments || [],
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetRoomId) {
            return {
              ...c,
              lastMessage: formattedMsg.text,
              lastTime: "Vừa xong",
              messages: [...(c.messages || []), formattedMsg],
            };
          }
          return c;
        }),
      );
    };

    socket.on("sendMessage", handleIncomingMessage);
    socket.on("receiveMessage", handleIncomingMessage);

    return () => {
      if (activeChatId) {
        leaveConversationRoom(activeChatId);
      }
      socket.off("sendMessage", handleIncomingMessage);
      socket.off("receiveMessage", handleIncomingMessage);
    };
  }, [activeChatId, currentUserId]);

  // Find active conversation
  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSelectChat = (chatId) => {
    if (activeChatId && activeChatId !== chatId) {
      leaveConversationRoom(activeChatId);
    }
    setActiveChatId(chatId);
    setReplyingTo(null);
    setShowMobileChat(true); // Open chat panel on mobile
    joinConversationRoom(chatId);

    // Clear unread count on select
    setConversations((prev) =>
      prev.map((item) => (item.id === chatId ? { ...item, unreadCount: 0 } : item)),
    );
  };

  const handleSendMessage = ({ text, attachment }) => {
    if (!text && !attachment) return;

    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "me",
      time: nowStr,
      text: text,
      ...(replyingTo ? { replySnippet: replyingTo.text } : {}),
      attachments: attachment ? [{ fileName: attachment }] : [],
    };

    // 1. Cập nhật giao diện tức thì (Optimistic UI)
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: text,
            lastTime: "Vừa xong",
            messages: [...(c.messages || []), newMsg],
          };
        }
        return c;
      }),
    );

    // 2. Phát qua Socket.IO tới các thành viên khác
    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit("sendMessage", {
        conversationId: activeChatId,
        content: text,
        senderId: currentUserId,
      });
    }

    // 3. Lưu vào Database qua Service
    chatService
      .sendMessage({
        conversationId: activeChatId,
        content: text,
      })
      .catch((err) => {
        console.warn("Lỗi đồng bộ tin nhắn với server:", err.message);
      });

    setReplyingTo(null);
  };

  return (
    <div className={styles.chat_page}>
      <div
        className={`${styles.chat_container} ${
          showMobileChat ? styles.show_mobile_chat : styles.show_mobile_sidebar
        }`}
      >
        {/* Component 1: Left Conversations Sidebar Wrapper */}
        <div className={styles.sidebar_wrapper}>
          <ChatSidebar
            conversations={conversations}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Right Main Chat Panel */}
        <main className={styles.chat_main}>
          {/* Component 2: Top Active Chat Header with Mobile Back Button */}
          <ChatHeader
            activeChat={activeChat}
            onBackToSidebar={() => setShowMobileChat(false)}
            onSelectUser={(u) => setSelectedUserForModal(u)}
          />

          {/* Component 3: Scrollable Message Bubbles View */}
          <ChatMessages
            messages={activeChat?.messages}
            activeChat={activeChat}
            onSelectReply={(msg) =>
              setReplyingTo({
                id: msg.id,
                text: msg.text,
                senderName: msg.sender === "me" ? "Bạn" : activeChat?.name || "Người dùng",
              })
            }
          />

          {/* Component 4: Pinned Bottom ChatInput Footer with Reply Bar */}
          <ChatFooter
            onSendMessage={handleSendMessage}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
          />
        </main>
      </div>

      {/* User Profile Quick Card Modal */}
      <UserProfileCardModal
        isOpen={!!selectedUserForModal}
        onClose={() => setSelectedUserForModal(null)}
        user={selectedUserForModal}
      />
    </div>
  );
}
