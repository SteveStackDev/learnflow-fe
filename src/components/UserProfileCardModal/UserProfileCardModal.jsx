import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import styles from "./UserProfileCardModal.module.css";

export function UserProfileCardModal({ isOpen, onClose, user }) {
  const navigate = useNavigate();

  if (!isOpen || !user) return null;

  const handleViewFullProfile = () => {
    onClose?.();
    navigate(`/profile/${user.id || "user-01"}`);
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
            <img src={user.avatar} alt={user.username} className={styles.avatar_img} />
            <span
              className={`${styles.status_dot} ${
                user.status === "dnd" ? styles.status_dnd : styles.status_online
              }`}
            />
          </div>

          {/* Status Message Tooltip Pill */}
          {user.statusMessage && (
            <div className={styles.status_pill}>
              <Icon name="PlusCircle" size={14} className={styles.status_icon} />
              <span>{user.statusMessage}</span>
            </div>
          )}

          {/* User Name & Handle */}
          <div className={styles.user_header}>
            <div className={styles.name_row}>
              <h3 className={styles.display_name}>{user.username}</h3>
              <Icon name="Moon" size={16} className={styles.moon_icon} />
            </div>

            <div className={styles.handle_row}>
              <span className={styles.handle_text}>@{user.handle || "user"}</span>
              {user.userTitle && (
                <>
                  <span className={styles.dot_separator}>•</span>
                  <span className={styles.user_title_text}>{user.userTitle}</span>
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

            {/* Quick Action Item 1 */}
            <div className={styles.action_item}>
              <div className={styles.action_left}>
                <Icon name="Edit3" size={16} />
                <span>Sửa Hồ Sơ</span>
              </div>
              <Badge variant="error" size="sm">MỚI</Badge>
            </div>

            {/* Quick Action Item 2 */}
            <div className={styles.action_item}>
              <div className={styles.action_left}>
                <span className={`${styles.status_dot_small} ${styles.status_dnd}`} />
                <span>Vui Lòng Không Làm Phiền</span>
              </div>
              <Icon name="BellOff" size={14} className={styles.action_icon_sub} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCardModal;
