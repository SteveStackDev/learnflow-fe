import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestDetailHeader.module.css";

export function ContestDetailHeader({
  contestTitle,
  badgeText,
  initialRemainingSeconds,
  showProblemsList,
  onToggleProblemsList,
  showLeaderboard,
  onToggleLeaderboard,
}) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(initialRemainingSeconds || 6150);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <header className={styles.header_bar}>
      <div className={styles.header_left}>
        <button
          type="button"
          onClick={() => navigate("/contest")}
          className={styles.back_btn}
          title="Quay lại danh sách cuộc thi"
          aria-label="Quay lại"
        >
          <Icon name="ChevronLeft" size={18} />
        </button>

        {/* Toggle Problems List Button */}
        <button
          type="button"
          onClick={onToggleProblemsList}
          className={`${styles.sidebar_toggle_btn} ${showProblemsList ? styles["sidebar_toggle_btn--active"] : ""
            }`}
          title="Bật/Tắt danh sách bài tập"
        >
          <Icon name="List" size={16} />
          <span>Danh sách bài</span>
        </button>

        <div className={styles.contest_meta}>
          <span className={styles.badge_text}>{badgeText || "CONTEST ARENA"}</span>
          <h1 className={styles.contest_title}>{contestTitle}</h1>
        </div>
      </div>

      <div className={styles.header_right}>
        {/* Real-time Countdown Timer */}
        <div className={styles.timer_pill} title="Thời gian làm bài còn lại">
          <Icon name="Clock" size={18} className={styles.timer_icon} />
          <span>{formatTime(seconds)}</span>
        </div>

        {/* Toggle Live Leaderboard Button */}
        <button
          type="button"
          onClick={onToggleLeaderboard}
          className={`${styles.leaderboard_btn} ${showLeaderboard ? styles["leaderboard_btn--active"] : ""
            }`}
          title="Bật/Tắt Bảng xếp hạng trực tiếp"
        >
          <Icon name="Trophy" size={16} />
          <span>Bảng xếp hạng</span>
          <span className={styles.live_badge}>Live</span>
        </button>
      </div>
    </header>
  );
}

export default ContestDetailHeader;
