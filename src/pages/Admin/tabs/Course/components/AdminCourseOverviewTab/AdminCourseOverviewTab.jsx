import React from "react";
import { Badge, Card } from "~/components/ui";
import styles from "./AdminCourseOverviewTab.module.css";

export default function AdminCourseOverviewTab({ course }) {
  if (!course) return null;

  return (
    <Card className={styles.overview_card}>
      <div className={styles.overview_grid}>
        <div className={styles.thumbnail_col}>
          <img src={course.thumbnail} alt={course.title} className={styles.big_thumbnail} />
          <div className={styles.quick_meta}>
            <Badge variant="primary">{course.category}</Badge>
            <Badge variant="secondary">Cấp độ: {course.level}</Badge>
          </div>
        </div>

        <div className={styles.info_col}>
          <h3 className={styles.section_title}>Thông tin chi tiết khóa học</h3>
          <p className={styles.description}>{course.description}</p>

          <div className={styles.meta_list}>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Tác giả (Author):</span>
              <span className={styles.meta_val}>FySet Official Team</span>
            </div>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Tổng số bài học (Total Lessons):</span>
              <span className={styles.meta_val}>{course.lessons} bài học</span>
            </div>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Tổng số học viên (Students):</span>
              <span className={styles.meta_val}>{course.students.toLocaleString()} người</span>
            </div>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Đánh giá trung bình (Rating):</span>
              <span className={styles.meta_val}>4.9 ⭐ (128 lượt)</span>
            </div>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Ngày khởi tạo (Created Date):</span>
              <span className={styles.meta_val}>01/08/2026</span>
            </div>
            <div className={styles.meta_item}>
              <span className={styles.meta_label}>Cập nhật lần cuối (Updated Date):</span>
              <span className={styles.meta_val}>Vừa xong</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
