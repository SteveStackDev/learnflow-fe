import React from "react";
import { Card, Badge } from "~/components/ui";
import styles from "./ContestInfoStandings.module.css";

export default function ContestInfoStandings({ standings = [], onSelectUser }) {
  const defaultStandings = [
    {
      rank: 1,
      name: "SteveStackDev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SteveStack",
      solved: "3 / 3",
      score: 300,
      penalty: "42 phút",
    },
    {
      rank: 2,
      name: "AlexCoder99",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      solved: "3 / 3",
      score: 300,
      penalty: "58 phút",
    },
    {
      rank: 3,
      name: "DevQueen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen",
      solved: "2 / 3",
      score: 200,
      penalty: "35 phút",
    },
    {
      rank: 4,
      name: "AlgoMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Algo",
      solved: "1 / 3",
      score: 100,
      penalty: "12 phút",
    },
  ];

  const items = standings.length > 0 ? standings : defaultStandings;

  const renderRankBadge = (rank) => {
    if (rank === 1) return <span className={styles.rank_1}>1</span>;
    if (rank === 2) return <span className={styles.rank_2}>2</span>;
    if (rank === 3) return <span className={styles.rank_3}>3</span>;
    return <span className={styles.rank_default}>{rank}</span>;
  };

  return (
    <Card className={styles.container}>
      <h3 className={styles.section_title}>Bảng xếp hạng trực tiếp</h3>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rank_cell}>Hạng</th>
              <th>Thí sinh</th>
              <th>Bài đã AC</th>
              <th>Điểm số</th>
              <th>Thời gian phạt (Penalty)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.rank}>
                <td className={styles.rank_cell}>{renderRankBadge(item.rank)}</td>
                <td>
                  <div
                    className={styles.user_info}
                    onClick={() =>
                      onSelectUser?.({
                        id: "user-01",
                        username: item.name,
                        handle: item.name.toLowerCase().replace(/\s+/g, "_"),
                        avatar: item.avatar,
                        userTitle: `Top #${item.rank} Contestant`,
                        statusMessage: `Đạt ${item.score} pts trong cuộc thi! 🏆`,
                        bio: "Thí sinh xuất sắc trên Bảng xếp hạng trực tiếp.",
                      })
                    }
                    style={{ cursor: "pointer" }}
                    title="Click để xem Profile người dùng"
                  >
                    <img src={item.avatar} alt={`Ảnh đại diện của ${item.name}`} className={styles.user_avatar} />
                    <span className={styles.user_name}>{item.name}</span>
                  </div>
                </td>
                <td>
                  <Badge variant="success">● {item.solved}</Badge>
                </td>
                <td className={styles.score_text}>{item.score} pts</td>
                <td>
                  <span className={styles.time_penalty}>{item.penalty}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
