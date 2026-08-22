import React from "react";
import { ChatInput } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ChatFooter.module.css";

export default function ChatFooter({
  onSendMessage,
  replyingTo,
  onCancelReply,
}) {
  return (
    <footer className={styles.footer}>
      {/* Reply Preview Bar above ChatInput */}
      {replyingTo && (
        <div className={styles.reply_bar}>
          <div className={styles.reply_content}>
            <div className={styles.reply_header}>
              <Icon name="Reply" size={14} className={styles.reply_icon} />
              <span className={styles.reply_author}>
                Đang trả lời <strong>{replyingTo.senderName}</strong>
              </span>
            </div>
            <p className={styles.reply_snippet}>{replyingTo.text}</p>
          </div>

          <button
            type="button"
            className={styles.cancel_btn}
            onClick={onCancelReply}
            title="Hủy trả lời"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      )}

      <ChatInput
        placeholder={
          replyingTo
            ? `Trả lời ${replyingTo.senderName}...`
            : "Nhập tin nhắn..."
        }
        onSend={onSendMessage}
      />
    </footer>
  );
}
