// Data
import { contactData } from "./data";
// Import CSS Modules
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <div className={styles.contactpage}>
        {/* Hero Section */}
        <section className={styles["contact-hero"]}>
          <div className={styles["contact-hero__container"]}>
            <div className={styles["contact-hero__content"]}>
              <span className={styles["contact-hero__badge"]}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Hỗ trợ 24/7
              </span>
              <h1 className={styles["contact-hero__title"]}>
                Liên hệ với LearnFlow
              </h1>
              <p className={styles["contact-hero__desc"]}>
                Đội ngũ LearnFlow luôn sẵn sàng lắng nghe và hỗ trợ bạn trên mọi
                lộ trình học tập, giải đáp thắc mắc kỹ thuật hoặc thảo luận về
                các cơ hội hợp tác mới.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className={styles["contact-features"]}>
          <div className={styles["contact-features__container"]}>
            <h2 className={styles["contact-features__section-title"]}>
              LearnFlow là gì? Hệ sinh thái học tập có định hướng
            </h2>
            <div className={styles["contact-features__list"]}>
              {contactData.topics.map((obj, index) => {
                return (
                  <div key={index} className={styles["contact-features__card"]}>
                    <span className={styles["contact-features__icon"]}>
                      {obj.iconName}
                    </span>
                    <h3 className={styles["contact-features__title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["contact-features__desc"]}>
                      {obj.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className={styles["contact-main"]}>
          <div className={styles["contact-main__container"]}>
            {/* Left Side: Form */}
            <div className={styles["contact-main__content"]}>
              <h2 className={styles["contact-main__section-title"]}>
                Gửi tin nhắn cho chúng tôi
              </h2>

              <form className={styles["contact-main__form"]}>
                <div className={styles["contact-main__form-row"]}>
                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label className={styles["contact-main__form-label"]}>
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>

                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label className={styles["contact-main__form-label"]}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles["contact-main__form-row"]}>
                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label className={styles["contact-main__form-label"]}>
                        Chủ đề
                      </label>
                      <input
                        type="text"
                        placeholder="Vấn đề cần hỗ trợ"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>

                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label className={styles["contact-main__form-label"]}>
                        Loại yêu cầu
                      </label>
                      <select
                        defaultValue="tech"
                        className={styles["contact-main__form-select"]}
                      >
                        <option value="tech">Hỗ trợ kỹ thuật</option>
                        <option value="billing">Hóa đơn & Thanh toán</option>
                        <option value="course">Tư vấn lộ trình học</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles["contact-main__form-group"]} ${styles["contact-main__form-group--fullwidth"]}`}
                >
                  <label className={styles["contact-main__form-label"]}>
                    Tin nhắn của bạn
                  </label>
                  <textarea
                    placeholder="Hãy cho chúng tôi biết chi tiết vấn đề của bạn..."
                    rows={4}
                    className={`${styles["contact-main__form-input"]} ${styles["contact-main__form-input--textarea"]}`}
                  />
                </div>

                <button
                  type="submit"
                  className={`${styles["contact-main__btn"]} ${styles["contact-main__btn--contained"]}`}
                >
                  Gửi yêu cầu ngay
                </button>
              </form>
            </div>

            {/* Right Side: Info */}
            <div className={styles["contact-main__info"]}>
              <h2 className={styles["contact-main__section-title"]}>
                Thông tin hỗ trợ
              </h2>

              <div className={styles["contact-main__info-list"]}>
                {contactData.info.map((obj, index) => {
                  return (
                    <div
                      key={index}
                      className={styles["contact-main__info-item"]}
                    >
                      <span className={styles["contact-main__info-icon"]}>
                        {obj.iconName}
                      </span>
                      <div className={styles["contact-main__info-body"]}>
                        <h3 className={styles["contact-main__info-title"]}>
                          {obj.title}
                        </h3>

                        {typeof obj.description === "string" ? (
                          <p className={styles["contact-main__info-desc"]}>
                            {obj.description}
                          </p>
                        ) : (
                          <div className={styles["contact-main__social-list"]}>
                            {obj.description.map((item, subIndex) => (
                              <span
                                key={subIndex}
                                className={styles["contact-main__social-item"]}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className={styles["contact-main__office-box"]}>
                  <p className={styles["contact-main__office-text"]}>
                    Văn phòng tại Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Contacts Section */}
        <section className={styles["contact-channels"]}>
          <div className={styles["contact-channels__container"]}>
            <h2 className={styles["contact-channels__section-title"]}>
              Kênh hỗ trợ chuyên biệt
            </h2>
            <div className={styles["contact-channels__list"]}>
              {contactData.departments.map((obj, index) => {
                return (
                  <div key={index} className={styles["contact-channels__card"]}>
                    <span className={styles["contact-channels__icon"]}>
                      {obj.iconName}
                    </span>
                    <h3 className={styles["contact-channels__title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["contact-channels__desc"]}>
                      {obj.description}
                    </p>
                    <a
                      href={`mailto:${obj.email}`}
                      className={styles["contact-channels__link"]}
                    >
                      {obj.email}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["contact-faq"]}>
          <div className={styles["contact-faq__container"]}>
            <div className={styles["contact-faq__accordion-group"]}>
              {contactData.faqs.map((obj, index) => {
                return (
                  <details
                    key={index}
                    open={index === 0}
                    className={styles["contact-faq__accordion"]}
                  >
                    <summary
                      className={styles["contact-faq__accordion-summary"]}
                    >
                      <span className={styles["contact-faq__accordion-title"]}>
                        {obj.question}
                      </span>
                    </summary>
                    <div className={styles["contact-faq__accordion-details"]}>
                      <p>{obj.answer}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
