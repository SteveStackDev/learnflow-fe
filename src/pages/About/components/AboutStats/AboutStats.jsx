import styles from "./AboutStats.module.css";

function AboutStats() {
  return (
    <section className={`${styles["about-hero__stats-widget"]} reveal-card`}>
      <div className={styles["about-hero__stats-item"]}>
        <span className={styles["about-hero__stats-value"]}>50K+</span>
        <span className={styles["about-hero__stats-label"]}>Học viên</span>
      </div>
      <div className={styles["about-hero__stats-divider"]}></div>
      <div className={styles["about-hero__stats-item"]}>
        <span className={styles["about-hero__stats-value"]}>120+</span>
        <span className={styles["about-hero__stats-label"]}>Khóa học</span>
      </div>
      <div className={styles["about-hero__stats-divider"]}></div>
      <div className={styles["about-hero__stats-item"]}>
        <span className={styles["about-hero__stats-value"]}>15+</span>
        <span className={styles["about-hero__stats-label"]}>Chủ đề lập trình</span>
      </div>
    </section>
  );
}

export default AboutStats;
