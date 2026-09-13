import React from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoLearningPoints.module.css";

export default function CourseInfoLearningPoints({ course }) {
  return (
    <Card className={styles.card_container}>
      <h2 className={styles.title}>Bạn sẽ học được gì</h2>
      <div className={styles.points_grid}>
        {course.benefits.map((point, index) => (
          <div key={index} className={styles.point_item}>
            <div className={styles.check_icon}>
              <Icon name="Check" size={14} />
            </div>
            <span>{point}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
