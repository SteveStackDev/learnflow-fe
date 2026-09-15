import Icon from "~/components/Icon/Icon";
import styles from "./CourseReasons.module.css";

const BENEFITS = [
  {
    id: "benefit-1",
    title: "Học từ nền tảng",
    description:
      "Kiến thức được hệ thống bài bản, giúp bạn hiểu rõ bản chất cốt lõi thay vì chỉ học vẹt code.",
    iconName: "Award",
  },
  {
    id: "benefit-2",
    title: "Kết hợp Roadmap",
    description:
      "Mọi khóa học đều nằm trong lộ trình nghề nghiệp rõ ràng, định hướng tương lai cho bạn.",
    iconName: "Compass",
  },
  {
    id: "benefit-3",
    title: "Luyện tập Challenge",
    description:
      "Hệ thống bài tập thực hành và thử thách ngay trong trình duyệt giúp bạn nhớ lâu hơn.",
    iconName: "Cpu",
  },
];

function CourseReasons({ benefits = BENEFITS }) {
  const displayBenefits = benefits && benefits.length > 0 ? benefits : BENEFITS;

  return (
    <section className={styles["course-reasons"]}>
      <div className={styles["course-reasons__container"]}>
        <div className={styles["course-reasons__header"]}>
          <h2 className={styles["course-reasons__section-title"]}>
            Tại sao nên học khóa học tại FySet?
          </h2>
          <p className={styles["course-reasons__section-subtitle"]}>
            Chúng tôi mang đến môi trường học tập lập trình khác biệt, tập trung vào kết quả và sự
            phát triển lâu dài.
          </p>
        </div>

        <div className={styles["course-reasons__list"]}>
          {displayBenefits.map((obj) => (
            <div key={obj.id} className={`${styles["course-reasons__card"]} reveal-card`}>
              <div className={styles["course-reasons__icon"]}>
                <Icon name={obj.iconName} size={24} />
              </div>
              <h3 className={styles["course-reasons__title"]}>{obj.title}</h3>
              <p className={styles["course-reasons__desc"]}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseReasons;
