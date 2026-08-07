import Icon from "~/components/Icon/Icon";
import styles from "./CourseReasons.module.css";

function CourseReasons({ benefits }) {
  return (
    <section className={styles["course-reasons"]}>
      <div className={styles["course-reasons__container"]}>
        <div className={styles["course-reasons__header"]}>
          <h2 className={styles["course-reasons__section-title"]}>
            Tại sao nên học khóa học tại LearnFlow?
          </h2>
          <p className={styles["course-reasons__section-subtitle"]}>
            Chúng tôi mang đến môi trường học tập lập trình khác biệt, tập trung
            vào kết quả và sự phát triển lâu dài.
          </p>
        </div>

        <div className={styles["course-reasons__list"]}>
          {benefits.map((obj) => (
            <div key={obj.id} className={`${styles["course-reasons__card"]} reveal-card`}>
              <div className={styles["course-reasons__icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["course-reasons__title"]}>
                {obj.title}
              </h3>
              <p className={styles["course-reasons__desc"]}>
                {obj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseReasons;
