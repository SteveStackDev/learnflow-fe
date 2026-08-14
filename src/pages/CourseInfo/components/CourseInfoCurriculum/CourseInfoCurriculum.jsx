import React, { useState } from "react";
import { Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseInfoCurriculum.module.css";

export default function CourseInfoCurriculum({ modules = [] }) {
  const defaultModules = [
    {
      id: "mod-1",
      title: "Chương 1: Giới thiệu & Môi trường phát triển",
      lessonsCount: 6,
      duration: "45 phút",
      lessons: [
        { id: "l-1", title: "1. Tổng quan về ReactJS & Ecosystem", duration: "10:15" },
        { id: "l-2", title: "2. Cài đặt Node.js & Vite", duration: "08:30" },
        { id: "l-3", title: "3. Cấu trúc thư mục dự án React", duration: "12:00" },
      ],
    },
    {
      id: "mod-2",
      title: "Chương 2: JSX, Component & Props",
      lessonsCount: 12,
      duration: "2 giờ 15 phút",
      lessons: [
        { id: "l-4", title: "4. JSX Syntax & Cú pháp lồng ghép", duration: "15:20" },
        { id: "l-5", title: "5. Functional Components vs Class Components", duration: "14:10" },
        { id: "l-6", title: "6. Truyền dữ liệu với Props", duration: "18:45" },
      ],
    },
    {
      id: "mod-3",
      title: "Chương 3: State & React Hooks cơ bản",
      lessonsCount: 15,
      duration: "3 giờ 40 phút",
      lessons: [
        { id: "l-7", title: "7. Quản lý trạng thái với useState", duration: "20:10" },
        { id: "l-8", title: "8. Xử lý sự kiện (Event Handling)", duration: "16:30" },
        { id: "l-9", title: "9. Side Effect với useEffect", duration: "25:00" },
      ],
    },
  ];

  const list = modules.length > 0 ? modules : defaultModules;
  const [openModuleId, setOpenModuleId] = useState(list[0]?.id || "mod-1");

  const toggleModule = (id) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className={styles.container}>
      <div className={styles.header_row}>
        <h2 className={styles.title}>Nội dung khóa học</h2>
        <span className={styles.summary_text}>3 chương • 33 bài học • 6 giờ 40 phút</span>
      </div>

      <div className={styles.modules_list}>
        {list.map((mod) => {
          const isOpen = openModuleId === mod.id;
          return (
            <div key={mod.id} className={styles.module_item}>
              <div className={styles.module_header} onClick={() => toggleModule(mod.id)}>
                <div className={styles.module_title_wrap}>
                  <Icon name={isOpen ? "ChevronDown" : "ChevronRight"} size={18} />
                  <span className={styles.module_title}>{mod.title}</span>
                </div>
                <span className={styles.module_meta}>
                  {mod.lessonsCount} bài • {mod.duration}
                </span>
              </div>

              {isOpen && (
                <div className={styles.lessons_list}>
                  {mod.lessons.map((les) => (
                    <div key={les.id} className={styles.lesson_row}>
                      <div className={styles.lesson_left}>
                        <Icon name="PlayCircle" size={16} color="#0950c3" />
                        <span>{les.title}</span>
                      </div>
                      <span className={styles.lesson_duration}>{les.duration}</span>
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
