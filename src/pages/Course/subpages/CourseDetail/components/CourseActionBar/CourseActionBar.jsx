import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CourseActionBar.module.css";

export function CourseActionBar({ onPrevLesson, onNextLesson }) {
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompleted = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (nextState) {
      toast.success("Đã đánh dấu hoàn thành bài học này!", "Tiến độ học tập");
    } else {
      toast.info("Đã hủy trạng thái hoàn thành", "Tiến độ học tập");
    }
  };

  return (
    <div className={styles.action_bar}>
      {/* Previous Lesson Button */}
      <button
        type="button"
        onClick={onPrevLesson}
        className={styles.prev_btn}
      >
        <Icon name="ArrowLeft" size={16} />
        <span>Bài trước</span>
      </button>

      {/* Mark Complete Toggle Button */}
      <button
        type="button"
        onClick={toggleCompleted}
        className={`${styles.complete_btn} ${
          isCompleted ? styles["complete_btn--active"] : ""
        }`}
      >
        <Icon name="Check" size={18} />
        <span>{isCompleted ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}</span>
      </button>

      {/* Next Lesson Button */}
      <button
        type="button"
        onClick={onNextLesson}
        className={styles.next_btn}
      >
        <span>Bài tiếp theo</span>
        <Icon name="ArrowRight" size={16} />
      </button>
    </div>
  );
}

export default CourseActionBar;
