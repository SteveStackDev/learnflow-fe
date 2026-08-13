import Icon from "~/components/Icon/Icon";
import styles from "./DashboardCard.module.css";

function DashboardCard({ student }) {
  if (!student) return null;

  return (
    <div className={styles.dashboard_card}>
      <div className={styles.dashboard_card__glow} />

      {/* Top Row: Brand & Streak */}
      <div className={styles.dashboard_card__top}>
        <div className={styles.dashboard_card__brand_group}>
          <span className={styles.dashboard_card__brand_title}>FySet</span>
          <span className={styles.dashboard_card__badge_sub}>{student.badgeLevel}</span>
        </div>

        <div className={styles.dashboard_card__streak_badge}>
          <span className={styles.dashboard_card__streak_fire}>🔥</span>
          <span>{student.streakDays} Ngày Streak</span>
        </div>
      </div>

      {/* Middle Section: Name, Role Pill & Progress Bar */}
      <div className={styles.dashboard_card__middle}>
        <div className={styles.dashboard_card__identity}>
          <h2 className={styles.dashboard_card__name}>{student.name}</h2>
          <span className={styles.dashboard_card__role_pill}>{student.role}</span>
        </div>

        {/* Progress Bar under FRONTEND DEVELOPER role */}
        <div className={styles.dashboard_card__progress_block}>
          <div className={styles.dashboard_card__progress_header}>
            <span>TIẾN ĐỘ HỌC TẬP</span>
            <span>{student.overallProgress}%</span>
          </div>
          <div className={styles.dashboard_card__progress_track}>
            <div
              className={styles.dashboard_card__progress_fill}
              style={{ width: `${student.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: ID, Join Date & Badges */}
      <div className={styles.dashboard_card__bottom}>
        <div className={styles.dashboard_card__meta_list}>
          <div className={styles.dashboard_card__meta_item}>
            <span className={styles.dashboard_card__meta_label}>ID HỌC VIÊN</span>
            <span className={styles.dashboard_card__meta_val}>{student.id}</span>
          </div>
          <div className={styles.dashboard_card__meta_item}>
            <span className={styles.dashboard_card__meta_label}>NGÀY THAM GIA</span>
            <span className={styles.dashboard_card__meta_val}>{student.joinDate}</span>
          </div>
        </div>

        <div className={styles.dashboard_card__icon_row}>
          {student.badgeIcons?.map((icon, idx) => (
            <div key={idx} className={styles.dashboard_card__icon_badge}>
              <Icon name={icon} size={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
