import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import useScrollReveal from "~/hooks/useScrollReveal";
import CourseInfoHero from "./components/CourseInfoHero/CourseInfoHero";
import CourseInfoLearningPoints from "./components/CourseInfoLearningPoints/CourseInfoLearningPoints";
import CourseInfoCurriculum from "./components/CourseInfoCurriculum/CourseInfoCurriculum";
import CourseInfoSidebar from "./components/CourseInfoSidebar/CourseInfoSidebar";
import styles from "./CourseInfo.module.css";

export default function CourseInfo() {
  useScrollReveal();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();

  // State: enrolled status (false = chưa học | true = đã học)
  const [isEnrolled, setIsEnrolled] = useState(false);

  const courseId = id || "reactjs-co-ban";

  const mockCourse = {
    id: courseId,
    title: "Lập trình ReactJS từ cơ bản đến nâng cao",
    category: "Lập trình Web",
    subcategory: "ReactJS",
    description:
      "Khóa học toàn diện giúp bạn làm chủ ReactJS. Xây dựng các ứng dụng web tương tác, hiệu suất cao với các khái niệm hiện đại như Hooks, Redux Toolkit, Next.js và nhiều hơn nữa.",
    rating: 4.8,
    ratingCount: "2,450",
    studentsCount: "15,000+",
    lastUpdated: "10/2024",
    price: "1,499,000đ",
    originalPrice: "2,500,000đ",
    duration: "45 giờ",
    totalLessons: "156 bài",
    access: "Trọn đời",
    certificate: "Cấp sau khi hoàn thành",
  };

  const handleActionClick = () => {
    if (!isEnrolled) {
      toast.success("Bắt đầu tham gia bài học đầu tiên!", "Khóa học");
    } else {
      toast.info("Đang chuyển tới bài học tiếp theo...", "Khóa học");
    }
    navigate(`/course/${courseId}`);
  };

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
            course={mockCourse}
            onPlayPreview={() =>
              toast.info("Xem trước video giới thiệu khóa học", "Video Preview")
            }
          />
          <CourseInfoLearningPoints />
          <CourseInfoCurriculum />
        </main>

        {/* Right Column: Sticky Sidebar Card */}
        <aside className={styles.right_col}>
          <CourseInfoSidebar
            course={mockCourse}
            isEnrolled={isEnrolled}
            onActionClick={handleActionClick}
          />
        </aside>
      </div>
    </div>
  );
}
