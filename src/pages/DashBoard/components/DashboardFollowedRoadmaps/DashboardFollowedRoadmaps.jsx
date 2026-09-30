import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import { roadmapService } from "~/services/roadmapService";
import styles from "./DashboardFollowedRoadmaps.module.css";

const MOCK_ROADMAPS = [
  {
    _id: "1",
    title: "Frontend Developer Roadmap",
    description: "Lộ trình học Frontend từ cơ bản đến nâng cao",
    totalSteps: 24,
    icon: "🌐",
    level: "Beginner",
    estimatedTime: "3 tháng",
  },
  {
    _id: "2",
    title: "Data Structures & Algorithms",
    description: "Cấu trúc dữ liệu và thuật toán chuẩn phỏng vấn",
    totalSteps: 18,
    icon: "⚡",
    level: "Intermediate",
    estimatedTime: "2 tháng",
  },
  {
    _id: "3",
    title: "Backend Node.js Roadmap",
    description: "Backend development với Node.js và Express",
    totalSteps: 20,
    icon: "🔧",
    level: "Advanced",
    estimatedTime: "4 tháng",
  },
];

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
      .getAllRoadmaps()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data.slice(0, 5) : [];
        setRoadmaps(list.length > 0 ? list : MOCK_ROADMAPS);
      })
      .catch(() => {
        if (isMounted) setRoadmaps(MOCK_ROADMAPS);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleClick = (roadmap) => {
    const id = roadmap._id || roadmap.id || roadmap.slug;
    navigate(`/roadmap/${id}`);
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
                    {rm.description || "Lộ trình học tập chuyên sâu"}
                  </p>
                  <div className={styles.roadmap_meta}>
                    <span className={styles.meta_item}>
                      <Icon name="BookOpen" size={12} />
                      {rm.totalSteps || "--"} bước
                    </span>
                    <span className={styles.meta_item}>
                      <Icon name="Clock" size={12} />
                      {rm.estimatedTime || "Linh hoạt"}
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
