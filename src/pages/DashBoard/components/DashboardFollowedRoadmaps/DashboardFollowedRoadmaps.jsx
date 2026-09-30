import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { roadmapService } from "~/services/roadmapService";
import styles from "./DashboardFollowedRoadmaps.module.css";

const LEVEL_COLOR = {
  Beginner: { bg: "#dcfce7", color: "#15803d" },
  Intermediate: { bg: "#fef3c7", color: "#b45309" },
  Advanced: { bg: "#fee2e2", color: "#b91c1c" },
};

export default function DashboardFollowedRoadmaps() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    roadmapService
      .getUserRoadmaps()
      .then((data) => {
        if (!isMounted) return;
        setRoadmaps(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch((err) => {
        console.error("Failed to load user roadmaps:", err);
        if (isMounted) setRoadmaps([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const handleClick = (roadmap) => {
    const slugOrId = roadmap?.slug || roadmap?._id || roadmap?.id;
    if (slugOrId) navigate(`/roadmap/${slugOrId}`);
  };

  return (
    <section className={styles.widget}>
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <span className={styles.header_icon}>
            <Icon name="Map" size={18} />
          </span>
          <div>
            <h3 className={styles.header_title}>Roadmap Đang Theo Dõi</h3>
            <p className={styles.header_subtitle}>
              {roadmaps.length} lộ trình đã follow
            </p>
          </div>
        </div>
        <button
          className={styles.view_all_btn}
          onClick={() => navigate("/roadmap")}
        >
          Xem tất cả
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>

      <div className={styles.roadmap_list}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`${styles.roadmap_item} ${styles.skeleton}`}>
              <div className={styles.skeleton_icon} />
              <div className={styles.skeleton_body}>
                <div className={styles.skeleton_title} />
                <div className={styles.skeleton_sub} />
              </div>
            </div>
          ))
        ) : roadmaps.length === 0 ? (
          <div className={styles.empty_state}>
            <Icon name="MapPin" size={32} />
            <p>Bạn chưa follow roadmap nào</p>
            <button onClick={() => navigate("/roadmap")} className={styles.explore_btn}>
              Khám phá Roadmap
            </button>
          </div>
        ) : (
          roadmaps.map((rm, idx) => {
            const levelInfo = LEVEL_COLOR[rm.level] || LEVEL_COLOR.Beginner;
            return (
              <div
                key={rm._id || rm.id || idx}
                className={styles.roadmap_item}
                onClick={() => handleClick(rm)}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className={styles.roadmap_icon_wrap}>
                  <span className={styles.roadmap_icon}>
                    {rm.icon || "🗺️"}
                  </span>
                </div>
                <div className={styles.roadmap_info}>
                  <div className={styles.roadmap_top_row}>
                    <span className={styles.roadmap_title}>{rm.title}</span>
                    <span
                      className={styles.level_badge}
                      style={{ background: levelInfo.bg, color: levelInfo.color }}
                    >
                      {rm.level || "Beginner"}
                    </span>
                  </div>
                  <p className={styles.roadmap_desc}>
                    {rm.description}
                  </p>
                  <div className={styles.roadmap_meta}>
                    <span className={styles.meta_item}>
                      <Icon name="BookOpen" size={12} />
                      {rm.totalSteps} bước
                    </span>
                    <span className={styles.meta_item}>
                      <Icon name="Clock" size={12} />
                      {rm.estimatedTime}
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