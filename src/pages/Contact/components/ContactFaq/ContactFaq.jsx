import Icon from "~/components/Icon/Icon";
import styles from "./ContactFaq.module.css";

function ContactFaq({ faqs }) {
  return (
    <section className={styles["contact-faq"]}>
      <div className={styles["contact-faq__container"]}>
        <div className={styles["contact-faq__header"]}>
          <h2 className={styles["contact-faq__section-title"]}>Câu hỏi thường gặp</h2>
          <p className={styles["contact-faq__section-subtitle"]}>
            Giải đáp nhanh các thắc mắc về hỗ trợ kỹ thuật và tư vấn dịch vụ.
          </p>
        </div>
        <div className={styles["contact-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              open={index === 0}
              className={styles["contact-faq__accordion"]}
            >
              <summary className={styles["contact-faq__accordion-summary"]}>
                <span className={styles["contact-faq__accordion-title"]}>{obj.question}</span>
                <span className={styles["contact-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["contact-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactFaq;
