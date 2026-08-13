import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./RoadmapSidebar.module.css";

export function RoadmapSidebar({
  technologies,
  recommendedCourses,
  practiceProblems,
}) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartCourse = (title) => {
    toast.info(`Chuyển sang xem khóa học "${title}"...`, "Khóa học gợi ý");
    navigate("/course/detail");
  };

  const handleSolveProblem = (title) => {
    toast.info(`Chuyển sang giải bài tập "${title}"...`, "Bài tập thử thách");
    navigate("/problem/detail");
  };

  return (
    <aside className={styles.sidebar}>
      {/* 1. Technologies Box */}
      <div className={styles.side_card}>
        <h3 className={styles.card_title}>Công nghệ ứng dụng</h3>
        <div className={styles.tech_list}>
          {technologies.map((tech, idx) => (
            <div key={idx} className={styles.tech_item}>
              <span
                className={styles.tech_badge}
                style={{ backgroundColor: `${tech.color}15`, color: tech.color }}
              >
                {tech.code}
              </span>
              <span className={styles.tech_name}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Up Next For You (Recommended Courses) */}
      <div className={styles.side_card}>
        <h3 className={styles.card_title}>Khóa học tiếp theo cho bạn</h3>
        <div className={styles.course_list}>
          {recommendedCourses.map((course) => (
            <div key={course.id} className={styles.course_card}>
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className={styles.course_img}
              />
              <div className={styles.course_info}>
                <h4 className={styles.course_title}>{course.title}</h4>
                <span className={styles.course_meta}>
                  {course.type} • {course.duration}
                </span>
                <button
                  type="button"
                  onClick={() => handleStartCourse(course.title)}
                  className={styles.start_course_btn}
                >
                  <Icon name="Play" size={12} />
                  <span>Học ngay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Practice Problems ⚡ */}
      <div className={styles.side_card}>
        <h3 className={styles.card_title}>
          <span>Bài tập thử thách</span>
          <span className={styles.zap_icon}>⚡</span>
        </h3>
        <div className={styles.problem_list}>
          {practiceProblems.map((prob) => (
            <div key={prob.id} className={styles.problem_card}>
              <div className={styles.prob_header}>
                <h4 className={styles.prob_title}>{prob.title}</h4>
                <span
                  className={`${styles.prob_diff} ${
                    prob.difficulty === "Easy" || prob.difficulty === "Dễ"
                      ? styles["prob_diff--easy"]
                      : styles["prob_diff--medium"]
                  }`}
                >
                  {prob.difficulty}
                </span>
              </div>
              <span className={styles.prob_topic}>{prob.topic}</span>
              <button
                type="button"
                onClick={() => handleSolveProblem(prob.title)}
                className={styles.solve_btn}
              >
                Thực hành ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default RoadmapSidebar;
