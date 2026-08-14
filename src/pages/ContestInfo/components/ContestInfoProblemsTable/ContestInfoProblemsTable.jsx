import React from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestInfoProblemsTable.module.css";

export default function ContestInfoProblemsTable({
  problems = [],
  isUpcoming,
  onSelectProblem,
}) {
  return (
    <Card className={styles.container}>
      <h3 className={styles.section_title}>Danh sách bài tập</h3>

      {isUpcoming && (
        <div className={styles.notice_banner}>
          <Icon name="Lock" size={18} />
          <span>
            Kỳ thi chưa bắt đầu. Vui lòng bấm <strong>"Đăng ký ngay"</strong> và đợi đến giờ thi để xem và làm bài tập!
          </span>
        </div>
      )}

      <div className={styles.table_wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>Tên bài tập</th>
              <th>Giới hạn hệ thống</th>
              <th>Lượt giải</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((prob) => (
              <tr key={prob.id || prob.code}>
                <td className={styles.problem_id}>{prob.code}</td>
                <td>
                  {isUpcoming ? (
                    <span
                      className={styles.problem_name_disabled}
                      title="Kỳ thi chưa bắt đầu, bạn chưa thể truy cập bài tập này!"
                    >
                      <Icon name="Lock" size={14} />
                      {prob.title}
                    </span>
                  ) : (
                    <span
                      className={styles.problem_name_link}
                      onClick={() => onSelectProblem && onSelectProblem(prob)}
                    >
                      {prob.title}
                    </span>
                  )}
                </td>
                <td>
                  <span className={styles.badge_tag}>
                    {prob.constraints || "2 giây, 256 MB"}
                  </span>
                </td>
                <td>
                  <div className={styles.solve_count}>
                    <Icon name="UserCheck" size={14} />
                    <span>x{prob.solves || "1024"}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
