import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardUpcomingEvents.module.css";

export default function DashboardUpcomingEvents({ upcomingEvents = [] }) {
  return (
    <div className={`${styles.events_widget} reveal-card`}>
      <div className={styles.widget_header}>
        <div className={styles.header_left}>
          <div className={styles.icon_box}>
            <Icon name="Calendar" size={16} />
          </div>
          <h4 className={styles.widget_title}>Upcoming Events & Deadlines</h4>
        </div>
      </div>

      <div className={styles.events_list}>
        {upcomingEvents.map((evt) => (
          <div
            key={evt.id}
            className={`${styles.event_item} ${
              evt.isUrgent ? styles["event_item--urgent"] : ""
            }`}
          >
            <div className={styles.event_left}>
              <span
                className={`${styles.tag_badge} ${
                  evt.type === "DEADLINE" ? styles["tag_badge--danger"] : styles["tag_badge--info"]
                }`}
              >
                {evt.type}
              </span>
              <h5 className={styles.event_name}>{evt.title}</h5>
              <span className={styles.event_time}>{evt.time || evt.targetText}</span>
            </div>

            <Link to={evt.to || "/contest"} className={styles.action_btn}>
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
