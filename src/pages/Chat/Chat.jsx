import React, { useState } from "react";
import { mockChatData } from "~/constants/mockChat";
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

  // Find active conversation
  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setReplyingTo(null);
    setShowMobileChat(true); // Open chat panel on mobile
    // Clear unread count on select
    setConversations((prev) =>
      prev.map((item) => (item.id === chatId ? { ...item, unreadCount: 0 } : item))
    );
  };

  const handleSendMessage = ({ text }) => {
    if (!text || !text.trim()) return;

    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "me",
      time: nowStr,
      text: text,
      ...(replyingTo ? { replySnippet: replyingTo.text } : {}),
    };

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
      })
    );

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
