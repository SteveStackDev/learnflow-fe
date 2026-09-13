import React, { useState } from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoCurriculum.module.css";

export default function CourseInfoCurriculum({ curriculum }) {
  const [openModuleId, setOpenModuleId] = useState(curriculum[0]?.chapterId || "mod-1");

  const toggleModule = (id) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  function formatMsToHHMMSS(ms) {
    if (!ms || ms < 0) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    if (paddedHours === "00") {
      return `${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
  }

  return (
    <Card className={styles.container}>
      <div className={styles.header_row}>
        <h2 className={styles.title}>Nội dung khóa học</h2>
        <span className={styles.summary_text}>
          {curriculum.length} chương •{" "}
          {curriculum.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.lessons.length;
          }, 0)}{" "}
          bài học •{" "}
          {formatMsToHHMMSS(
            curriculum
              .map((mod) => {
                let courseTotalDuration = 0;
                let chapterTotalDuration = mod.lessons.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.duration;
                }, 0);

                courseTotalDuration += chapterTotalDuration;

                return courseTotalDuration;
              })
              .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
              }, 0),
          )}
        </span>
      </div>

      <div className={styles.modules_list}>
        {curriculum.map((mod) => {
          const isOpen = openModuleId === mod.chapterId;
          const chapterTotalDuration = formatMsToHHMMSS(
            mod.lessons.reduce((accumulator, currentValue) => {
              return accumulator + currentValue.duration;
            }, 0),
          );
          return (
            <div key={mod.chapterId} className={styles.module_item}>
              <div className={styles.module_header} onClick={() => toggleModule(mod.chapterId)}>
                <div className={styles.module_title_wrap}>
                  <Icon name={isOpen ? "ChevronDown" : "ChevronRight"} size={18} />
                  <span className={styles.module_title}>{mod.title}</span>
                </div>
                <span className={styles.module_meta}>
                  {mod.lessons.length} bài • {chapterTotalDuration}
                </span>
              </div>

              {isOpen && (
                <div className={styles.lessons_list}>
                  {mod.lessons.map((les) => (
                    <div key={les.lessonId} className={styles.lesson_row}>
                      <div className={styles.lesson_left}>
                        <Icon name="PlayCircle" size={16} color="#0950c3" />
                        <span>{les.title}</span>
                      </div>
                      <span className={styles.lesson_duration}>
                        {formatMsToHHMMSS(les.duration)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
