// Data
import { contactData } from "./data";
// Import CSS Modules
import styles from "./Contact.module.css";

function Contact() {
  return (
    <>
      <div className={styles.contactpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["contactpage__orb-1"]} />
        <div className={styles["contactpage__orb-2"]} />
        <div className={styles["contactpage__orb-3"]} />
        <div className={styles["contactpage__orb-4"]} />

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
                      {index === 0 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                      )}
                      {index >= 2 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                          <line x1="4" y1="22" x2="4" y2="15" />
                        </svg>
                      )}
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
                        {index === 0 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        )}
                        {index >= 3 && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                          </svg>
                        )}
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
                                title={item}
                              >
                                {item.toLowerCase().includes("fb") ? (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                  </svg>
                                )}
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
                      {index === 0 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      )}
                      {index >= 2 && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
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
