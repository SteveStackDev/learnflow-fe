import React, { useState } from "react";
import { mockChatData } from "~/constants/mockChat";
import ChatSidebar from "./components/ChatSidebar/ChatSidebar";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import CreateChatModal from "./components/CreateChatModal/CreateChatModal";
import UserProfileCardModal from "~/components/UserProfileCardModal/UserProfileCardModal";
import { PremiumBlur } from "~/components/ui";
import styles from "./Chat.module.css";

export default function Chat() {
  const [conversations, setConversations] = useState(mockChatData.conversations);
  const [activeChatId, setActiveChatId] = useState(mockChatData.conversations[0]?.id || "chat-1");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [selectedUserForModal, setSelectedUserForModal] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Find active conversation
  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setReplyingTo(null);
    setShowMobileChat(true); // Open chat panel on mobile

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

    // Cập nhật giao diện tức thì (Local State)
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

    setReplyingTo(null);
  };

  const handleCreateConversation = (newConv) => {
    setConversations((prev) => [newConv, ...prev]);
    setActiveChatId(newConv.id);
    setShowMobileChat(true);
  };

  return (
    <PremiumBlur
      isLocked={true}
      badgeText="TIN NHẮN & HỌC NHÓM"
      title="Tính Năng Trò Chuyện & Nhóm Học Tập Sắp Mở"
      description="Hệ thống nhắn tin thời gian thực, trao đổi cùng AI Mentor và tạo nhóm học tập đang trong quá trình thử nghiệm cuối cùng."
      primaryButtonText="Trải nghiệm AI Learning"
      primaryButtonLink="/ai-learning"
      secondaryButtonText="Về trang chủ"
      secondaryButtonLink="/"
    >
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
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
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

        {/* Create Group / New Chat Modal */}
        <CreateChatModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateChat={handleCreateConversation}
        />

        {/* User Profile Quick Card Modal */}
        <UserProfileCardModal
          isOpen={!!selectedUserForModal}
          onClose={() => setSelectedUserForModal(null)}
          user={selectedUserForModal}
        />
      </div>
    </PremiumBlur>
  );
}
