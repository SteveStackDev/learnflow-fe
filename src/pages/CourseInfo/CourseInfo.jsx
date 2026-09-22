import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State: enrolled status
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const courseRes = await courseService.getCourse(id);
      const curriculumRes = await courseService.getCurriculum(id);
      const data = await courseService.getUserProgression(id);
      if (
        data.curriculum.length === 0 &&
        data.lastAccessedLessonId === null &&
        data.progression === 0
      ) {
        setIsEnrolled(false);
      } else {
        setIsEnrolled(true);
      }
      setCurriculum(curriculumRes);
      setCourse(courseRes);
      setLoading(false);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleActionClick = async () => {
    if (isSubmitting) return;

    if (!isEnrolled) {
      try {
        setIsSubmitting(true);
        // Gọi API lưu tiến độ khóa học cho user
        await courseService.saveCourse(id);
        setIsEnrolled(true);
        toast.success("Đăng ký thành công! Đang chuyển tới bài học...", "Khóa học");
        navigate(`/course/${id}`);
      } catch (error) {
        toast.error("Không thể đăng ký khóa học. Vui lòng thử lại!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.info("Đang chuyển tới bài học...", "Khóa học");
      navigate(`/course/${id}`);
    }
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
      {/* Main 2-Column Layout */}
      <div className={styles.grid_layout}>
        <main className={styles.main_content}>
          <CourseInfoHero
            course={course}
            onPlayPreview={() => toast.info("Xem trước video giới thiệu khóa học", "Video Preview")}
          />
          <CourseInfoLearningPoints course={course} />
          <CourseInfoCurriculum curriculum={curriculum} />
        </main>

        <aside className={styles.right_col}>
          <CourseInfoSidebar
            curriculum={curriculum}
            isEnrolled={isEnrolled}
            onActionClick={handleActionClick}
            isSubmitting={isSubmitting}
          />
        </aside>
      </div>
    </div>
  );
}
