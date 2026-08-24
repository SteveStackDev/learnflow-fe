import React from "react";
import { Button, Badge, ScrollArea } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestLiveLeaderboard.module.css";

const DEFAULT_LEADERBOARD = [
  { rank: 1, name: "Michael Steve", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", score: "5,200 pt", isCurrentUser: false },
  { rank: 2, name: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", score: "4,850 pt", isCurrentUser: false },
  { rank: 3, name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", score: "4,200 pt", isCurrentUser: false },
  { rank: 4, name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", score: "3,800 pt", isCurrentUser: false },
  { rank: 42, name: "AlexCoder99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexCoder99", score: "1,500 pt", isCurrentUser: true },
];

export function ContestLiveLeaderboard({
  leaderboard,
  onClose,
  onSelectUser,
}) {
  const data = leaderboard && leaderboard.length > 0 ? leaderboard : DEFAULT_LEADERBOARD;

  const topRanks = data.filter((item) => item.rank <= 3);
  const otherRanks = data.filter((item) => item.rank > 3);
  const currentUserItem = data.find((item) => item.isCurrentUser);

  const cleanName = (name) => {
    return (name || "").replace(/\s*\(Bạn\)/gi, "").trim();
  };

  const handleOpenUser = (item) => {
    onSelectUser?.({
      id: item.isCurrentUser ? "user-01" : "user-02",
      username: cleanName(item.name),
      handle: cleanName(item.name).toLowerCase().replace(/\s+/g, "_"),
      avatar: item.avatar,
      bio: "Thí sinh tham gia Cuộc thi Thuật toán trực tuyến FySet Contest.",
      userTitle: `Hạng #${item.rank} Contest`,
      statusMessage: `Đang đạt điểm số ${item.score} 🔥`,
    });
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return styles.rank_gold;
    if (rank === 2) return styles.rank_silver;
    if (rank === 3) return styles.rank_bronze;
    return styles.rank_default;
  };

  return (
    <aside className={styles.drawer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.trophy_icon_wrap}>
            <Icon name="Trophy" size={18} className={styles.header_icon} />
          </div>
          <h3 className={styles.title}>Live Leaderboard</h3>
          <Badge variant="error" size="sm" className={styles.live_badge}>LIVE</Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          leftIcon="X"
          onClick={onClose}
          title="Đóng bảng xếp hạng"
          aria-label="Đóng"
        />
      </div>

      {/* Sticky Current User Rank Card */}
      {currentUserItem && (
        <div
          className={styles.user_highlight}
          onClick={() => handleOpenUser(currentUserItem)}
          style={{ cursor: "pointer" }}
          title="Click để xem Profile của bạn"
        >
          <div className={styles.user_left}>
            <img src={currentUserItem.avatar} alt={currentUserItem.name} className={styles.user_avatar} />
            <div className={styles.user_meta}>
              <span className={styles.user_name}>
                {cleanName(currentUserItem.name)} <span className={styles.you_tag}>(Bạn)</span>
              </span>
              <span className={styles.user_rank_tag}>Thứ hạng #{currentUserItem.rank}</span>
            </div>
          </div>
          <span className={styles.user_score_badge}>{currentUserItem.score}</span>
        </div>
      )}

      {/* Leaderboard Scrollable List */}
      <ScrollArea className={styles.list_scroll}>
        <div className={styles.rank_list}>
          {topRanks.map((item) => (
            <div
              key={item.rank}
              className={`${styles.rank_row} ${getRankBadgeClass(item.rank)}`}
              onClick={() => handleOpenUser(item)}
              style={{ cursor: "pointer" }}
              title="Click để xem Profile"
            >
              <div className={styles.row_left}>
                <div className={styles.medal_badge}>
                  {item.rank === 1 && <span className={styles.medal_icon}>👑</span>}
                  {item.rank === 2 && <span className={styles.medal_icon}>🥈</span>}
                  {item.rank === 3 && <span className={styles.medal_icon}>🥉</span>}
                  <span>#{item.rank}</span>
                </div>
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
                <span className={styles.name}>{cleanName(item.name)}</span>
              </div>
              <span className={styles.score}>{item.score}</span>
            </div>
          ))}

          {otherRanks.length > 0 && <div className={styles.divider_dots}>• • •</div>}

          {otherRanks.map((item) => (
            <div
              key={item.rank}
              className={`${styles.rank_row} ${item.isCurrentUser ? styles.rank_row_user : ""}`}
              onClick={() => handleOpenUser(item)}
              style={{ cursor: "pointer" }}
              title="Click để xem Profile"
            >
              <div className={styles.row_left}>
                <span className={styles.rank_num}>#{item.rank}</span>
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
                <span className={styles.name}>
                  {cleanName(item.name)}
                  {item.isCurrentUser && <span className={styles.you_tag}> (Bạn)</span>}
                </span>
              </div>
              <span className={styles.score}>{item.score}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default ContestLiveLeaderboard;
