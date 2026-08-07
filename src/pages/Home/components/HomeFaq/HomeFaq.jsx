import Icon from "~/components/Icon/Icon";
import styles from "./HomeFaq.module.css";

function HomeFaq({ faqs }) {
  return (
    <section className={styles["home-faq"]}>
      <div className={styles["home-faq__container"]}>
        <div className={styles["home-faq__header"]}>
          <h2 className={styles["home-faq__section-title"]}>
            Câu hỏi thường gặp
          </h2>
          <p className={styles["home-faq__section-subtitle"]}>
            Giải đáp những thắc mắc phổ biến khi chọn lộ trình học tập.
          </p>
        </div>

        <div className={styles["home-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              open={index === 0}
              className={styles["home-faq__accordion"]}
            >
              <summary className={styles["home-faq__accordion-summary"]}>
                <span className={styles["home-faq__accordion-title"]}>
                  {obj.question}
                </span>
                <span className={styles["home-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["home-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFaq;
