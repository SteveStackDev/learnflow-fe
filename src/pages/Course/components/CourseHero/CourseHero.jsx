import Icon from "~/components/Icon/Icon";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./CourseHero.module.css";

function CourseHero() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className={styles["course-hero"]}>
        <div className={styles["course-hero__container"]}>
          <div className={styles["course-hero__content"]}>
            <div className={styles["course-hero__left"]}>
              <div className={styles["course-hero__badge-wrap"]}>
                <span className={styles["course-hero__tag"]}>
                  <Icon name="Book" size={16} />
                  Nâng tầm kỹ năng lập trình
                </span>
              </div>
              <h1 className={styles["course-hero__title"]}>
                Hệ Thống Khóa Học{" "}
                <span className={styles["course-hero__title--highlight"]}>
                  Lập&nbsp;Trình&nbsp;Thực&nbsp;Chiến
                </span>
              </h1>
              <p className={styles["course-hero__desc"]}>
                Hệ thống khóa học từ cơ bản đến nâng cao, được thiết kế bởi các chuyên gia để giúp
                bạn trở thành lập trình viên thực thụ.
              </p>
              <div className={styles["course-hero__btn-group"]}>
                <button
                  type="button"
                  className={`${styles["course-hero__btn"]} ${styles["course-hero__btn--contained"]}`}
                >
                  Bắt đầu học ngay
                </button>
                <button
                  type="button"
                  className={`${styles["course-hero__btn"]} ${styles["course-hero__btn--outlined"]}`}
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>

            <div className={styles["course-hero__media"]}>
              <div className={styles["course-hero__img-frame"]}>
                <img
                  src={heroUrl}
                  alt="Khóa học lập trình thực chiến FySet"
                  loading="lazy"
                  decoding="async"
                  className={styles["course-hero__img"]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 Continue Learning Widget */}
      <section className={styles["course-continue"]}>
        <div className={styles["course-continue__container"]}>
          <div className={styles["course-continue__header"]}>
            <h2 className={styles["course-continue__title"]}>Khóa học đang học</h2>
          </div>
          <div className={styles["course-continue__card"]}>
            <div className={styles["course-continue__info"]}>
              <h3 className={styles["course-continue__course-title"]}>
                Lập trình ReactJS Cơ bản đến Nâng cao
              </h3>
              <p className={styles["course-continue__lesson"]}>
                Bài học tiếp theo: Hooks trong React (useState, useEffect)
              </p>
            </div>
            <div className={styles["course-continue__progress-area"]}>
              <div className={styles["course-continue__progress-text"]}>
                <span>Tiến độ</span>
                <span className={styles["course-continue__percentage"]}>68%</span>
              </div>
              <div className={styles["course-continue__progress-bar-bg"]}>
                <div
                  className={styles["course-continue__progress-bar-fill"]}
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
            <button type="button" className={styles["course-continue__btn"]}>
              Tiếp tục học
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseHero;
