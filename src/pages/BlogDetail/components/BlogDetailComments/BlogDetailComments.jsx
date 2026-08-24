import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { ChatInput } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./BlogDetailComments.module.css";

export default function BlogDetailComments({ comments = [], onSelectUser }) {
  const { toast } = useToast();
  const [commentList, setCommentList] = useState(comments);

  const handleSendComment = ({ text }) => {
    if (!text || !text.trim()) return;

    const newComment = {
      id: `c-new-${Date.now()}`,
      author: "Bạn (Học viên FySet)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      time: "Vừa xong",
      content: text,
      likes: 0,
    };

    setCommentList((prev) => [...prev, newComment]);
    toast.success("Đã đăng bình luận của bạn thành công!", "Thảo luận");
  };

  return (
    <section className={styles.comments_section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Bình luận <span className={styles.count_badge}>({commentList.length})</span>
        </h2>
      </div>

      {/* List of existing comments */}
      <div className={styles.comments_list}>
        {commentList.map((item) => (
          <div key={item.id} className={styles.comment_card}>
            <img
              src={item.avatar}
              alt={item.author}
              className={styles.avatar}
              onClick={() =>
                onSelectUser?.({
                  id: "user-02",
                  username: item.author,
                  handle: item.author.toLowerCase().replace(/\s+/g, "_"),
                  avatar: item.avatar,
                  bio: "Thành viên tích cực thảo luận tại FySet.",
                })
              }
              style={{ cursor: "pointer" }}
              title="Click để xem Profile"
            />
            <div className={styles.comment_body}>
              <div className={styles.meta}>
                <span
                  className={styles.author_name}
                  onClick={() =>
                    onSelectUser?.({
                      id: "user-02",
                      username: item.author,
                      handle: item.author.toLowerCase().replace(/\s+/g, "_"),
                      avatar: item.avatar,
                      bio: "Thành viên tích cực thảo luận tại FySet.",
                    })
                  }
                  style={{ cursor: "pointer" }}
                  title="Click để xem Profile"
                >
                  {item.author}
                </span>
                <span className={styles.time_text}>{item.time}</span>
              </div>
              <p className={styles.content}>{item.content}</p>
              <div className={styles.actions}>
                <button type="button" className={styles.like_btn}>
                  <Icon name="ThumbsUp" size={14} />
                  <span>{item.likes > 0 ? item.likes : "Thích"}</span>
                </button>
                <button type="button" className={styles.reply_btn}>
                  <span>Phản hồi</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ChatInput pinned cleanly at bottom */}
      <div className={styles.input_wrapper}>
        <ChatInput
          placeholder="Chia sẻ suy nghĩ hoặc đặt câu hỏi về bài viết này..."
          onSend={handleSendComment}
        />
      </div>
    </section>
  );
}
