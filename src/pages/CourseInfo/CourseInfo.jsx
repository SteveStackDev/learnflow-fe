import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import CourseInfoHero from "./components/CourseInfoHero/CourseInfoHero";
import CourseInfoLearningPoints from "./components/CourseInfoLearningPoints/CourseInfoLearningPoints";
import CourseInfoCurriculum from "./components/CourseInfoCurriculum/CourseInfoCurriculum";
import CourseInfoSidebar from "./components/CourseInfoSidebar/CourseInfoSidebar";
import styles from "./CourseInfo.module.css";
import { courseService } from "~/services";

export default function CourseInfo() {
  useScrollReveal();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);

  // State: enrolled status (false = chưa học | true = đã học)
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const course = await courseService.getCourse(id);
      const curriculum = await courseService.getCurriculum(id);
      setCurriculum(curriculum);
      setCourse(course);
      setLoading(false);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleActionClick = () => {
    if (!isEnrolled) {
      toast.success("Bắt đầu tham gia bài học đầu tiên!", "Khóa học");
    } else {
      toast.info("Đang chuyển tới bài học tiếp theo...", "Khóa học");
    }
    navigate(`/course/${id}`);
  };

  if (loading) {
    return (
      <div className={styles.loading_wrapper} style={{ textAlign: "center", padding: "50px" }}>
        <p>Đang tải thông tin khóa học...</p>
      </div>
    );
  }

  return (
    <div className={styles.page_wrapper}>
      {/* Demo Enrollment Status Switch Bar */}
      <div className={styles.demo_status_bar}>
        <span>💡 **Chế độ xem Demo Trạng Thái Học Viên:**</span>
        <div className={styles.status_switch_group}>
          <Button
            size="sm"
            variant={!isEnrolled ? "contained" : "outlined"}
            onClick={() => setIsEnrolled(false)}
          >
            🆕 Chưa học (Bắt đầu học)
          </Button>
          <Button
            size="sm"
            variant={isEnrolled ? "contained" : "outlined"}
            onClick={() => setIsEnrolled(true)}
          >
            ✅ Đã học (Tiếp tục học)
          </Button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className={styles.grid_layout}>
        {/* Left Column: Hero, What you will learn, Curriculum */}
        <main className={styles.main_content}>
          <CourseInfoHero
            course={course}
            onPlayPreview={() => toast.info("Xem trước video giới thiệu khóa học", "Video Preview")}
          />
          <CourseInfoLearningPoints course={course} />
          <CourseInfoCurriculum curriculum={curriculum} />
        </main>

        {/* Right Column: Sticky Sidebar Card */}
        <aside className={styles.right_col}>
          <CourseInfoSidebar
            curriculum={curriculum}
            isEnrolled={isEnrolled}
            onActionClick={handleActionClick}
          />
        </aside>
      </div>
    </div>
  );
}
