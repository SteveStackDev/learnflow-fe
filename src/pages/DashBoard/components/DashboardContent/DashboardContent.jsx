import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import DashboardContribution from "../DashboardContribution/DashboardContribution";
import styles from "./DashboardContent.module.css";

function DashboardContent({
  learningPath,
  recommended = [],
  recentActivities = [],
  upcomingEvents = [],
  badges = [],
  attendanceMatrix = [],
}) {
  return (
    <div className={styles.content_grid}>
      {/* Left Column */}
      <div className={styles.left_column}>
        {/* 1. Learning Path Hero CTA Card */}
        {learningPath && (
          <div className={styles.path_card}>
            <div className={styles.path_badge_row}>
              <span className={styles.path_tag}>{learningPath.tag || "TIẾP TỤC HỌC"}</span>
              <span className={styles.path_remaining_pill}>
                {learningPath.remainingInfo || "Còn 2 bài học"}
              </span>
            </div>

            <div className={styles.path_header_row}>
              <div className={styles.path_text_block}>
                <h2 className={styles.path_title}>{learningPath.title}</h2>
                <p className={styles.path_module}>{learningPath.currentModule}</p>
              </div>

              <Link to={learningPath.to} className={styles.path_continue_btn}>
                <span>{learningPath.actionText || "Tiếp tục học ngay"}</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>

            <div className={styles.path_progress_block}>
              <div className={styles.path_progress_header}>
                <span className={styles.path_progress_label}>TIẾN ĐỘ MODULE HIỆN TẠI</span>
                <span className={styles.path_percent}>{learningPath.progress}%</span>
              </div>
              <div className={styles.path_track}>
                <div className={styles.path_fill} style={{ width: `${learningPath.progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* 2. Recommended For You */}
        <div className={styles.section_block}>
          <h3 className={styles.section_title}>
            <Icon name="Sparkles" size={18} style={{ color: "#0950c3" }} />
            <span>Recommended for You</span>
          </h3>

          <div className={styles.recommended_grid}>
            {recommended.map((item) => (
              <Link key={item.id} to={item.to} className={styles.rec_card}>
                <div className={styles.rec_icon_box}>
                  <Icon name={item.iconName} size={20} />
                </div>
                <div className={styles.rec_content}>
                  <h4 className={styles.rec_title}>{item.title}</h4>
                  <p className={styles.rec_desc}>{item.description}</p>
                </div>
                <div className={styles.rec_meta}>
                  <Icon name="Clock" size={12} />
                  <span>{item.meta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Recent Activity */}
        <div className={`${styles.section_block} ${styles.activity_section_block}`}>
          <h3 className={styles.section_title}>
            <Icon name="History" size={18} style={{ color: "#0950c3" }} />
            <span>Recent Activity</span>
          </h3>

          <div className={styles.activity_card}>
            <div className={styles.activity_list}>
              {recentActivities.map((act) => (
                <div key={act.id} className={styles.activity_item}>
                  <div
                    className={`${styles.activity_icon} ${styles[`activity_icon--${act.type}`]}`}
                  >
                    <Icon name={act.iconName} size={18} />
                  </div>
                  <div className={styles.activity_info}>
                    <span className={styles.activity_title}>{act.title}</span>
                    <span className={styles.activity_subtext}>
                      {act.time} • {act.subtext}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column / Sidebar */}
      <div className={styles.right_column}>
        {/* Upcoming Events */}
        <div className={styles.sidebar_card}>
          <div className={styles.sidebar_header}>
            <h3 className={styles.sidebar_title}>
              <Icon name="Calendar" size={16} />
              <span>Upcoming</span>
            </h3>
          </div>

          <div className={styles.event_list}>
            {upcomingEvents.map((evt) => (
              <Link key={evt.id} to={evt.to} className={styles.event_item}>
                <div className={styles.event_tag_row}>
                  <span
                    className={`${styles.event_tag} ${
                      styles[`event_tag--${evt.tag.toLowerCase()}`]
                    }`}
                  >
                    {evt.tag}
                  </span>
                  <span className={styles.event_time}>{evt.time}</span>
                </div>
                <span className={styles.event_title}>{evt.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className={styles.sidebar_card}>
          <div className={styles.sidebar_header}>
            <h3 className={styles.sidebar_title}>
              <Icon name="Award" size={16} />
              <span>Badges</span>
            </h3>
            <Link to="/badge" className={styles.sidebar_link}>
              View All
            </Link>
          </div>

          <div className={styles.badges_grid}>
            {badges.map((b) => (
              <div key={b.id} className={styles.badge_item}>
                <div
                  className={`${styles.badge_circle} ${
                    !b.isUnlocked ? styles["badge_circle--locked"] : ""
                  }`}
                >
                  <Icon name={b.iconName} size={22} />
                </div>
                <span className={styles.badge_title}>{b.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Style Attendance Matrix under Badges */}
        <DashboardContribution matrix={attendanceMatrix} />
      </div>
    </div>
  );
}

export default DashboardContent;
