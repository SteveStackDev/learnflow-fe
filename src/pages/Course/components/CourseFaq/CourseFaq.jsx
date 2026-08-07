import Icon from "~/components/Icon/Icon";
import styles from "./CourseFaq.module.css";

function CourseFaq({ faqs }) {
  return (
    <section className={styles["course-faq"]}>
      <div className={styles["course-faq__container"]}>
        <div className={styles["course-faq__header"]}>
          <h2 className={styles["course-faq__section-title"]}>
            Câu hỏi thường gặp
          </h2>
          <p className={styles["course-faq__section-subtitle"]}>
            Giải đáp những thắc mắc phổ biến khi đăng ký và tham gia các khóa học.
          </p>
        </div>

        <div className={styles["course-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id}
              open={index === 0}
              className={styles["course-faq__accordion"]}
            >
              <summary className={styles["course-faq__accordion-summary"]}>
                <span className={styles["course-faq__accordion-title"]}>
                  {obj.question}
                </span>
                <span className={styles["course-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["course-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CourseFaq;
