import React, { useState } from "react";
import { Button } from "~/components/ui";
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
      <Button
        variant="outlined"
        leftIcon="ArrowLeft"
        onClick={onPrevLesson}
      >
        Bài trước
      </Button>

      {/* Mark Complete Toggle Button */}
      <Button
        variant={isCompleted ? "contained" : "outlined"}
        leftIcon="Check"
        onClick={toggleCompleted}
      >
        {isCompleted ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
      </Button>

      {/* Next Lesson Button */}
      <Button
        variant="contained"
        rightIcon="ArrowRight"
        onClick={onNextLesson}
      >
        Bài tiếp theo
      </Button>
    </div>
  );
}

export default CourseActionBar;
