import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileNetworkTab.module.css";

export default function ProfileNetworkTab({ network = {}, activities = [], onSelectUser }) {
  const [subTab, setSubTab] = useState("friends"); // 'friends' | 'followers' | 'activities'

  const friendsList = network.friends || [];
  const followersList = network.followers || [];

  return (
    <div className={`${styles.tab_card} reveal-card`}>
      <div className={styles.tab_header}>
        <div className={styles.sub_tabs_bar}>
          <button
            type="button"
            className={`${styles.sub_tab_btn} ${subTab === "friends" ? styles.sub_tab_active : ""}`}
            onClick={() => setSubTab("friends")}
          >
            <Icon name="Users" size={15} />
            <span>Bạn Bè ({friendsList.length})</span>
          </button>

          <button
            type="button"
            className={`${styles.sub_tab_btn} ${subTab === "followers" ? styles.sub_tab_active : ""}`}
            onClick={() => setSubTab("followers")}
          >
            <Icon name="UserCheck" size={15} />
            <span>Người Theo Dõi ({followersList.length})</span>
          </button>

          <button
            type="button"
            className={`${styles.sub_tab_btn} ${subTab === "activities" ? styles.sub_tab_active : ""}`}
            onClick={() => setSubTab("activities")}
          >
            <Icon name="Activity" size={15} />
            <span>Lịch Sử Hoạt Động ({activities.length})</span>
          </button>
        </div>
      </div>

      {/* Sub Tab Content */}
      {subTab === "friends" && (
        <div className={styles.user_grid}>
          {friendsList.map((user) => (
            <div key={user.id} className={styles.user_card}>
              <div
                className={styles.user_card_body}
                onClick={() => onSelectUser?.(user)}
                title="Click để xem Profile"
              >
                <img src={user.avatar} alt={user.name} className={styles.user_avatar} />
                <div className={styles.user_meta}>
                  <h5 className={styles.user_name}>{user.name}</h5>
                  <span className={styles.user_handle}>@{user.handle}</span>
                  <span className={styles.user_title}>{user.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "followers" && (
        <div className={styles.user_grid}>
          {followersList.map((user) => (
            <div key={user.id} className={styles.user_card}>
              <div
                className={styles.user_card_body}
                onClick={() => onSelectUser?.(user)}
                title="Click để xem Profile"
              >
                <img src={user.avatar} alt={user.name} className={styles.user_avatar} />
                <div className={styles.user_meta}>
                  <h5 className={styles.user_name}>{user.name}</h5>
                  <span className={styles.user_handle}>@{user.handle}</span>
                  <span className={styles.user_title}>{user.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "activities" && (
        <div className={styles.activities_list}>
          {activities.map((act) => (
            <div key={act.id} className={styles.activity_item}>
              <div className={styles.act_icon_circle}>
                <Icon name="MessageSquare" size={16} />
              </div>

              <div className={styles.act_meta}>
                <h5 className={styles.act_title}>{act.title}</h5>
                <span className={styles.act_time}>{act.time} • 👍 {act.upvotes} lượt hữu ích</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
