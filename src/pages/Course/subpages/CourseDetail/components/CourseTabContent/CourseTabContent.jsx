import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./CourseTabContent.module.css";

const TABS = [
  { id: "overview", label: "Overview", icon: "Compass" },
  { id: "notes", label: "Notes", icon: "FileText" },
  { id: "resources", label: "Resources", icon: "Download" },
  { id: "discussion", label: "Discussion", icon: "MessageSquare" },
];

export function CourseTabContent({ lesson }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={styles.tab_wrapper}>
      {/* Tab Navigation Headers */}
      <div className={styles.tab_header}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab_btn} ${activeTab === tab.id ? styles["tab_btn--active"] : ""
              }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Body Content */}
      <div className={styles.tab_body}>
        {activeTab === "overview" && (
          <div className={styles.overview_panel}>
            <h1 className={styles.course_title}>{lesson.courseTitle || "Advanced React Patterns"}</h1>
            <h2 className={styles.chapter_subtitle}>{lesson.lessonTitle}</h2>

            <p className={styles.description_text}>{lesson.description}</p>

            {/* Objectives Highlight Box */}
            <div className={styles.objectives_card}>
              <h3 className={styles.objectives_title}>
                <span className={styles.check_circle_icon}>
                  <Icon name="CheckCircle" size={18} />
                </span>
                <span>{lesson.objectivesTitle || "Mục tiêu bài học"}</span>
              </h3>

              <ul className={styles.objectives_list}>
                {lesson.objectives.map((objText, idx) => (
                  <li key={idx} className={styles.objective_item}>
                    <span className={styles.bullet_dot} />
                    <span>{objText}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className={styles.notes_panel}>
            <h3 className={styles.panel_title}>Ghi chú bài học của bạn</h3>
            <div className={styles.notes_list}>
              {lesson.notes.map((note, idx) => (
                <div key={idx} className={styles.note_item}>
                  <span className={styles.note_timestamp}>{note.timestamp}</span>
                  <span className={styles.note_text}>{note.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className={styles.resources_panel}>
            <h3 className={styles.panel_title}>Tài liệu đính kèm</h3>
            <div className={styles.resources_list}>
              {lesson.resources.map((res, idx) => (
                <div key={idx} className={styles.resource_card}>
                  <div className={styles.resource_icon}>
                    <Icon name="FileText" size={20} />
                  </div>
                  <div className={styles.resource_info}>
                    <span className={styles.resource_name}>{res.name}</span>
                    <span className={styles.resource_size}>{res.size}</span>
                  </div>
                  <button type="button" className={styles.download_btn}>
                    <Icon name="Download" size={16} />
                    <span>Tải về</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "discussion" && (
          <div className={styles.discussion_panel}>
            <h3 className={styles.panel_title}>Thảo luận bài học</h3>
            <div className={styles.discussion_list}>
              {lesson.discussions.map((item, idx) => (
                <div key={idx} className={styles.comment_card}>
                  <img src={item.avatar} alt={item.author} className={styles.comment_avatar} />
                  <div className={styles.comment_body}>
                    <div className={styles.comment_header}>
                      <span className={styles.comment_author}>{item.author}</span>
                      <span className={styles.comment_time}>{item.time}</span>
                    </div>
                    <p className={styles.comment_text}>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseTabContent;
