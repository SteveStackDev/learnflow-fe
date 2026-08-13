import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Icon from "~/components/Icon/Icon";
import { mockCourseDetailData } from "./data";
import CourseVideoPlayer from "./components/CourseVideoPlayer/CourseVideoPlayer";
import CourseTabContent from "./components/CourseTabContent/CourseTabContent";
import CourseActionBar from "./components/CourseActionBar/CourseActionBar";
import CourseSyllabusSidebar from "./components/CourseSyllabusSidebar/CourseSyllabusSidebar";
import styles from "./CourseDetail.module.css";

export function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseData = mockCourseDetailData;

  const [activeLessonId, setActiveLessonId] = useState("les-3-3");

  // Retrieve current active lesson or fallback
  const activeLessonDetail =
    courseData.lessonDetails[activeLessonId] || courseData.lessonDetails["les-3-3"];

  const handlePrevLesson = () => {
    setActiveLessonId("les-3-2");
  };

  const handleNextLesson = () => {
    setActiveLessonId("les-3-4");
  };

  return (
    <div className={styles.page_container}>
      {/* Back to Courses Navigation Button */}
      <div className={styles.header_nav}>
        <button
          type="button"
          onClick={() => navigate("/course")}
          className={styles.back_btn}
          title="Quay lại danh sách khóa học"
        >
          <Icon name="ChevronLeft" size={18} />
          <span>Quay lại khóa học</span>
        </button>
      </div>

      <div className={styles.workspace_grid}>
        {/* Left Column: Video Player, Tabs & Action Bar */}
        <div className={styles.left_column}>
          <CourseVideoPlayer lesson={activeLessonDetail} />
          <CourseTabContent lesson={activeLessonDetail} />
          <CourseActionBar
            onPrevLesson={handlePrevLesson}
            onNextLesson={handleNextLesson}
          />
        </div>

        {/* Right Column: Syllabus Sidebar */}
        <div className={styles.right_column}>
          <CourseSyllabusSidebar
            courseData={courseData}
            activeLessonId={activeLessonId}
            onSelectLesson={(lessonId) => setActiveLessonId(lessonId)}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
