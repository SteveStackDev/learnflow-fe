import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import { courseService } from "~/services";
import styles from "./CourseActionBar.module.css";

export function CourseActionBar({
  onPrevLesson,
  onNextLesson,
  hasPrev,
  hasNext,
  lesson,
  canComplete, // Boolean: true khi video đã xem xong 100%
  onProgressionUpdated,
}) {
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lấy ID bài học chính xác từ nhiều cấu trúc Object khác nhau
  const lessonId = lesson?.lessonId || lesson?._id || lesson?.id;

  useEffect(() => {
    // Cập nhật trạng thái completed ban đầu từ dữ liệu lesson
    const completedState = lesson?.status === "completed" || lesson?.isCompleted || false;
    setIsCompleted(completedState);
  }, [lessonId, lesson]);

  const handleComplete = async () => {
    if (isCompleted) {
      toast.info("Bài học này đã được hoàn thành trước đó.", "Thông báo");
      return;
    }

    if (!lessonId) {
      toast.error("Không tìm thấy ID bài học!", "Lỗi");
      return;
    }

    try {
      setLoading(true);

      // Gọi API Backend update-progression
      await courseService.updateProgression(lessonId);

      // Cập nhật state UI
      setIsCompleted(true);
      toast.success("Đã đánh dấu hoàn thành bài học!", "Tiến độ học tập");

      // Thông báo cho component cha để cập nhật danh sách bài học/sidebar
      if (onProgressionUpdated) {
        onProgressionUpdated(lessonId);
      }
    } catch (error) {
      console.error("❌ Lỗi gọi API updateProgression:", error);
      toast.error("Có lỗi xảy ra khi cập nhật tiến độ!", "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.action_bar}>
      <Button variant="outlined" leftIcon="ArrowLeft" onClick={onPrevLesson} disabled={!hasPrev}>
        Bài trước
      </Button>

      {/* 
        Giữ nguyên logic cũ:
        Disabled nếu: 
        1. Chưa xem hết video (!canComplete) VÀ bài học chưa completed trước đó 
        2. Đang trong quá trình gọi API (loading)
      */}
      <Button
        variant={isCompleted ? "contained" : "outlined"}
        leftIcon="Check"
        onClick={handleComplete}
        disabled={(!canComplete && !isCompleted) || loading}
        title={!canComplete && !isCompleted ? "Hãy xem hết video để mở khóa nút này" : ""}
      >
        {loading ? "Đang lưu..." : isCompleted ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
      </Button>

      <Button variant="contained" rightIcon="ArrowRight" onClick={onNextLesson} disabled={!hasNext}>
        Bài tiếp theo
      </Button>
    </div>
  );
}

export default CourseActionBar;
