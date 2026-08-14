import React from "react";
import { useNavigate } from "react-router";
import { Button, Badge, Card } from "~/components/ui";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./RoadmapTimelinePath.module.css";

export function RoadmapTimelinePath({ timelinePath }) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = (stepTitle) => {
    toast.success(`Đang chuyển sang bài học thuộc mốc "${stepTitle}"...`, "Học tiếp mốc này");
    navigate("/course/detail");
  };

  return (
    <div className={styles.path_section}>
      <h2 className={styles.section_title}>Lộ trình học tập chi tiết</h2>

      <div className={styles.timeline_track}>
        {timelinePath.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in-progress";
          const isLocked = step.status === "locked";

          return (
            <div key={step.id} className={styles.timeline_row}>
              {/* Left Node Status Icon */}
              <div className={styles.node_wrapper}>
                <div
                  className={`${styles.status_node} ${
                    isCompleted
                      ? styles["status_node--completed"]
                      : isInProgress
                      ? styles["status_node--active"]
                      : styles["status_node--locked"]
                  }`}
                >
                  {isCompleted && <Icon name="CheckCircle" size={20} />}
                  {isInProgress && <Icon name="Play" size={16} />}
                  {isLocked && <Icon name="Lock" size={18} />}
                </div>

                {index < timelinePath.length - 1 && (
                  <div
                    className={`${styles.vertical_line} ${
                      isCompleted ? styles["vertical_line--completed"] : ""
                    }`}
                  />
                )}
              </div>

              {/* Right Step Content Card */}
              <Card
                className={`${styles.step_card} ${
                  isInProgress ? styles["step_card--active"] : ""
                } ${isLocked ? styles["step_card--locked"] : ""}`}
              >
                <div className={styles.step_header}>
                  <h3 className={styles.step_title}>{step.title}</h3>
                  <Badge
                    variant={isCompleted ? "success" : isInProgress ? "warning" : "neutral"}
                    size="sm"
                  >
                    {isCompleted ? "Đã hoàn thành" : isInProgress ? "Đang học" : "Chưa mở khóa"}
                  </Badge>
                </div>

                <p className={styles.step_desc}>{step.description}</p>

                {/* Skill Chips */}
                {step.tags && step.tags.length > 0 && (
                  <div className={styles.tags_row}>
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.tag_chip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button if in-progress */}
                {isInProgress && (
                  <div className={styles.action_row}>
                    <Button
                      variant="contained"
                      onClick={() => handleContinue(step.title)}
                    >
                      {step.actionLabel || "Tiếp tục học mốc này"}
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapTimelinePath;
