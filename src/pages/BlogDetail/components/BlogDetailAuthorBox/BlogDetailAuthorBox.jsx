import React, { useState } from "react";
import Button from "~/components/ui/Button/Button";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./BlogDetailAuthorBox.module.css";

export default function BlogDetailAuthorBox({ author, onSelectUser }) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  if (!author) return null;

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
    if (!isFollowing) {
      toast.success(`Đã theo dõi tác giả ${author.name}!`, "Cộng đồng");
    } else {
      toast.info(`Đã bỏ theo dõi tác giả ${author.name}.`, "Cộng đồng");
    }
  };

  const handleOpenProfile = () => {
    onSelectUser?.({
      id: "user-01",
      username: author.name,
      handle: "alex_t",
      avatar: author.avatar,
      userTitle: author.role,
      bio: author.bio || "Frontend Developer | React Enthusiast | Đam mê sáng tạo.",
      statusMessage: "Đã đăng bài viết mới 📝",
    });
  };

  return (
    <div className={styles.author_box}>
      <img
        src={author.avatar}
        alt={author.name}
        className={styles.avatar}
        onClick={handleOpenProfile}
        style={{ cursor: "pointer" }}
        title="Click để xem Profile tác giả"
      />
      <div className={styles.info}>
        <div className={styles.name_row}>
          <div>
            <h3
              className={styles.name}
              onClick={handleOpenProfile}
              style={{ cursor: "pointer" }}
              title="Click để xem Profile tác giả"
            >
              {author.name}
            </h3>
            <p className={styles.role}>{author.role}</p>
          </div>
          <Button
            variant={isFollowing ? "outlined" : "contained"}
            size="sm"
            onClick={handleToggleFollow}
            className={styles.follow_btn}
          >
            {isFollowing ? "Đã theo dõi" : "Theo dõi"}
          </Button>
        </div>
        <p className={styles.bio}>{author.bio}</p>
      </div>
    </div>
  );
}
