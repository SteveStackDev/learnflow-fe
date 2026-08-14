import React from "react";
import { useNavigate } from "react-router";
import { Button, Badge, Card } from "~/components/ui";
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
    navigate("/course/info");
  };

  const handleSolveProblem = (title) => {
    toast.info(`Chuyển sang giải bài tập "${title}"...`, "Bài tập thử thách");
    navigate("/problem/detail");
  };

  return (
    <aside className={styles.sidebar}>
      {/* 1. Technologies Box */}
      <Card className={styles.side_card}>
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
      </Card>

      {/* 2. Up Next For You (Recommended Courses) */}
      <Card className={styles.side_card}>
        <h3 className={styles.card_title}>Khóa học tiếp theo cho bạn</h3>
        <div className={styles.course_list}>
          {recommendedCourses.map((course) => (
            <Card key={course.id} hoverable className={styles.course_card}>
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
                <div style={{ marginTop: "4px" }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon="Play"
                    onClick={() => handleStartCourse(course.title)}
                  >
                    Học ngay
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* 3. Practice Problems ⚡ */}
      <Card className={styles.side_card}>
        <h3 className={styles.card_title}>
          <span>Bài tập thử thách</span>
          <span className={styles.zap_icon}>⚡</span>
        </h3>
        <div className={styles.problem_list}>
          {practiceProblems.map((prob) => (
            <Card key={prob.id} hoverable className={styles.problem_card}>
              <div className={styles.prob_header}>
                <h4 className={styles.prob_title}>{prob.title}</h4>
                <Badge
                  variant={
                    prob.difficulty === "Easy" || prob.difficulty === "Dễ"
                      ? "success"
                      : "warning"
                  }
                  size="sm"
                >
                  {prob.difficulty}
                </Badge>
              </div>
              <span className={styles.prob_topic}>{prob.topic}</span>
              <div style={{ marginTop: "6px" }}>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => handleSolveProblem(prob.title)}
                >
                  Thực hành ngay
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </aside>
  );
}

export default RoadmapSidebar;
