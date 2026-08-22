import React from "react";
import Icon from "~/components/Icon/Icon";
import { Button, Card } from "~/components/ui";
import styles from "./AdminCourseCurriculumTab.module.css";

export default function AdminCourseCurriculumTab({ chapters = [], onAddChapter, onLessonAction }) {
  return (
    <div className={styles.curriculum_container}>
      <div className={styles.curriculum_header}>
        <h3 className={styles.section_title}>Cấu Trúc Chương & Bài Học</h3>
        <Button variant="primary" size="sm" onClick={onAddChapter}>
          <Icon name="Plus" size={16} />
          <span>Add Chapter</span>
        </Button>
      </div>

      <div className={styles.chapters_list}>
        {chapters.map((chap) => (
          <Card key={chap.id} className={styles.chapter_card}>
            <div className={styles.chapter_title_row}>
              <div className={styles.chapter_name}>
                <Icon name="Folder" size={18} className={styles.folder_icon} />
                <h4>{chap.title}</h4>
              </div>
              <span className={styles.lesson_count}>{chap.lessons.length} bài học</span>
            </div>

            <div className={styles.lessons_tree}>
              {chap.lessons.map((les) => (
                <div key={les.id} className={styles.lesson_node}>
                  <div className={styles.lesson_info}>
                    <Icon name="FileText" size={16} className={styles.file_icon} />
                    <span className={styles.lesson_title}>{les.title}</span>
                    <span className={styles.duration_tag}>{les.duration}</span>
                  </div>

                  <div className={styles.lesson_actions}>
                    <button
                      type="button"
                      className={styles.action_icon_btn}
                      onClick={() => onLessonAction("Edit", les.title)}
                      title="Edit Lesson"
                    >
                      <Icon name="Edit" size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.action_icon_btn}
                      onClick={() => onLessonAction("Move", les.title)}
                      title="Move Lesson"
                    >
                      <Icon name="ArrowLeft" size={14} style={{ transform: "rotate(90deg)" }} />
                    </button>
                    <button
                      type="button"
                      className={styles.action_icon_btn}
                      onClick={() => onLessonAction("Duplicate", les.title)}
                      title="Duplicate Lesson"
                    >
                      <Icon name="Share" size={14} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.action_icon_btn} ${styles.danger_icon_btn}`}
                      onClick={() => onLessonAction("Delete", les.title)}
                      title="Delete Lesson"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
