import React from "react";
import { Card } from "~/components/ui";
import { MOCK_STUDENTS } from "~/constants/mockAdminCourse";
import styles from "./AdminCourseStudentsTab.module.css";

export default function AdminCourseStudentsTab() {
  return (
    <Card className={styles.students_card}>
      <h3 className={styles.section_title}>Danh Sách Học Viên Đang Học</h3>
      <table className={styles.student_table}>
        <thead>
          <tr>
            <th>Học viên</th>
            <th>Email</th>
            <th>Tiến độ hoàn thành</th>
            <th>Ngày đăng ký</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STUDENTS.map((std) => (
            <tr key={std.id}>
              <td className={styles.student_name}>{std.name}</td>
              <td>{std.email}</td>
              <td>
                <div className={styles.progress_box}>
                  <div className={styles.progress_bar}>
                    <div
                      className={styles.progress_fill}
                      style={{ width: `${std.progress}%` }}
                    />
                  </div>
                  <span className={styles.progress_text}>{std.progress}%</span>
                </div>
              </td>
              <td>{std.joinedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
