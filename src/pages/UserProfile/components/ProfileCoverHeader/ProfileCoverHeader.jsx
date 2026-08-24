import React, { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ProfileCoverHeader.module.css";

export default function ProfileCoverHeader({ user }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);

  if (!user) return null;

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
    if (!isFollowing) {
      toast.success(`Đã gửi lời mời kết bạn / theo dõi ${user.username}!`, "Mạng xã hội");
    } else {
      toast.info(`Đã hủy theo dõi ${user.username}.`, "Mạng xã hội");
    }
  };

  const handleRecommend = () => {
    toast.success(`Đã đề xuất hồ sơ năng lực của ${user.username}! ⭐`, "Đề xuất");
  };

  const handleSendMessage = () => {
    toast.info(`Đang mở hộp thoại chat với ${user.username}...`, "Messenger");
    navigate("/chat");
  };

  return (
    <div className={`${styles.header_card} reveal-card`}>
      {/* Cover Banner Image */}
      <div
        className={styles.cover_banner}
        style={{ backgroundImage: `url(${user.coverImage})` }}
      >
        <div className={styles.cover_overlay} />
      </div>

      {/* Profile Main Body Bar */}
      <div className={styles.header_body}>
        {/* Avatar Wrapper */}
        <div className={styles.avatar_container}>
          <img src={user.avatar} alt={user.username} className={styles.avatar} />
          <span
            className={`${styles.status_dot} ${
              user.status === "online" ? styles["status_dot--online"] : styles["status_dot--dnd"]
            }`}
            title={`Trạng thái: ${user.status}`}
          />
        </div>

        {/* User Information & Badges Row */}
        <div className={styles.info_row}>
          <div className={styles.name_meta_block}>
            <div className={styles.title_tags_row}>
              {user.badgeTags?.map((tag) => (
                <span key={tag.id} className={`${styles.badge_tag} ${styles[`badge_tag--${tag.variant}`]}`}>
                  {tag.label}
                </span>
              ))}
            </div>

            <h1 className={styles.username}>{user.username}</h1>
            <span className={styles.handle}>@{user.handle}</span>

            {/* Technical Bio */}
            {user.technicalBio && (
              <p className={styles.tech_bio}>
                <Icon name="Briefcase" size={14} />
                <span>{user.technicalBio}</span>
              </p>
            )}

            {/* Short Bio */}
            <p className={styles.bio_desc}>{user.bio}</p>

            {/* Social Links */}
            <div className={styles.social_links_row}>
              {user.socialLinks?.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social_btn}
                  title="GitHub Profile"
                >
                  <Icon name="Code" size={14} />
                  <span>GitHub</span>
                </a>
              )}

              {user.socialLinks?.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social_btn}
                  title="LinkedIn Profile"
                >
                  <Icon name="Linkedin" size={14} />
                  <span>LinkedIn</span>
                </a>
              )}

              {user.socialLinks?.website && (
                <a
                  href={user.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social_btn}
                  title="Personal Site"
                >
                  <Icon name="Globe" size={14} />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Primary Action Buttons (Dynamic Context) */}
          <div className={styles.action_buttons_block}>
            {user.isSelf ? (
              <button
                type="button"
                className={styles.primary_edit_btn}
                onClick={() => navigate("/setting")}
                title="Chuyển sang trang Cài đặt & Sửa hồ sơ"
              >
                <Icon name="Settings" size={15} />
                <span>Chỉnh sửa Profile</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={`${styles.follow_btn} ${isFollowing ? styles.follow_btn_active : ""}`}
                  onClick={handleToggleFollow}
                >
                  <Icon name={isFollowing ? "Check" : "UserPlus"} size={15} />
                  <span>{isFollowing ? "Đã kết bạn" : "+ Kết bạn / Follow"}</span>
                </button>

                <button
                  type="button"
                  className={styles.message_btn}
                  onClick={handleSendMessage}
                >
                  <Icon name="MessageSquare" size={15} />
                  <span>Nhắn tin</span>
                </button>

                <button
                  type="button"
                  className={styles.recommend_btn}
                  onClick={handleRecommend}
                  title="Đề xuất hồ sơ năng lực"
                >
                  <Icon name="Star" size={15} />
                  <span>Đề xuất</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
