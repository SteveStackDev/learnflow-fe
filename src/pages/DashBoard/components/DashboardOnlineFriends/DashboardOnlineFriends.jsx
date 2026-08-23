import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardOnlineFriends.module.css";

export default function DashboardOnlineFriends({ onlineFriends = [], onSelectUser }) {
  return (
    <div className={`${styles.friends_widget} reveal-card`}>
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <div className={styles.icon_box}>
            <Icon name="Users" size={16} />
          </div>
          <h4 className={styles.widget_title}>Online Friends ({onlineFriends.length})</h4>
        </div>
      </div>

      <div className={styles.friends_list}>
        {onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className={styles.friend_item}
            onClick={() =>
              onSelectUser?.({
                id: friend.id,
                username: friend.name,
                handle: friend.name.toLowerCase().replace(/\s+/g, "_"),
                avatar: friend.avatar,
                status: friend.status,
                statusMessage: friend.currentActivity,
                bio: friend.bio,
              })
            }
            title="Click để xem Profile bạn bè"
          >
            <div className={styles.avatar_wrapper}>
              <img src={friend.avatar} alt={friend.name} className={styles.avatar} />
              <span
                className={`${styles.status_dot} ${
                  friend.status === "online" ? styles["status_dot--online"] : styles["status_dot--busy"]
                }`}
              />
            </div>

            <div className={styles.friend_meta}>
              <span className={styles.friend_name}>{friend.name}</span>
              <span className={styles.friend_activity}>{friend.currentActivity}</span>
            </div>

            <div className={styles.msg_action}>
              <Icon name="MessageCircle" size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
