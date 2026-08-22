import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./BlogDetailCover.module.css";

export default function BlogDetailCover({ coverImage, title }) {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Đã sao chép liên kết bài viết vào bộ nhớ tạm!", "Chia sẻ");
  };

  const handleShareSocial = (platform) => {
    toast.info(`Mở cửa sổ chia sẻ lên ${platform}!`, "Chia sẻ bài viết");
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    if (!isBookmarked) {
      toast.success("Đã lưu bài viết vào danh sách yêu thích của bạn!", "Bookmark");
    } else {
      toast.info("Đã bỏ lưu bài viết khỏi danh sách.", "Bookmark");
    }
  };

  return (
    <div className={styles.cover_container}>
      {/* High-res Cover Image */}
      <div className={styles.image_wrapper}>
        <img src={coverImage} alt={title || "Blog cover image"} className={styles.cover_image} />
      </div>

      {/* Integrated Social Share Bar Directly Below Image */}
      <div className={styles.share_bar}>
        <div className={styles.share_left}>
          <span className={styles.share_label}>
            <Icon name="Share2" size={16} />
            Chia sẻ bài viết:
          </span>
          <div className={styles.social_buttons}>
            <button
              type="button"
              className={styles.share_btn}
              onClick={() => handleShareSocial("Facebook")}
              title="Chia sẻ lên Facebook"
            >
              <Icon name="Share2" size={16} />
              <span>Facebook</span>
            </button>
            <button
              type="button"
              className={styles.share_btn}
              onClick={() => handleShareSocial("Twitter")}
              title="Chia sẻ lên X (Twitter)"
            >
              <Icon name="Send" size={16} />
              <span>Twitter / X</span>
            </button>
            <button
              type="button"
              className={styles.share_btn}
              onClick={handleCopyLink}
              title="Sao chép đường dẫn"
            >
              <Icon name="Copy" size={16} />
              <span>Sao chép link</span>
            </button>
          </div>
        </div>

        <div className={styles.share_right}>
          <button
            type="button"
            className={`${styles.bookmark_btn} ${isBookmarked ? styles.bookmark_active : ""}`}
            onClick={handleBookmark}
            title={isBookmarked ? "Đã lưu bài viết" : "Lưu bài viết"}
          >
            <Icon name="Bookmark" size={18} />
            <span>{isBookmarked ? "Đã lưu" : "Lưu bài viết"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
