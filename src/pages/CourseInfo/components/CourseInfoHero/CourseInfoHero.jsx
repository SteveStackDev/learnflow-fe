import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import heroImgUrl from "~/assets/images/Home/hero.webp";
import styles from "./CourseInfoHero.module.css";

export default function CourseInfoHero({ course, onPlayPreview }) {
  const navigate = useNavigate();

  return (
    <div className={styles.hero_container}>
      {/* Back to Course List Button */}
      <button
        className={styles.back_btn}
        onClick={() => navigate("/course")}
        title="Quay lại danh sách khóa học"
      >
        <Icon name="ArrowLeft" size={16} />
        <span>Danh sách khóa học</span>
      </button>

      {/* Course Title & Description */}
      <h1 className={styles.course_title}>{course.title}</h1>
      <p className={styles.course_desc}>{course.description}</p>

      {/* Meta Row: Rating, Students, Last Updated */}
      <div className={styles.meta_row}>
        <div className={styles.meta_item}>
          <div className={styles.star_rating}>
            <Icon name="Star" size={16} color="#f59e0b" fill="#f59e0b" />
            <span>{course.stats.rating}</span>
          </div>
          <span className={styles.rating_count}>({course.stats.reviews} đánh giá)</span>
        </div>

        <div className={styles.meta_item}>
          <Icon name="Users" size={16} />
          <span>{course.stats.learners} học viên</span>
        </div>

        <div className={styles.meta_item}>
          <Icon name="RotateCcw" size={16} />
          <span>Cập nhật: {course.updatedAt}</span>
        </div>
      </div>

      {/* Video Preview Banner */}
      <div className={styles.video_preview_wrap} onClick={onPlayPreview}>
        <img
          src={heroImgUrl}
          alt={`Xem trước khóa học ${course.title}`}
          className={styles.preview_img}
        />
        <div className={styles.play_overlay}>
          <div className={styles.play_btn} title="Xem video giới thiệu">
            <Icon name="Play" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
