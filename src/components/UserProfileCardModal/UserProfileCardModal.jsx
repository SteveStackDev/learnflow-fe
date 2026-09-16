import React, { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./UserProfileCardModal.module.css";

export function UserProfileCardModal({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [friendshipState, setFriendshipState] = useState(
    user?.friendshipStatus || "none",
  );

  if (!isOpen || !user) return null;

  const handleViewFullProfile = () => {
    onClose?.();
    navigate(`/profile/${user.id || "user-01"}`);
  };

  const handleToggleFollow = (e) => {
    e.stopPropagation();

    if (friendshipState === "none") {
      setFriendshipState("pending");
      toast.success(
        `Đã gửi lời mời kết bạn tới ${user.username || user.name}!`,
        "Kết bạn",
      );
    } else if (friendshipState === "pending") {
      setFriendshipState("none");
      toast.info(
        `Đã hủy lời mời kết bạn với ${user.username || user.name}.`,
        "Kết bạn",
      );
    } else {
      toast.info(
        `Bạn và ${user.username || user.name} đã là bạn bè trên FySet!`,
        "Bạn bè",
      );
    }
  };

  const handleSendMessage = (e) => {
    e.stopPropagation();
    onClose?.();
    toast.info(`Mở cuộc trò chuyện với ${user.username || user.name}...`, "Messenger");
    navigate("/chat");
  };

  const handleRecommend = (e) => {
    e.stopPropagation();
    toast.success(`Đã đề xuất hồ sơ năng lực của ${user.username || user.name}! ⭐`, "Đề xuất");
  };

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.card_container} onClick={(e) => e.stopPropagation()}>
        {/* Header Cover Banner */}
        <div
          className={styles.cover_banner}
          style={{
            backgroundImage: `url(${user.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"})`,
          }}
        >
          <button type="button" className={styles.close_btn} onClick={onClose} title="Đóng">
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className={styles.card_content}>
          {/* Avatar & Status Indicator */}
          <div className={styles.avatar_wrapper}>
            <img src={user.avatar} alt={user.username || user.name} className={styles.avatar_img} />
            <span
              className={`${styles.status_dot} ${
                user.status === "dnd" ? styles.status_dnd : styles.status_online
              }`}
            />
          </div>

          {/* Status Message Tooltip Pill */}
          {(user.statusMessage || user.currentActivity) && (
            <div className={styles.status_pill}>
              <Icon name="Sparkles" size={14} className={styles.status_icon} />
              <span>{user.statusMessage || user.currentActivity}</span>
            </div>
          )}

          {/* User Name & Handle */}
          <div className={styles.user_header}>
            <div className={styles.name_row}>
              <h3 className={styles.display_name}>{user.username || user.name}</h3>
              <Icon name="Moon" size={16} className={styles.moon_icon} />
            </div>

            <div className={styles.handle_row}>
              <span className={styles.handle_text}>@{user.handle || "user"}</span>
              {(user.userTitle || user.title) && (
                <>
                  <span className={styles.dot_separator}>•</span>
                  <span className={styles.user_title_text}>{user.userTitle || user.title}</span>
                </>
              )}
            </div>
          </div>

          {/* Badges Row */}
          <div className={styles.badges_row}>
            <span className={`${styles.badge_icon_chip} ${styles.badge_red}`}>
              <Icon name="ChevronDown" size={12} />
            </span>
            <span className={`${styles.badge_icon_chip} ${styles.badge_green}`}>
              <Icon name="Hash" size={12} />
            </span>
            <span className={`${styles.badge_icon_chip} ${styles.badge_purple}`}>
              <Icon name="Award" size={12} />
            </span>
            <span className={`${styles.badge_icon_chip} ${styles.badge_emerald}`}>
              <Icon name="Leaf" size={12} />
            </span>
            <span className={`${styles.badge_icon_chip} ${styles.badge_blue}`}>
              <Icon name="Sparkles" size={12} />
            </span>
          </div>

          {/* Bio Quote */}
          {user.bio && <p className={styles.bio_text}>{user.bio}</p>}

          {/* Actions List */}
          <div className={styles.actions_list}>
            {/* PRIMARY ACTION: View Full Profile Page */}
            <button
              type="button"
              className={styles.primary_view_btn}
              onClick={handleViewFullProfile}
            >
              <Icon name="User" size={16} />
              <span>Xem chi tiết hồ sơ</span>
              <Icon name="ArrowRight" size={16} className={styles.arrow_icon} />
            </button>

            {/* Context Action 1: Connect / Follow */}
            <div className={styles.action_item} onClick={handleToggleFollow}>
              <div className={styles.action_left}>
                <Icon
                  name={
                    friendshipState === "accepted"
                      ? "Check"
                      : friendshipState === "pending"
                      ? "Clock"
                      : "UserPlus"
                  }
                  size={16}
                />
                <span>
                  {friendshipState === "accepted"
                    ? "Bạn bè"
                    : friendshipState === "pending"
                    ? "Đã gửi lời mời (Đang chờ)"
                    : "+ Kết bạn / Theo dõi"}
                </span>
              </div>
            </div>

            {/* Context Action 2: Direct Message */}
            <div className={styles.action_item} onClick={handleSendMessage}>
              <div className={styles.action_left}>
                <Icon name="MessageSquare" size={16} />
                <span>Nhắn tin riêng</span>
              </div>
            </div>

            {/* Context Action 3: Recommend */}
            <div className={styles.action_item} onClick={handleRecommend}>
              <div className={styles.action_left}>
                <Icon name="Star" size={16} />
                <span>Đề xuất hồ sơ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCardModal;
