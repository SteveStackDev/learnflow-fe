import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CourseSyllabusSidebar.module.css";

const formatDuration = (ms) => {
  if (!ms || isNaN(ms)) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function CourseSyllabusSidebar({
  course = {},
  curriculum = [],
  activeLessonId,
  onSelectLesson,
  progression = 0,
}) {
  const { toast } = useToast();

  // Khởi tạo state đóng/mở chapter
  const [openChapters, setOpenChapters] = useState({});

  // Cập nhật state openChapters: Mặc định mở chapter đầu tiên (index === 0)
  useEffect(() => {
    if (curriculum && curriculum.length > 0) {
      const map = {};
      curriculum.forEach((ch, index) => {
        const id = ch.chapterId || ch.id;
        map[id] = index === 0;
      });
      setOpenChapters(map);
    }
  }, [curriculum]);

  const toggleChapter = (chId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chId]: !prev[chId],
    }));
  };

  // --- TÍNH TOÁN SỐ BÀI HỌC DỰA TRÊN CURRICULUM THỰC TẾ ---
  const allLessons = curriculum.flatMap((chapter) => chapter.lessons || []);
  const totalLessons = allLessons.length || course?.stats?.lessons || 0;

  // Đếm số bài có status là completed hoặc isCompleted = true
  const completedLessons = allLessons.filter(
    (les) => les.isCompleted || les.status === "completed",
  ).length;

  // Lấy giá trị % progression truyền từ DB vào (làm tròn số nguyên)
  const percent = Math.round(progression);

  return (
    <aside className={styles.sidebar}>
      {/* 1. Course Progress Header Card */}
      <div className={styles.progress_card}>
        <div className={styles.course_meta_row}>
          <div className={styles.course_badge}>
            <Icon name="Book" size={16} />
          </div>
          <div className={styles.title_wrap}>
            <h3 className={styles.course_title}>{course.title}</h3>
            {course.currentChapterTitle && (
              <span className={styles.chapter_subtitle}>{course.currentChapterTitle}</span>
            )}
          </div>
        </div>

        <div className={styles.progress_stats_row}>
          <span className={styles.percent_text}>{percent}% hoàn thành</span>
          <span className={styles.count_text}>
            {completedLessons}/{totalLessons} bài
          </span>
        </div>

        {/* Thanh Progress Bar chạy animation theo % */}
        <div className={styles.progress_track}>
          <div
            className={styles.progress_fill}
            style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          />
        </div>
      </div>

      {/* 2. Accordion Chapters List (Giữ nguyên 100% gốc) */}
      <div className={styles.accordion_list}>
        {curriculum.map((chapter) => {
          const chId = chapter.chapterId || chapter.id;
          const isOpen = !!openChapters[chId];
          const lessons = chapter.lessons || [];
          const chapterTotalMs = lessons.reduce((acc, les) => acc + (les.duration || 0), 0);

          return (
            <div key={chId} className={styles.chapter_item}>
              <button
                type="button"
                onClick={() => toggleChapter(chId)}
                className={styles.chapter_header}
              >
                <div className={styles.chapter_header_left}>
                  <h4 className={styles.chapter_title}>{chapter.title}</h4>
                  <span className={styles.chapter_meta}>
                    {lessons.length} bài học • {formatDuration(chapterTotalMs)}
                  </span>
                </div>

                <span className={styles.chevron_icon}>
                  <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
                </span>
              </button>

              {/* Lessons Sub-list */}
              {isOpen && (
                <div className={styles.lessons_list}>
                  {lessons.map((les) => {
                    const lessonId = les.lessonId || les.id;
                    const isActive = lessonId === activeLessonId;
                    const isCompleted = les.isCompleted || les.status === "completed";
                    const isLocked = les.isLocked || les.status === "locked";

                    return (
                      <div
                        key={lessonId}
                        onClick={() => {
                          if (isLocked) {
                            toast.warning(
                              "Bài học này chưa mở khóa. Hãy hoàn thành các bài trước!",
                              "Bài học khóa",
                            );
                            return;
                          }
                          onSelectLesson(lessonId);
                        }}
                        className={`${styles.lesson_row} ${
                          isActive ? styles["lesson_row--active"] : ""
                        } ${isLocked ? styles["lesson_row--locked"] : ""}`}
                      >
                        <div className={styles.lesson_status_icon}>
                          {isCompleted ? (
                            <span className={styles.icon_completed}>
                              <Icon name="CheckCircle" size={16} />
                            </span>
                          ) : (
                            <span className={styles.icon_locked}>
                              <Icon name={isLocked ? "Lock" : "Circle"} size={15} />
                            </span>
                          )}
                        </div>

                        <div className={styles.lesson_info}>
                          <span className={styles.lesson_title}>{les.title}</span>
                          <span className={styles.lesson_duration}>
                            {formatDuration(les.duration)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default CourseSyllabusSidebar;
