import Icon from "~/components/Icon/Icon";
import styles from "./LeaderboardFaq.module.css";

function LeaderboardFaq({ faqs }) {
  return (
    <section className={styles["board-faq"]}>
      <div className={styles["board-faq__container"]}>
        <div className={styles["board-faq__header"]}>
          <h2 className={styles["board-faq__section-title"]}>
            Câu hỏi thường gặp
          </h2>
          <p className={styles["board-faq__section-subtitle"]}>
            Giải đáp các thắc mắc về cơ chế tính điểm và thứ hạng vinh danh.
          </p>
        </div>
        <div className={styles["board-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              open={index === 0}
              className={styles["board-faq__accordion"]}
            >
              <summary className={styles["board-faq__accordion-summary"]}>
                <span className={styles["board-faq__accordion-title"]}>
                  {obj.question}
                </span>
                <span className={styles["board-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["board-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeaderboardFaq;
