import React from "react";
import { Card, Badge } from "~/components/ui";
import styles from "./ContestInfoSubmissions.module.css";

export default function ContestInfoSubmissions({ submissions = [] }) {
  const currentUser = {
    name: "Bạn (SteveStackDev)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SteveStack",
  };

  const defaultSubmissions = [
    {
      id: "#104859",
      problem: "A. Hot Potatoes at the Fairy Warehouse",
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      time: "14/08/2026 10:15:22",
      language: "C++ 20",
      status: "AC",
      statusText: "Accepted",
    },
    {
      id: "#104852",
      problem: "B. A Ribbon for Tomorrow",
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      time: "14/08/2026 09:30:11",
      language: "C++ 20",
      status: "AC",
      statusText: "Accepted",
    },
    {
      id: "#104845",
      problem: "C. Even If the World Turns",
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      time: "14/08/2026 09:05:44",
      language: "C++ 20",
      status: "WA",
      statusText: "Wrong Answer (Test 14)",
    },
    {
      id: "#104840",
      problem: "C. Even If the World Turns",
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      time: "14/08/2026 08:48:10",
      language: "Python 3.11",
      status: "TLE",
      statusText: "Time Limit Exceeded",
    },
  ];

  const items = submissions.length > 0 ? submissions : defaultSubmissions;

  const renderStatusBadge = (sub) => {
    if (sub.status === "AC") {
      return <Badge variant="success">● {sub.statusText}</Badge>;
    }
    if (sub.status === "WA") {
      return <Badge variant="danger">● {sub.statusText}</Badge>;
    }
    return <Badge variant="warning">● {sub.statusText}</Badge>;
  };

  return (
    <Card className={styles.container}>
      <div className={styles.header_row}>
        <h3 className={styles.section_title}>Bài đã nộp của bạn</h3>
        <span className={styles.sub_count}>Tổng số: {items.length} lần nộp</span>
      </div>

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Submit</th>
              <th>Tên bài tập</th>
              <th>Thời gian nộp</th>
              <th>Ngôn ngữ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className={styles.submit_id}>{item.id}</td>
                <td className={styles.problem_name}>{item.problem}</td>
                <td>
                  <span className={styles.time_text}>{item.time}</span>
                </td>
                <td>
                  <span className={styles.lang_badge}>{item.language}</span>
                </td>
                <td>{renderStatusBadge(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
