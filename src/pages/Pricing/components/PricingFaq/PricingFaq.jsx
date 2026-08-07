import Icon from "~/components/Icon/Icon";
import styles from "./PricingFaq.module.css";

function PricingFaq({ faqs }) {
  return (
    <section className={styles["price-faq"]}>
      <div className={styles["price-faq__container"]}>
        <div className={styles["price-faq__header"]}>
          <h2 className={styles["price-faq__section-title"]}>Câu hỏi thường gặp</h2>
          <p className={styles["price-faq__section-subtitle"]}>
            Mọi điều bạn cần biết về các gói dịch vụ, quyền lợi và thanh toán.
          </p>
        </div>

        <div className={styles["price-faq__accordion-group"]}>
          {faqs.map((obj, index) => (
            <details
              key={obj.id || obj.slug || obj.name || obj.title || obj}
              open={index === 0}
              className={styles["price-faq__accordion"]}
            >
              <summary className={styles["price-faq__accordion-summary"]}>
                <span className={styles["price-faq__accordion-title"]}>{obj.question}</span>
                <span className={styles["price-faq__accordion-icon"]}>
                  <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                </span>
              </summary>
              <div className={styles["price-faq__accordion-details"]}>
                <p>{obj.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingFaq;
