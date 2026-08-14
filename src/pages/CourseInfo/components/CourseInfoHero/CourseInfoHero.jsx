import React from "react";
import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import heroImgUrl from "~/assets/images/Home/hero.webp";
import styles from "./CourseInfoHero.module.css";

export default function CourseInfoHero({ course, onPlayPreview }) {
  const navigate = useNavigate();
  const title = course?.title || "Lập trình ReactJS từ cơ bản đến nâng cao";
  const description =
    course?.description ||
    "Khóa học toàn diện giúp bạn làm chủ ReactJS. Xây dựng các ứng dụng web tương tác, hiệu suất cao với các khái niệm hiện đại như Hooks, Redux Toolkit, Next.js và nhiều hơn nữa.";
  const rating = course?.rating || 4.8;
  const ratingCount = course?.ratingCount || "2,450";
  const studentsCount = course?.studentsCount || "15,000+";
  const lastUpdated = course?.lastUpdated || "10/2024";

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
      <h1 className={styles.course_title}>{title}</h1>
      <p className={styles.course_desc}>{description}</p>

      {/* Meta Row: Rating, Students, Last Updated */}
      <div className={styles.meta_row}>
        <div className={styles.meta_item}>
          <div className={styles.star_rating}>
            <Icon name="Star" size={16} color="#f59e0b" fill="#f59e0b" />
            <span>{rating}</span>
          </div>
          <span className={styles.rating_count}>({ratingCount} đánh giá)</span>
        </div>

        <div className={styles.meta_item}>
          <Icon name="Users" size={16} />
          <span>{studentsCount} học viên</span>
        </div>

        <div className={styles.meta_item}>
          <Icon name="RotateCcw" size={16} />
          <span>Cập nhật: {lastUpdated}</span>
        </div>
      </div>

      {/* Video Preview Banner */}
      <div className={styles.video_preview_wrap} onClick={onPlayPreview}>
        <img src={heroImgUrl} alt={title} className={styles.preview_img} />
        <div className={styles.play_overlay}>
          <div className={styles.play_btn} title="Xem video giới thiệu">
            <Icon name="Play" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
