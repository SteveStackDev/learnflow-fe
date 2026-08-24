import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";
import styles from "./ChatSidebar.module.css";

const FILTER_TABS = [
  { id: "all", label: "Tất cả" },
  { id: "unread", label: "Chưa đọc" },
  { id: "group", label: "Nhóm" },
];

export default function ChatSidebar({
  conversations = [],
  activeChatId,
  onSelectChat,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === "unread") {
      return c.unreadCount > 0;
    }
    if (activeFilter === "group") {
      return c.isGroup || c.type === "group";
    }
    return true;
  });

  return (
    <aside className={styles.sidebar}>
      {/* Search Bar */}
      <div className={styles.search_container}>
        <div className={styles.search_wrapper}>
          <Icon name="Search" size={16} className={styles.search_icon} />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />
        </div>

        {/* Category Filter Pills (Tất cả, Chưa đọc, Nhóm) */}
        <div className={styles.filter_pills}>
          {FILTER_TABS.map((tab) => {
            const isTabActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.filter_pill} ${isTabActive ? styles.filter_pill_active : ""}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List with Custom ScrollArea */}
      <ScrollArea className={styles.conversation_list}>
        {filteredConversations.length > 0 ? (
          filteredConversations.map((item) => {
            const isActive = item.id === activeChatId;

            return (
              <div
                key={item.id}
                className={`${styles.chat_item} ${isActive ? styles.chat_item_active : ""}`}
                onClick={() => onSelectChat(item.id)}
                role="button"
                tabIndex={0}
              >
                {/* Avatar */}
                <div className={styles.avatar_wrapper}>
                  <img src={item.avatar} alt={item.name} className={styles.avatar} />
                </div>

                {/* Chat Meta Info */}
                <div className={styles.chat_info}>
                  <div className={styles.top_row}>
                    <h4 className={styles.chat_name}>{item.name}</h4>
                    <span className={styles.time_text}>{item.lastTime}</span>
                  </div>
                  <div className={styles.bottom_row}>
                    <p className={styles.last_message}>{item.lastMessage}</p>
                    {item.unreadCount > 0 && (
                      <span className={styles.unread_badge}>{item.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty_filter_text}>
            Không tìm thấy cuộc trò chuyện nào.
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
