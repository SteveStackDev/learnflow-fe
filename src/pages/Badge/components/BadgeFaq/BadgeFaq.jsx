import Icon from "~/components/Icon/Icon";
import styles from "./BadgeFaq.module.css";

function BadgeFaq({ faqs }) {
  return (
    <section className={styles["badge-faq"]}>
      <div className={styles["badge-faq__container"]}>
        <div className={styles["badge-faq__header"]}>
          <h2 className={styles["badge-faq__section-title"]}>Câu hỏi thường gặp</h2>
          <p className={styles["badge-faq__section-subtitle"]}>
            Giải đáp các thắc mắc về tiêu chí nhận danh hiệu và mở khóa quà tặng.
          </p>
        </div>
        <div className={styles["badge-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details key={obj.id} open={index === 0} className={styles["badge-faq__accordion"]}>
              <summary className={styles["badge-faq__accordion-summary"]}>
                <span className={styles["badge-faq__accordion-title"]}>{obj.question}</span>
                <span className={styles["badge-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["badge-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BadgeFaq;
