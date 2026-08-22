import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ProfileLearningCard.module.css";

export function ProfileLearningCard({ learning }) {
  if (!learning) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon_box}>
          <Icon name="BookOpen" size={20} className={styles.book_icon} />
        </div>
        <div className={styles.info}>
          <span className={styles.sub_title}>Đang học</span>
          <h4 className={styles.course_name}>{learning.courseName}</h4>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className={styles.progress_container}>
        <div className={styles.progress_track}>
          <div
            className={styles.progress_fill}
            style={{ width: `${learning.progress || 0}%` }}
          />
        </div>
        <div className={styles.progress_labels}>
          <span className={styles.label_text}>Tiến độ</span>
          <span className={styles.percent_text}>{learning.progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileLearningCard;
