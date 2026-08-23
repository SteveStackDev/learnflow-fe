import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardHeroBanner.module.css";

export default function DashboardHeroBanner({ heroBanner }) {
  if (!heroBanner) return null;

  return (
    <div className={`${styles.hero_banner} reveal-card`}>
      {/* Top Banner Row */}
      <div className={styles.banner_content}>
        <div className={styles.left_block}>
          <div className={styles.badge_group}>
            <span className={styles.tag}>{heroBanner.tag || "TIẾP TỤC HỌC"}</span>
            <span className={styles.remaining_pill}>{heroBanner.remainingInfo}</span>
          </div>

          <h2 className={styles.course_title}>{heroBanner.title}</h2>
          <p className={styles.module_subtitle}>{heroBanner.currentModule}</p>

          {/* Progress Bar */}
          <div className={styles.progress_box}>
            <div className={styles.progress_meta}>
              <span className={styles.progress_label}>TIẾN ĐỘ MODULE HIỆN TẠI</span>
              <span className={styles.progress_value}>{heroBanner.progress}%</span>
            </div>
            <div className={styles.progress_track}>
              <div
                className={styles.progress_fill}
                style={{ width: `${heroBanner.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.right_action}>
          <Link to={heroBanner.to || "/course"} className={styles.resume_btn}>
            <Icon name="Play" size={18} />
            <span>{heroBanner.actionText || "Tiếp tục học ngay"}</span>
          </Link>
        </div>
      </div>

      {/* AI Diagnostic Nudge Bar */}
      {heroBanner.aiNudge && (
        <div className={styles.ai_nudge_box}>
          <div className={styles.ai_nudge_left}>
            <div className={styles.ai_icon_circle}>
              <Icon name="Bot" size={16} />
            </div>
            <div className={styles.ai_text_meta}>
              <span className={styles.ai_title}>{heroBanner.aiNudge.title}</span>
              <p className={styles.ai_message}>{heroBanner.aiNudge.message}</p>
            </div>
          </div>
          <Link to={heroBanner.aiNudge.to || "/problem"} className={styles.ai_action_btn}>
            <span>{heroBanner.aiNudge.actionText || "Ôn tập ngay"}</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
