import React from "react";
import { Card, Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoSidebar.module.css";

export default function CourseInfoSidebar({
  course,
  isEnrolled,
  onActionClick,
}) {
  const duration = course?.duration || "45 giờ";
  const totalLessons = course?.totalLessons || "156 bài";
  const access = course?.access || "Trọn đời";
  const certificate = course?.certificate || "Cấp sau khi hoàn thành";

  return (
    <Card className={styles.card_container}>
      {/* Action Button: Bắt đầu học (chưa học) vs Tiếp tục học (đã học) */}
      <Button
        className={styles.action_btn}
        onClick={onActionClick}
        leftIcon={isEnrolled ? "Play" : "BookOpen"}
      >
        {isEnrolled ? "Tiếp tục học" : "Bắt đầu học"}
      </Button>

      {/* Course Specifications */}
      <div className={styles.details_list}>
        <div className={styles.detail_item}>
          <div className={styles.detail_label}>
            <Icon name="Clock" size={16} />
            <span>Thời lượng</span>
          </div>
          <span className={styles.detail_value}>{duration}</span>
        </div>

        <div className={styles.detail_item}>
          <div className={styles.detail_label}>
            <Icon name="Book" size={16} />
            <span>Tổng số bài học</span>
          </div>
          <span className={styles.detail_value}>{totalLessons}</span>
        </div>

        <div className={styles.detail_item}>
          <div className={styles.detail_label}>
            <Icon name="Infinity" size={16} />
            <span>Quyền truy cập</span>
          </div>
          <span className={styles.detail_value}>{access}</span>
        </div>

        <div className={styles.detail_item}>
          <div className={styles.detail_label}>
            <Icon name="Award" size={16} />
            <span>Chứng chỉ</span>
          </div>
          <span className={styles.detail_value}>{certificate}</span>
        </div>
      </div>
    </Card>
  );
}
