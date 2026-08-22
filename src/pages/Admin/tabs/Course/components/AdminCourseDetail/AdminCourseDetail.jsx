import React, { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { Badge } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import { MOCK_CHAPTERS } from "~/constants/mockAdminCourse";
import useScrollReveal from "~/hooks/useScrollReveal";
import styles from "./AdminCourseDetail.module.css";
import AdminCourseOverviewTab from "../AdminCourseOverviewTab/AdminCourseOverviewTab";
import AdminCourseCurriculumTab from "../AdminCourseCurriculumTab/AdminCourseCurriculumTab";
import AdminCourseStudentsTab from "../AdminCourseStudentsTab/AdminCourseStudentsTab";
import AdminCourseStatisticsTab from "../AdminCourseStatisticsTab/AdminCourseStatisticsTab";

export default function AdminCourseDetail({ course, onBack }) {
  const { toast } = useToast();
  const [subTab, setSubTab] = useState("overview"); // overview | curriculum | students | statistics
  const [chapters, setChapters] = useState(MOCK_CHAPTERS);

  useScrollReveal(".reveal-card", [subTab]);

  if (!course) return null;

  const handleLessonAction = (actionName, lessonTitle) => {
    toast.info(`Đã thực hiện: ${actionName} bài học "${lessonTitle}"`, "Quản lý bài học");
  };

  const handleAddChapter = () => {
    const newChap = {
      id: `chap-${Date.now()}`,
      title: `Chapter ${chapters.length + 1}: Chương học mới`,
      lessons: [{ id: `les-${Date.now()}`, title: "Lesson 1: Bài học mẫu", duration: "10 mins" }],
    };
    setChapters([...chapters, newChap]);
    toast.success("Đã thêm Chương mới vào khóa học!", "Thành công");
  };

  return (
    <div className={styles.container}>
      {/* Back Button & Course Header */}
      <div className={`${styles.header} reveal-card`}>
        <button type="button" className={styles.back_btn} onClick={onBack}>
          <Icon name="ArrowLeft" size={18} />
          <span>Quay lại danh sách</span>
        </button>

        <div className={styles.course_title_bar}>
          <h2 className={styles.course_heading}>COURSE: {course.title}</h2>
          <Badge variant={course.status === "Active" ? "success" : "warning"}>
            {course.status}
          </Badge>
        </div>
      </div>

      {/* Sub-tab Navigation Bar */}
      <div className={`${styles.tab_nav} reveal-card`}>
        {[
          { id: "overview", label: "Overview (Tổng quan)", icon: "Info" },
          { id: "curriculum", label: "Curriculum (Chương trình học)", icon: "Book" },
          { id: "students", label: "Students (Học viên)", icon: "Users" },
          { id: "statistics", label: "Statistics (Thống kê)", icon: "TrendingUp" },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab_btn} ${isActive ? styles.tab_btn_active : ""}`}
              onClick={() => setSubTab(tab.id)}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab Content Area */}
      <div className={`${styles.subtab_content} reveal-card`}>
        {subTab === "overview" && <AdminCourseOverviewTab course={course} />}
        {subTab === "curriculum" && (
          <AdminCourseCurriculumTab
            chapters={chapters}
            onAddChapter={handleAddChapter}
            onLessonAction={handleLessonAction}
          />
        )}
        {subTab === "students" && <AdminCourseStudentsTab />}
        {subTab === "statistics" && <AdminCourseStatisticsTab course={course} />}
      </div>
    </div>
  );
}
