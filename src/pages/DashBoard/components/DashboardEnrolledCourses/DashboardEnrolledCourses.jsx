import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { courseService } from "~/services/courseService";
import styles from "./DashboardEnrolledCourses.module.css";

const LEVEL_GRADIENT = {
  "Cơ bản": "linear-gradient(135deg, #4ade80, #22c55e)",
  "Trung cấp": "linear-gradient(135deg, #fbbf24, #f59e0b)",
  "Nâng cao": "linear-gradient(135deg, #f87171, #ef4444)",
};

const PROGRESS_COLOR = (pct) => {
  if (pct >= 80) return { bg: "linear-gradient(90deg, #22c55e, #4ade80)" };
  if (pct >= 40) return { bg: "linear-gradient(90deg, #3b82f6, #60a5fa)" };
  return { bg: "linear-gradient(90deg, #8b5cf6, #a78bfa)" };
};

export default function DashboardEnrolledCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    courseService
      .getUserCourses()
      .then((data) => {
        if (!isMounted) return;
        setCourses(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch((err) => {
        console.error("Failed to load user courses:", err);
        if (isMounted) setCourses([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleClick = (course) => {
    const targetId = course?.courseId?._id || course?.courseId?.id;
    if (targetId) navigate(`/course/${targetId}`);
  };

  const getInitials = (title = "") =>
    title
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

  return (
    <section className={styles.widget}>
      {/* Header */}
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <span className={styles.header_icon}>
            <Icon name="GraduationCap" size={18} />
          </span>
          <div>
            <h3 className={styles.header_title}>Khoá Học Đang Học</h3>
            <p className={styles.header_subtitle}>
              {courses.length} khoá học đã đăng ký
            </p>
          </div>
        </div>
        <button
          className={styles.view_all_btn}
          onClick={() => navigate("/course")}
        >
          Xem tất cả
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>

      {/* Course List */}
      <div className={styles.course_list}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`${styles.course_card} ${styles.skeleton}`}>
              <div className={styles.skeleton_thumb} />
              <div className={styles.skeleton_body}>
                <div className={styles.skeleton_title} />
                <div className={styles.skeleton_bar} />
                <div className={styles.skeleton_sub} />
              </div>
            </div>
          ))
        ) : courses.length === 0 ? (
          <div className={styles.empty_state}>
            <Icon name="BookOpen" size={32} />
            <p>Bạn chưa đăng ký khoá học nào</p>
            <button onClick={() => navigate("/course")} className={styles.explore_btn}>
              Khám phá Khoá học
            </button>
          </div>
        ) : (
          courses.map((course, idx) => {
            const courseInfo = course?.courseId || {};
            const pct = Math.min(100, Math.max(0, course.progression || 0));
            const prog = PROGRESS_COLOR(pct);
            const levelGrad = LEVEL_GRADIENT[courseInfo.level] || LEVEL_GRADIENT["Cơ bản"];

            return (
              <div
                key={course.id || course._id || idx}
                className={styles.course_card}
                onClick={() => handleClick(course)}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Thumbnail */}
                <div className={styles.course_thumb}>
                  {courseInfo.imageUrl || courseInfo.thumbnail ? (
                    <img
                      src={courseInfo.imageUrl || courseInfo.thumbnail}
                      alt={courseInfo.title || "Course"}
                      className={styles.thumb_img}
                    />
                  ) : (
                    <div className={styles.thumb_placeholder}>
                      <span className={styles.thumb_initials}>
                        {getInitials(courseInfo.title || "Khóa học")}
                      </span>
                    </div>
                  )}
                  <span
                    className={styles.level_dot}
                    style={{ background: levelGrad }}
                    title={courseInfo.level || "Cơ bản"}
                  />
                </div>

                {/* Info */}
                <div className={styles.course_info}>
                  <p className={styles.course_title}>{courseInfo.title || "Chưa có tên"}</p>
                  <p className={styles.course_instructor}>
                    <Icon name="User" size={11} />
                    {course.instructor || courseInfo.instructor || "FySet Mentor"}
                    {(course.lessonsCount || courseInfo.lessonsCount) > 0 && (
                      <>
                        <span className={styles.dot_sep}>·</span>
                        <Icon name="BookOpen" size={11} />
                        {course.lessonsCount || courseInfo.lessonsCount} bài
                      </>
                    )}
                  </p>

                  {/* Progress Bar */}
                  <div className={styles.progress_wrap}>
                    <div className={styles.progress_track}>
                      <div
                        className={styles.progress_fill}
                        style={{ width: `${pct}%`, background: prog.bg }}
                      />
                    </div>
                    <span className={styles.progress_label}>
                      {pct === 100 ? (
                        <span className={styles.completed_tag}>
                          <Icon name="CheckCircle" size={11} /> Hoàn thành
                        </span>
                      ) : (
                        `${pct}%`
                      )}
                    </span>
                  </div>
                </div>

                <div className={styles.chevron}>
                  <Icon name="ChevronRight" size={16} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}