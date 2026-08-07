import Icon from "~/components/Icon/Icon";
import styles from "./ContestFaq.module.css";

function ContestFaq({ faqs }) {
  return (
    <section className={styles["contest-faq"]}>
      <div className={styles["contest-faq__container"]}>
        <div className={styles["contest-faq__header"]}>
          <h2 className={styles["contest-faq__section-title"]}>
            Câu hỏi thường gặp
          </h2>
          <p className={styles["contest-faq__section-subtitle"]}>
            Giải đáp những thắc mắc phổ biến về thể lệ và quy định thi đấu.
          </p>
        </div>
        <div className={styles["contest-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              open={index === 0}
              className={styles["contest-faq__accordion"]}
            >
              <summary className={styles["contest-faq__accordion-summary"]}>
                <span className={styles["contest-faq__accordion-title"]}>
                  {obj.question}
                </span>
                <span className={styles["contest-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["contest-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContestFaq;
