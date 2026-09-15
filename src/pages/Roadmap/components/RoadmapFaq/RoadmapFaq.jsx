import Icon from "~/components/Icon/Icon";
import styles from "./RoadmapFaq.module.css";

const DEFAULT_FAQS = [
  {
    id: "roadmap-faq-1",
    question: "Làm thế nào để biết tôi hợp với Frontend hay Backend?",
    answer:
      "Hãy thử sức với dự án nhỏ ở cả 2 mảng. Nếu thích thiết kế và phản hồi thị giác ngay, hãy chọn Frontend; nếu thích logic xử lý ngầm và cơ sở dữ liệu, hãy chọn Backend.",
  },
  {
    id: "roadmap-faq-2",
    question: "Một lộ trình mất bao lâu để hoàn thành?",
    answer:
      "Thời gian trung bình từ 3 đến 6 tháng tùy thuộc vào thời gian bạn dành ra học tập mỗi ngày.",
  },
  {
    id: "roadmap-faq-3",
    question: "Lộ trình có bao gồm dự án thực tế không?",
    answer:
      "Tất cả các lộ trình tại FySet đều đi kèm dự án thực chiến tốt nghiệp để làm đẹp portfolio của bạn.",
  },
];

function RoadmapFaq({ faqs = DEFAULT_FAQS }) {
  const list = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

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
          {list.map((obj, index) => (
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
