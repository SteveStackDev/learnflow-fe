import React, { useState, useRef } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ChatInput.module.css";

const DEFAULT_EMOJIS = ["😊", "👍", "🚀", "🔥", "❤️", "💡", "👏", "💻", "💯", "🎯"];

export function ChatInput({
  placeholder = "Nhập tin nhắn...",
  onSend,
  className = "",
  disabled = false,
}) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && !attachment) return;

    if (onSend) {
      onSend({ text: trimmed, attachment });
    }

    setText("");
    setAttachment(null);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  const handleSelectEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className={`${styles.chat_input_container} ${className}`}>
      {/* Attachment File Preview Badge */}
      {attachment && (
        <div className={styles.attachment_preview}>
          <Icon name="Paperclip" size={14} />
          <span className={styles.attachment_name}>{attachment}</span>
          <button
            type="button"
            className={styles.remove_attachment_btn}
            onClick={() => setAttachment(null)}
            title="Xóa tệp đính kèm"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      )}

      <div className={styles.chat_input_bar}>
        {/* Attachment Paperclip Button */}
        <input
          type="file"
          ref={fileInputRef}
          className={styles.hidden_file_input}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className={styles.icon_btn}
          onClick={() => fileInputRef.current?.click()}
          title="Đính kèm tệp"
          disabled={disabled}
        >
          <Icon name="Paperclip" size={18} />
        </button>

        {/* Text Area / Input */}
        <input
          type="text"
          className={styles.text_input}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {/* Emoji Selector Button */}
        <div className={styles.emoji_wrapper}>
          <button
            type="button"
            className={`${styles.icon_btn} ${showEmojiPicker ? styles["icon_btn--active"] : ""}`}
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            title="Chọn biểu cảm"
            disabled={disabled}
          >
            <Icon name="Smile" size={18} />
          </button>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className={styles.emoji_popup}>
              {DEFAULT_EMOJIS.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={styles.emoji_item}
                  onClick={() => handleSelectEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          type="button"
          className={styles.send_btn}
          onClick={handleSend}
          disabled={disabled || (!text.trim() && !attachment)}
          title="Gửi tin nhắn"
        >
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
