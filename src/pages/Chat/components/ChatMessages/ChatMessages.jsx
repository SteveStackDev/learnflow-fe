import React, { useRef, useEffect, useState } from "react";
import Icon from "~/components/Icon/Icon";
import { ScrollArea } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ChatMessages.module.css";

const QUICK_EMOJIS = ["❤️", "👍", "😂", "😮", "🔥"];

export default function ChatMessages({ messages = [], activeChat, onSelectReply }) {
  const containerRef = useRef(null);
  const { toast } = useToast();
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, activeChat?.id]);

  const handleToggleReaction = (msgId, emoji = "❤️") => {
    setReactions((prev) => {
      const current = prev[msgId];
      if (current === emoji) {
        const updated = { ...prev };
        delete updated[msgId];
        return updated;
      }
      return { ...prev, [msgId]: emoji };
    });
  };

  const handleReply = (msg) => {
    if (onSelectReply) {
      onSelectReply(msg);
    } else {
      toast.info(`Đang trả lời tin nhắn: "${msg.text.slice(0, 25)}..."`, "Trả lời");
    }
  };

  const handleForward = (msg) => {
    toast.info(`Đã chọn chuyển tiếp tin nhắn: "${msg.text.slice(0, 25)}..."`, "Chuyển tiếp");
  };

  if (!messages || messages.length === 0) {
    return (
      <div className={styles.empty_container}>
        <p className={styles.empty_text}>Chưa có tin nhắn nào trong cuộc trò chuyện này.</p>
      </div>
    );
  }

  return (
    <ScrollArea className={styles.messages_scroll} ref={containerRef}>
      {/* Date Divider */}
      <div className={styles.date_divider}>
        <span className={styles.date_pill}>Hôm nay</span>
      </div>

      {/* Message Bubbles */}
      {messages.map((msg) => {
        const isMe = msg.sender === "me";
        const msgReaction = reactions[msg.id];

        return (
          <div
            key={msg.id}
            className={`${styles.message_row} ${isMe ? styles.message_row_me : styles.message_row_them}`}
          >
            {/* Show avatar for incoming messages */}
            {!isMe && (
              <img
                src={activeChat?.avatar}
                alt={activeChat?.name || "Avatar"}
                className={styles.avatar}
              />
            )}

            <div className={styles.bubble_wrapper}>
              <div className={styles.bubble_box}>
                {/* Floating Action Bar on Message Hover */}
                <div className={`${styles.action_bar} ${isMe ? styles.action_bar_me : styles.action_bar_them}`}>
                  {/* React / Emoji Button with Hover Emoji Bar */}
                  <div className={styles.emoji_btn_wrapper}>
                    <button
                      type="button"
                      className={`${styles.action_btn} ${msgReaction ? styles.action_btn_active : ""}`}
                      onClick={() => handleToggleReaction(msg.id, "❤️")}
                      title="Thả tim / Rê chuột chọn Emoji"
                    >
                      <Icon name="Smile" size={15} className={msgReaction ? styles.smile_icon_active : ""} />
                    </button>

                    {/* Quick Emoji Picker Dropdown on Hover */}
                    <div className={styles.emoji_picker}>
                      {QUICK_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className={styles.emoji_item}
                          onClick={() => handleToggleReaction(msg.id, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reply Button */}
                  <button
                    type="button"
                    className={styles.action_btn}
                    onClick={() => handleReply(msg)}
                    title="Trả lời tin nhắn"
                  >
                    <Icon name="Reply" size={14} />
                  </button>

                  {/* Forward / Share Button */}
                  <button
                    type="button"
                    className={styles.action_btn}
                    onClick={() => handleForward(msg)}
                    title="Chuyển tiếp tin nhắn"
                  >
                    <Icon name="Share" size={14} />
                  </button>
                </div>

                {/* Message Bubble Content */}
                <div
                  className={`${styles.bubble} ${isMe ? styles.bubble_me : styles.bubble_them}`}
                >
                  <p className={styles.msg_text}>{msg.text}</p>

                  {/* Formatted Code Block inside message bubble */}
                  {msg.codeSnippet && (
                    <div className={styles.code_box}>
                      <pre className={styles.code_pre}>
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Reaction Badge attached to bubble corner */}
                  {msgReaction && (
                    <span
                      className={`${styles.reaction_badge} ${isMe ? styles.reaction_badge_me : styles.reaction_badge_them}`}
                      onClick={() => handleToggleReaction(msg.id, msgReaction)}
                      title="Bấm để bỏ thả tim"
                    >
                      {msgReaction} 1
                    </span>
                  )}
                </div>
              </div>

              {/* Timestamp */}
              <span className={styles.timestamp}>{msg.time}</span>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  );
}
