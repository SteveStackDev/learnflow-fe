import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Badge } from "~/components/ui";
import styles from "./ProfileCoverHeader.module.css";

export function ProfileCoverHeader({ user }) {
  return (
    <div className={styles.container}>
      {/* Banner Cover Image */}
      <div
        className={styles.cover_image}
        style={{
          backgroundImage: `url(${user.coverImage})`,
        }}
      >
        <div className={styles.cover_actions}>
          <Button variant="outline" size="sm" leftIcon="UserPlus" className={styles.btn_overlay}>
            Kết bạn
          </Button>
          <Button variant="primary" size="sm" leftIcon="MessageSquare">
            Nhắn tin
          </Button>
        </div>
      </div>

      {/* Profile Main Bar */}
      <div className={styles.profile_bar}>
        <div className={styles.avatar_container}>
          <img src={user.avatar} alt={user.username} className={styles.avatar_img} />
          <span className={styles.status_dot} />
        </div>

        <div className={styles.user_details}>
          <h1 className={styles.username}>{user.username}</h1>
          <span className={styles.handle}>@{user.handle}</span>

          {/* Badges List */}
          <div className={styles.badges_group}>
            <Badge variant="primary" size="md">
              Premium Member
            </Badge>
            <Badge variant="warning" size="md">
              Mentor
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCoverHeader;
