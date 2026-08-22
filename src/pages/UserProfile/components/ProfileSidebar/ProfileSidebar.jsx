import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button } from "~/components/ui";
import styles from "./ProfileSidebar.module.css";

export function ProfileSidebar({ user, onSelectUser }) {
  if (!user) return null;

  return (
    <div className={styles.sidebar}>
      {/* 1. Huy hiệu */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Huy hiệu</h3>
        <div className={styles.badges_row}>
          <div className={styles.badge_item} title="Code Master">
            <Icon name="Code" size={20} className={styles.badge_icon_blue} />
          </div>
          <div className={styles.badge_item} title="Contest Champion">
            <Icon name="Award" size={20} className={styles.badge_icon_gold} />
          </div>
          <div className={styles.badge_item} title="Top Performer">
            <Icon name="Rocket" size={20} className={styles.badge_icon_purple} />
          </div>
        </div>
      </div>

      {/* 2. Tài khoản liên kết */}
      <div className={styles.card}>
        <h3 className={styles.card_title}>Tài khoản liên kết</h3>
        <div className={styles.social_list}>
          <a
            href={user.socialLinks?.github || "#"}
            target="_blank"
            rel="noreferrer"
            className={styles.social_item}
          >
            <div className={styles.social_left}>
              <Icon name="Github" size={18} />
              <span>GitHub</span>
            </div>
            <Icon name="ExternalLink" size={14} className={styles.ext_icon} />
          </a>

          <a
            href={user.socialLinks?.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
            className={styles.social_item}
          >
            <div className={styles.social_left}>
              <Icon name="Briefcase" size={18} />
              <span>LinkedIn</span>
            </div>
            <Icon name="ExternalLink" size={14} className={styles.ext_icon} />
          </a>
        </div>
      </div>

      {/* 3. Bạn bè chung */}
      <div className={styles.card}>
        <div className={styles.card_header_between}>
          <h3 className={styles.card_title} style={{ margin: 0 }}>
            Bạn bè chung
          </h3>
          <span className={styles.count_badge}>{user.mutualFriendsCount || 12}</span>
        </div>

        <div className={styles.friends_list}>
          {user.mutualFriends?.map((friend) => (
            <div
              key={friend.id}
              className={styles.friend_item}
              onClick={() => onSelectUser?.(friend)}
              role="button"
              tabIndex={0}
              title="Click để xem Popover Profile"
            >
              <img src={friend.avatar} alt={friend.name} className={styles.friend_avatar} />
              <div className={styles.friend_info}>
                <span className={styles.friend_name}>{friend.name}</span>
                <span className={styles.friend_handle}>@{friend.handle}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="md"
          className={styles.btn_all}
          onClick={() => onSelectUser?.(user.mutualFriends?.[0])}
        >
          Xem tất cả
        </Button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
