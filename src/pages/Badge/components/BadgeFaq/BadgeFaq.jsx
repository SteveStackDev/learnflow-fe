import Icon from "~/components/Icon/Icon";
import styles from "./BadgeFaq.module.css";

const DEFAULT_FAQS = [
  {
    id: "badge-faq-1",
    question: "Huy hiệu trên FySet dùng để làm gì?",
    answer:
      "Huy hiệu giúp bạn chứng minh năng lực cá nhân, làm đẹp hồ sơ profile và mở khóa những đặc quyền tài khoản.",
  },
  {
    id: "badge-faq-2",
    question: "Sau bao lâu thì hệ thống tự động mở khóa huy hiệu?",
    answer:
      "Hệ thống quét tiến độ và tự động cấp mở khóa huy hiệu ngay khi bạn đáp ứng đủ tiêu chuẩn.",
  },
  {
    id: "badge-faq-3",
    question: "Tôi có thể chia sẻ huy hiệu lên các mạng xã hội không?",
    answer:
      "Có, bạn có thể dễ dàng tải xuống chứng nhận và chia sẻ trực tiếp huy hiệu lên LinkedIn, Facebook hoặc CV.",
  },
];

function BadgeFaq({ faqs = DEFAULT_FAQS }) {
  const list = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

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
          {list.map((obj, index) => (
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
