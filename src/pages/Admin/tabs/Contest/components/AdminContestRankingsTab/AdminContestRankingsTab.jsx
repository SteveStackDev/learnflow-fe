import React from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";
import { MOCK_CONTEST_RANKINGS } from "~/constants/mockAdminContest";
import styles from "./AdminContestRankingsTab.module.css";

export default function AdminContestRankingsTab() {
  const getRankClass = (rank) => {
    if (rank === 1) return styles.rank_1;
    if (rank === 2) return styles.rank_2;
    if (rank === 3) return styles.rank_3;
    return "";
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.card_title}>
        <Icon name="Trophy" size={18} /> Live Leaderboard & Rankings
      </h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Participant</th>
            <th>Score</th>
            <th>Solved</th>
            <th>Penalty Time</th>
            <th>Submission Status</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_CONTEST_RANKINGS.map((rk) => (
            <tr key={rk.rank}>
              <td>
                <span className={`${styles.rank_badge} ${getRankClass(rk.rank)}`}>
                  {rk.rank}
                </span>
              </td>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 700 }}>{rk.name}</span>
                  <span style={{ fontSize: "0.775rem", opacity: 0.7 }}>@{rk.username}</span>
                </div>
              </td>
              <td><span className={styles.score_val}>{rk.score} pts</span></td>
              <td style={{ fontWeight: 700 }}>{rk.solved}</td>
              <td style={{ fontFamily: "monospace" }}>{rk.penalty}</td>
              <td>
                <Badge variant={rk.status === "Finished" ? "success" : "warning"} size="sm">
                  {rk.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
