import Icon from "~/components/Icon/Icon";
import styles from "./CourseFaq.module.css";

const FAQS = [
  {
    id: "faq-1",
    question: "Khóa học có dành cho người chưa biết gì về code không?",
    answer:
      "Có, các khóa học gắn tag 'Cơ bản' được thiết kế chi tiết dành riêng cho người mới bắt đầu từ con số 0.",
  },
  {
    id: "faq-2",
    question: "Tôi có được nhận chứng chỉ sau khi hoàn thành khóa học không?",
    answer:
      "Có, sau khi hoàn thành 100% bài học và vượt qua bài test cuối khóa, bạn sẽ nhận được chứng chỉ kỹ thuật số.",
  },
  {
    id: "faq-3",
    question: "Tôi có thể xem lại bài học khi đã kết thúc khóa học không?",
    answer:
      "Tài khoản của bạn được cấp quyền truy cập trọn đời, bạn có thể xem lại video và tài liệu bất cứ lúc nào.",
  },
];

function CourseFaq({ faqs = FAQS }) {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : FAQS;

  return (
    <section className={styles["course-faq"]}>
      <div className={styles["course-faq__container"]}>
        <div className={styles["course-faq__header"]}>
          <h2 className={styles["course-faq__section-title"]}>Câu hỏi thường gặp</h2>
          <p className={styles["course-faq__section-subtitle"]}>
            Giải đáp những thắc mắc phổ biến khi đăng ký và tham gia các khóa học.
          </p>
        </div>

        <div className={styles["course-faq__accordion-group"]}>
          {displayFaqs.map((obj, index) => (
            <details key={obj.id} open={index === 0} className={styles["course-faq__accordion"]}>
              <summary className={styles["course-faq__accordion-summary"]}>
                <span className={styles["course-faq__accordion-title"]}>{obj.question}</span>
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
