import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestLiveLeaderboard.module.css";

export function ContestLiveLeaderboard({
  leaderboard,
  onClose,
}) {
  if (!leaderboard) return null;

  const topRanks = leaderboard.filter((item) => item.rank <= 3);
  const otherRanks = leaderboard.filter((item) => item.rank > 3);
  const currentUserItem = leaderboard.find((item) => item.isCurrentUser);

  return (
    <aside className={styles.drawer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.header_left}>
          <Icon name="Trophy" size={18} className={styles.header_icon} />
          <h3 className={styles.title}>Live Leaderboard</h3>
          <span className={styles.live_badge}>Live</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={styles.close_btn}
          title="Đóng bảng xếp hạng"
          aria-label="Đóng"
        >
          <Icon name="X" size={18} />
        </button>
      </div>

      {/* Current User Card */}
      {currentUserItem && (
        <div className={styles.user_highlight}>
          <span className={styles.user_rank_badge}>{currentUserItem.rank}</span>
          <span className={styles.user_name}>{currentUserItem.name}</span>
          <span className={styles.user_score}>{currentUserItem.score}</span>
        </div>
      )}

      {/* Leaderboard List */}
      <div className={styles.list_scroll}>
        {topRanks.map((item) => (
          <div key={item.rank} className={styles.rank_row}>
            <div className={styles.row_left}>
              <span className={`${styles.rank_num} ${styles[`rank_num--${item.rank}`]}`}>
                {item.rank}
              </span>
              <img src={item.avatar} alt={item.name} className={styles.avatar} />
              <span className={styles.name}>{item.name}</span>
            </div>
            <span className={styles.score}>{item.score}</span>
          </div>
        ))}

        <div className={styles.divider_dots}>...</div>

        {otherRanks.map((item) => (
          <div key={item.rank} className={styles.rank_row}>
            <div className={styles.row_left}>
              <span className={styles.rank_num}>{item.rank}</span>
              <img src={item.avatar} alt={item.name} className={styles.avatar} />
              <span className={styles.name}>{item.name}</span>
            </div>
            <span className={styles.score}>{item.score}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ContestLiveLeaderboard;
