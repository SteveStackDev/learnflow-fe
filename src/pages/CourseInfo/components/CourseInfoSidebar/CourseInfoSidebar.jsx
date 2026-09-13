import React from "react";
import { Card, Button } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoSidebar.module.css";

export default function CourseInfoSidebar({ curriculum, isEnrolled, onActionClick }) {
  function formatMsToHHMMSS(ms) {
    if (!ms || ms < 0) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    if (paddedHours === "00") {
      return `${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
  }

  const duration = formatMsToHHMMSS(
    curriculum
      .map((mod) => {
        let courseTotalDuration = 0;
        let chapterTotalDuration = mod.lessons.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.duration;
        }, 0);

        courseTotalDuration += chapterTotalDuration;

        return courseTotalDuration;
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0),
  );
  const totalLessons = curriculum.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.lessons.length;
  }, 0);
  const access = "Trọn đời";
  const certificate = "Cấp sau khi hoàn thành";

  return (
    <Card className={styles.card_container}>
      {/* Action Button: Bắt đầu học (chưa học) vs Tiếp tục học (đã học) */}
      <Button
        variant="contained"
        size="lg"
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
