import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardMiniLeaderboard.module.css";

export default function DashboardMiniLeaderboard({ leaderboard = [], onSelectUser }) {
  const renderMedal = (rank) => {
    if (rank === 1) return <span className={styles.rank_medal}>👑 #1</span>;
    if (rank === 2) return <span className={styles.rank_medal}>🥈 #2</span>;
    if (rank === 3) return <span className={styles.rank_medal}>🥉 #3</span>;
    return <span className={styles.rank_num}>#{rank}</span>;
  };

  return (
    <div className={`${styles.leaderboard_widget} reveal-card`}>
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <div className={styles.icon_box}>
            <Icon name="Trophy" size={16} />
          </div>
          <div>
            <h4 className={styles.widget_title}>Top XP Bứt Phá Tuần</h4>
            <span className={styles.subtitle}>Nhóm học viên năng nổ nhất</span>
          </div>
        </div>

        <Link to="/leaderboard" className={styles.view_link}>
          <span>Bảng tổng</span>
          <Icon name="ArrowRight" size={13} />
        </Link>
      </div>

      <div className={styles.rank_list}>
        {leaderboard.map((item) => (
          <div
            key={item.rank}
            className={`${styles.rank_item} ${
              item.isCurrentUser ? styles["rank_item--user"] : ""
            }`}
            onClick={() =>
              onSelectUser?.({
                id: item.isCurrentUser ? "user-01" : `user-lb-${item.rank}`,
                username: item.name,
                handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                avatar: item.avatar,
                userTitle: `Hạng #${item.rank} XP Weekly`,
                statusMessage: `Đạt ${item.xpGained} điểm kinh nghiệm tuần này! ⚡`,
              })
            }
            title="Click để xem Profile"
          >
            <div className={styles.rank_badge}>{renderMedal(item.rank)}</div>

            <img src={item.avatar} alt={item.name} className={styles.avatar} />

            <div className={styles.user_info}>
              <span className={styles.name}>
                {item.name} {item.isCurrentUser && <span className={styles.you_tag}>(Bạn)</span>}
              </span>
              <span className={styles.xp_gained}>{item.xpGained}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
