import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { courseService } from "~/services/courseService";
import styles from "./DashboardEnrolledCourses.module.css";

const MOCK_COURSES = [
  {
    id: "1",
    title: "Lập trình C++ từ Zero",
    thumbnail: null,
    progression: 65,
    level: "Cơ bản",
    instructor: "FySet Mentor",
    lessonsCount: 32,
  },
  {
    id: "2",
    title: "JavaScript Nâng Cao & ES2024",
    thumbnail: null,
    progression: 30,
    level: "Trung cấp",
    instructor: "FySet Mentor",
    lessonsCount: 48,
  },
  {
    id: "3",
    title: "Giải thuật & Cấu trúc Dữ liệu",
    thumbnail: null,
    progression: 90,
    level: "Nâng cao",
    instructor: "FySet Mentor",
    lessonsCount: 60,
  },
];

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
      .getAllCourses()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data.slice(0, 5) : [];
        setCourses(list.length > 0 ? list : MOCK_COURSES);
      })
      .catch(() => {
        if (isMounted) setCourses(MOCK_COURSES);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleClick = (course) => {
    const id = course._id || course.id || course.slug;
    navigate(`/course/${id}`);
  };

  const getInitials = (title = "") =>
    title
      .split(" ")
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
            const pct = Math.min(100, Math.max(0, course.progression || 0));
            const prog = PROGRESS_COLOR(pct);
            const levelGrad = LEVEL_GRADIENT[course.level] || LEVEL_GRADIENT["Cơ bản"];
            return (
              <div
                key={course.id || course._id || idx}
                className={styles.course_card}
                onClick={() => handleClick(course)}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Thumbnail */}
                <div className={styles.course_thumb}>
                  {course.imageUrl || course.thumbnail ? (
                    <img
                      src={course.imageUrl || course.thumbnail}
                      alt={course.title}
                      className={styles.thumb_img}
                    />
                  ) : (
                    <div className={styles.thumb_placeholder}>
                      <span className={styles.thumb_initials}>
                        {getInitials(course.title)}
                      </span>
                    </div>
                  )}
                  <span
                    className={styles.level_dot}
                    style={{ background: levelGrad }}
                    title={course.level}
                  />
                </div>

                {/* Info */}
                <div className={styles.course_info}>
                  <p className={styles.course_title}>{course.title}</p>
                  <p className={styles.course_instructor}>
                    <Icon name="User" size={11} />
                    {course.instructor || "FySet Mentor"}
                    {course.lessonsCount ? (
                      <>
                        <span className={styles.dot_sep}>·</span>
                        <Icon name="BookOpen" size={11} />
                        {course.lessonsCount} bài
                      </>
                    ) : null}
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
