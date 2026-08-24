import React from "react";
import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./DashboardLearningRoadmap.module.css";

export default function DashboardLearningRoadmap({ enrolledCourses = [], capstoneProject }) {
  return (
    <div className={`${styles.roadmap_card} reveal-card`}>
      <div className={styles.card_header}>
        <div className={styles.header_title_block}>
          <div className={styles.icon_box}>
            <Icon name="Compass" size={18} />
          </div>
          <div>
            <h3 className={styles.title}>Learning Roadmap & Capstone Progress</h3>
            <p className={styles.subtitle}>Tiến độ khóa học & dự án tốt nghiệp Capstone</p>
          </div>
        </div>

        <Link to="/roadmap" className={styles.view_all_link}>
          <span>Xem chi tiết Roadmap</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      {/* 1. Enrolled Courses List */}
      <div className={styles.courses_section}>
        <h4 className={styles.section_label}>Các khóa học đang diễn ra</h4>
        <div className={styles.courses_grid}>
          {enrolledCourses.map((course) => (
            <div key={course.id} className={styles.course_item}>
              <div className={styles.course_top}>
                <span className={styles.category_badge}>{course.category}</span>
                <span className={styles.percent_tag}>{course.progress}%</span>
              </div>

              <h5 className={styles.course_name}>{course.title}</h5>
              <p className={styles.next_lesson}>
                <Icon name="PlayCircle" size={13} />
                <span>{course.nextLesson}</span>
              </p>

              <div className={styles.progress_bar}>
                <div
                  className={styles.progress_fill}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Capstone Project Status & Feedback */}
      {capstoneProject && (
        <div className={styles.capstone_box}>
          <div className={styles.capstone_header}>
            <div className={styles.capstone_left}>
              <div className={styles.capstone_badge}>CAPSTONE PROJECT</div>
              <h4 className={styles.capstone_title}>{capstoneProject.title}</h4>
            </div>

            <div className={styles.status_pill}>
              <Icon name="CheckCircle2" size={14} />
              <span>ĐÃ ĐÁNH GIÁ ({capstoneProject.score})</span>
            </div>
          </div>

          <div className={styles.mentor_feedback_row}>
            <img
              src={capstoneProject.mentorAvatar}
              alt={capstoneProject.mentorName}
              className={styles.mentor_avatar}
            />
            <div className={styles.feedback_content}>
              <div className={styles.mentor_meta}>
                <span className={styles.mentor_name}>{capstoneProject.mentorName}</span>
                <span className={styles.submitted_date}>Nộp ngày {capstoneProject.submittedAt}</span>
              </div>
              <p className={styles.feedback_text}>"{capstoneProject.feedback}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
