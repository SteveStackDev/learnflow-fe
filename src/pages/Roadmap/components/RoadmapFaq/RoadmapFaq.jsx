import Icon from "~/components/Icon/Icon";
import styles from "./RoadmapFaq.module.css";

function RoadmapFaq({ faqs }) {
  return (
    <section className={styles["roadmap-faq"]}>
      <div className={styles["roadmap-faq__container"]}>
        <div className={styles["roadmap-faq__header"]}>
          <h2 className={styles["roadmap-faq__section-title"]}>Câu hỏi thường gặp</h2>
          <p className={styles["roadmap-faq__section-subtitle"]}>
            Giải đáp những thắc mắc phổ biến khi chọn lộ trình học tập.
          </p>
        </div>

        <div className={styles["roadmap-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details key={obj.id} open={index === 0} className={styles["roadmap-faq__accordion"]}>
              <summary className={styles["roadmap-faq__accordion-summary"]}>
                <span className={styles["roadmap-faq__accordion-title"]}>{obj.question}</span>
                <span className={styles["roadmap-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["roadmap-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoadmapFaq;
