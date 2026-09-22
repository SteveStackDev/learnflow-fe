import React, { useState, useEffect } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import { courseService } from "~/services";
import styles from "./CourseTabContent.module.css";

const TABS = [
  { id: "overview", label: "Tổng quan", icon: "Compass" },
  { id: "notes", label: "Ghi chú", icon: "FileText" },
  { id: "discussion", label: "Thảo luận", icon: "MessageSquare" },
];

export function CourseTabContent({ lesson = {}, course = {}, onNoteAdded }) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [noteText, setNoteText] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mảng notes khi đổi lesson hoặc khi F5
  useEffect(() => {
    if (lesson && Array.isArray(lesson.notes)) {
      setNotesList(lesson.notes);
    } else {
      setNotesList([]);
    }
  }, [lesson]);

  // Xử lý Thêm Note
  const handleSaveNote = async () => {
    const trimmedNote = noteText.trim();
    if (!trimmedNote) {
      if (toast?.warning) toast.warning("Vui lòng nhập nội dung ghi chú!");
      return;
    }

    try {
      setIsSubmitting(true);
      const courseId = course._id || course.id;
      const lessonId = lesson.lessonId || lesson._id || lesson.id;

      const res = await courseService.saveCourseNote({
        courseId,
        lessonId,
        note: trimmedNote,
      });

      if (toast?.success) toast.success("Đã lưu ghi chú thành công!");

      if (res?.notes) setNotesList(res.notes);
      else setNotesList((prev) => [...prev, trimmedNote]);

      setNoteText("");
      if (onNoteAdded) await onNoteAdded();
    } catch (error) {
      console.error("Lỗi lưu ghi chú:", error);
      if (toast?.error) toast.error("Lưu ghi chú thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xử lý Xóa Note
  const handleDeleteNote = async (noteTarget) => {
    try {
      const courseId = course._id || course.id;
      const lessonId = lesson.lessonId || lesson._id || lesson.id;

      const res = await courseService.deleteCourseNote({
        courseId,
        lessonId,
        note: noteTarget,
      });

      if (toast?.success) toast.success("Đã xóa ghi chú!");

      if (res?.notes) setNotesList(res.notes);
      else setNotesList((prev) => prev.filter((item) => item !== noteTarget));

      if (onNoteAdded) await onNoteAdded();
    } catch (error) {
      console.error("Lỗi xóa ghi chú:", error);
      if (toast?.error) toast.error("Xóa ghi chú thất bại!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveNote();
    }
  };

  return (
    <div className={styles.tab_wrapper}>
      <div className={styles.tab_header}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab_btn} ${activeTab === tab.id ? styles["tab_btn--active"] : ""}`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.tab_body}>
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className={styles.overview_panel}>
            <h1 className={styles.course_title}>{course.title}</h1>
            <h2 className={styles.chapter_subtitle}>{lesson?.title}</h2>
            <p className={styles.description_text}>{lesson?.description || course.description}</p>
          </div>
        )}

        {/* NOTES */}
        {activeTab === "notes" && (
          <div className={styles.notes_panel}>
            <h3 className={styles.panel_title}>Ghi chú bài học của bạn</h3>

            <div className={styles.notes_list}>
              {notesList && notesList.length > 0 ? (
                notesList.map((noteItem, idx) => {
                  const content = typeof noteItem === "string" ? noteItem : noteItem.text;

                  return (
                    <div key={idx} className={styles.note_item}>
                      <span className={styles.bullet_dot} style={{ marginTop: "6px" }} />
                      <span className={styles.note_text}>{content}</span>
                      <button
                        type="button"
                        className={styles.note_delete_btn}
                        onClick={() => handleDeleteNote(content)}
                        title="Xóa ghi chú"
                      >
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className={styles.description_text}>Chưa có ghi chú nào cho bài học này.</p>
              )}
            </div>

            <div className={styles.note_input_container}>
              <textarea
                className={styles.note_textarea}
                rows={2}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Viết ghi chú cá nhân của bạn..."
                disabled={isSubmitting}
              />
              <button
                type="button"
                className={styles.note_send_btn}
                onClick={handleSaveNote}
                disabled={isSubmitting || !noteText.trim()}
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* DISCUSSION */}
        {activeTab === "discussion" && (
          <div className={styles.discussion_panel}>
            <h3 className={styles.panel_title}>Thảo luận bài học</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseTabContent;
