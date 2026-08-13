import React, { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./RoadmapHeroHeader.module.css";

export function RoadmapHeroHeader({ roadmapData }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  // Logic kiểm tra người dùng đã học lộ trình này chưa
  const hasStarted = roadmapData.timelinePath?.some(
    (step) => step.status === "completed" || step.status === "in-progress",
  );

  const handleStartOrContinue = () => {
    if (hasStarted) {
      const activeStep = roadmapData.timelinePath?.find((s) => s.status === "in-progress");
      toast.success(
        `Đang chuyển sang bài học thuộc mốc "${activeStep ? activeStep.title : "Lộ trình"}"...`,
        "Tiếp tục học tập",
      );
    } else {
      toast.success(
        `Đã bắt đầu lộ trình "${roadmapData.title}"! Đang chuyển sang bài học đầu tiên...`,
        "Bắt đầu lộ trình",
      );
    }
    navigate("/course/detail");
  };

  const handleToggleSave = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);
    if (nextState) {
      toast.success(`Đã lưu lộ trình "${roadmapData.title}" vào danh sách yêu thích!`, "Đã lưu lộ trình");
    } else {
      toast.info(`Đã bỏ lưu lộ trình "${roadmapData.title}"`, "Bỏ lưu lộ trình");
    }
  };

  return (
    <div className={styles.hero_card}>
      <div className={styles.hero_left}>
        {/* Badge Chip */}
        <div className={styles.badge_chip}>
          <Icon name="Compass" size={14} />
          <span>{roadmapData.badge}</span>
        </div>

        {/* Title & Description */}
        <h1 className={styles.title}>{roadmapData.title}</h1>
        <p className={styles.description}>{roadmapData.description}</p>

        {/* Meta Stats Row */}
        <div className={styles.meta_row}>
          <span className={styles.meta_item}>
            <Icon name="BarChart" size={16} className={styles["meta_icon--chart"]} />
            <span>Độ khó: <strong>{roadmapData.difficulty}</strong></span>
          </span>
          <span className={styles.dot_separator}>•</span>
          <span className={styles.meta_item}>
            <Icon name="Clock" size={16} className={styles["meta_icon--clock"]} />
            <span>Thời gian: <strong>{roadmapData.estTime}</strong></span>
          </span>
          <span className={styles.dot_separator}>•</span>
          <span className={styles.meta_item}>
            <Icon name="Users" size={16} className={styles["meta_icon--users"]} />
            <span>Học viên: <strong>{roadmapData.learners}</strong></span>
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className={styles.action_row}>
          <button
            type="button"
            onClick={handleStartOrContinue}
            className={styles.start_btn}
          >
            <span>{hasStarted ? "Tiếp tục học tập" : "Bắt đầu lộ trình"}</span>
            <Icon name="ArrowRight" size={16} />
          </button>

          <button
            type="button"
            onClick={handleToggleSave}
            className={`${styles.save_btn} ${isSaved ? styles["save_btn--saved"] : ""}`}
          >
            <Icon name="Bookmark" size={16} />
            <span>{isSaved ? "Đã lưu" : "Lưu lộ trình"}</span>
          </button>
        </div>
      </div>

      {/* Right Mockup Illustration Showcase Card */}
      <div className={styles.hero_right}>
        <div className={styles.illustration_card}>
          <div className={styles.card_header}>
            <div className={styles.dot_group}>
              <span className={styles.dot_red} />
              <span className={styles.dot_yellow} />
              <span className={styles.dot_green} />
            </div>
            <span className={styles.card_url_text}>FySet - Chi Tiết Lộ Trình</span>
          </div>

          <div className={styles.card_body}>
            <div className={styles.flow_nodes_preview}>
              <div className={`${styles.node_box} ${styles["node_box--done"]}`}>HTML & CSS</div>
              <div className={styles.node_connector} />
              <div className={`${styles.node_box} ${styles["node_box--active"]}`}>JavaScript</div>
              <div className={styles.node_connector} />
              <div className={`${styles.node_box} ${styles["node_box--locked"]}`}>React SPA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapHeroHeader;
