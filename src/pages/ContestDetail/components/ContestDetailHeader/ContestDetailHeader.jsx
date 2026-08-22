import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Badge } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestDetailHeader.module.css";

export function ContestDetailHeader({
  contestTitle,
  badgeText,
  remainingSeconds = 5400,
  showProblemsList,
  onToggleProblemsList,
  showLeaderboard,
  onToggleLeaderboard,
}) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(remainingSeconds);

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
      {/* Left: Back Button & Contest Info */}
      <div className={styles.header_left}>
        <Button
          variant="outlined"
          leftIcon="ChevronLeft"
          onClick={() => navigate("/contest/list")}
          title="Quay lại danh sách cuộc thi"
          aria-label="Quay lại"
        />

        <div className={styles.contest_meta}>
          <Badge variant="primary" size="sm">{badgeText || "CONTEST ARENA"}</Badge>
          <h1 className={styles.contest_title}>{contestTitle}</h1>
        </div>
      </div>

      {/* Center: Countdown Timer */}
      <div className={styles.header_center}>
        <div className={styles.timer_pill} title="Thời gian làm bài còn lại">
          <Icon name="Clock" size={16} className={styles.timer_icon} />
          <span>{formatTime(seconds)}</span>
        </div>
      </div>

      {/* Right: Workspace Action Toggles */}
      <div className={styles.header_right}>
        <Button
          variant={showProblemsList ? "contained" : "outlined"}
          leftIcon="List"
          onClick={onToggleProblemsList}
          title="Bật/Tắt danh sách bài tập"
        >
          <span>Danh sách bài</span>
        </Button>

        <Button
          variant={showLeaderboard ? "contained" : "outlined"}
          leftIcon="Trophy"
          onClick={onToggleLeaderboard}
          title="Bật/Tắt Bảng xếp hạng trực tiếp"
        >
          <span>Bảng xếp hạng</span>
          <Badge variant="error" size="sm" style={{ marginLeft: "6px" }}>LIVE</Badge>
        </Button>
      </div>
    </header>
  );
}

export default ContestDetailHeader;
