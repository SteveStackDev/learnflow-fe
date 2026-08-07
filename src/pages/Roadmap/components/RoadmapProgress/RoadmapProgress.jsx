import styles from "./RoadmapProgress.module.css";

function RoadmapProgress() {
  return (
    <section className={styles["roadmap-progress"]}>
      <div className={styles["roadmap-progress__container"]}>
        <div className={styles["roadmap-progress__header"]}>
          <h2 className={styles["roadmap-progress__title"]}>Tiến trình học tập của bạn</h2>
          <span className={styles["roadmap-progress__percentage"]}>45%</span>
        </div>
        <div className={styles["roadmap-progress__bar-bg"]}>
          <div className={styles["roadmap-progress__bar-fill"]} style={{ width: "45%" }}></div>
        </div>
        <div className={styles["roadmap-progress__milestones"]}>
          <div className={`${styles["roadmap-progress__milestone"]} ${styles["roadmap-progress__milestone--completed"]}`}>
            <div className={styles["roadmap-progress__dot"]}>✓</div>
            <span>Tân binh</span>
          </div>
          <div className={`${styles["roadmap-progress__milestone"]} ${styles["roadmap-progress__milestone--current"]}`}>
            <div className={styles["roadmap-progress__dot"]}></div>
            <span>Thực tập sinh</span>
          </div>
          <div className={styles["roadmap-progress__milestone"]}>
            <div className={styles["roadmap-progress__dot"]}></div>
            <span>Lập trình viên</span>
          </div>
          <div className={styles["roadmap-progress__milestone"]}>
            <div className={styles["roadmap-progress__dot"]}></div>
            <span>Chuyên gia</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadmapProgress;
