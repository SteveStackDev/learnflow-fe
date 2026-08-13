import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./CourseSyllabusSidebar.module.css";

export function CourseSyllabusSidebar({
  courseData,
  activeLessonId,
  onSelectLesson,
}) {
  const { toast } = useToast();

  const [openChapters, setOpenChapters] = useState(() => {
    const map = {};
    courseData.chapters.forEach((ch) => {
      map[ch.id] = ch.defaultOpen ?? true;
    });
    return map;
  });

  const toggleChapter = (chId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chId]: !prev[chId],
    }));
  };

  const handleAiMentorClick = () => {
    toast.info(
      "AI Mentor sẵn sàng hỗ trợ giải đáp thắc mắc về bài học!",
      "FySet AI Mentor",
    );
  };

  return (
    <aside className={styles.sidebar}>
      {/* 1. Course Progress Header Card */}
      <div className={styles.progress_card}>
        <div className={styles.course_meta_row}>
          <div className={styles.course_badge}>
            <Icon name="Book" size={16} />
          </div>
          <div className={styles.title_wrap}>
            <h3 className={styles.course_title}>{courseData.title}</h3>
            <span className={styles.chapter_subtitle}>
              {courseData.currentChapterTitle}
            </span>
          </div>
        </div>

        <div className={styles.progress_stats_row}>
          <span className={styles.percent_text}>
            {courseData.progressPercent}% hoàn thành
          </span>
          <span className={styles.count_text}>
            {courseData.completedLessons}/{courseData.totalLessons} bài
          </span>
        </div>

        <div className={styles.progress_track}>
          <div
            className={styles.progress_fill}
            style={{ width: `${courseData.progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Accordion Chapters List */}
      <div className={styles.accordion_list}>
        {courseData.chapters.map((chapter) => {
          const isOpen = openChapters[chapter.id];

          return (
            <div key={chapter.id} className={styles.chapter_item}>
              <button
                type="button"
                onClick={() => toggleChapter(chapter.id)}
                className={styles.chapter_header}
              >
                <div className={styles.chapter_header_left}>
                  <h4 className={styles.chapter_title}>{chapter.title}</h4>
                  <span className={styles.chapter_meta}>
                    {chapter.lessonCount} bài học • {chapter.totalDuration}
                  </span>
                </div>

                <span className={styles.chevron_icon}>
                  <Icon
                    name={isOpen ? "ChevronUp" : "ChevronDown"}
                    size={16}
                  />
                </span>
              </button>

              {/* Lessons Sub-list */}
              {isOpen && (
                <div className={styles.lessons_list}>
                  {chapter.lessons.map((les) => {
                    const isActive = les.id === activeLessonId;
                    const isCompleted = les.status === "completed";
                    const isLocked = les.status === "locked";

                    return (
                      <div
                        key={les.id}
                        onClick={() => {
                          if (isLocked) {
                            toast.warning(
                              "Bài học này chưa mở khóa. Hãy hoàn thành các bài trước!",
                              "Bài học khóa",
                            );
                            return;
                          }
                          onSelectLesson(les.id);
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
                          <span className={styles.lesson_duration}>{les.duration}</span>
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

      {/* 3. Ask AI Mentor Floating Card */}
      <div className={styles.ai_mentor_card}>
        <button
          type="button"
          onClick={handleAiMentorClick}
          className={styles.ai_btn}
        >
          <Icon name="Bot" size={18} />
          <span>Ask AI Mentor</span>
        </button>
      </div>
    </aside>
  );
}

export default CourseSyllabusSidebar;
