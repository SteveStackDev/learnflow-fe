import React from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoLearningPoints.module.css";

export default function CourseInfoLearningPoints({ learningPoints = [] }) {
  const defaultPoints = [
    "Hiểu sâu về các khái niệm cốt lõi của React như Components, State, Props.",
    "Làm chủ hoàn toàn React Hooks (useState, useEffect, useContext...).",
    "Quản lý state toàn cục phức tạp với Redux Toolkit và RTK Query.",
    "Xây dựng ứng dụng đa trang với React Router v6.",
    "Tối ưu hóa hiệu suất ứng dụng (useMemo, useCallback, Code Splitting).",
    "Triển khai dự án thực tế lên Vercel, Netlify.",
  ];

  const items = learningPoints.length > 0 ? learningPoints : defaultPoints;

  return (
    <Card className={styles.card_container}>
      <h2 className={styles.title}>Bạn sẽ học được gì</h2>
      <div className={styles.points_grid}>
        {items.map((point, index) => (
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
