import { useState } from "react";
// Data
import { contactData } from "./data";
// Import CSS Modules
import styles from "./Contact.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";

function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !email || !message) {
      toast.error("Vui lòng điền đầy đủ Họ tên, Email và Tin nhắn!", "Gửi thất bại");
      return;
    }
    toast.success("Cảm ơn bạn đã liên hệ! Đội ngũ LearnFlow sẽ phản hồi sớm nhất.", "Gửi thành công");
    setFullname("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
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
                <Icon name="Headphones" size={16} />
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
                  <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={styles["contact-features__card"]}>
                    <span className={styles["contact-features__icon"]}>
                      <Icon name={obj.iconName} size={22} />
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

              <form className={styles["contact-main__form"]} onSubmit={handleSubmit}>
                <div className={styles["contact-main__form-row"]}>
                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label htmlFor="contact-fullname" className={styles["contact-main__form-label"]}>
                        Họ và tên
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>

                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label htmlFor="contact-email" className={styles["contact-main__form-label"]}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles["contact-main__form-row"]}>
                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label htmlFor="contact-subject" className={styles["contact-main__form-label"]}>
                        Chủ đề
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Vấn đề cần hỗ trợ"
                        className={styles["contact-main__form-input"]}
                      />
                    </div>
                  </div>

                  <div className={styles["contact-main__form-col"]}>
                    <div className={styles["contact-main__form-group"]}>
                      <label htmlFor="contact-type" className={styles["contact-main__form-label"]}>
                        Loại yêu cầu
                      </label>
                      <select
                        id="contact-type"
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
                  <label htmlFor="contact-message" className={styles["contact-main__form-label"]}>
                    Tin nhắn của bạn
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                      key={obj.id || obj.slug || obj.name || obj.title || obj}
                      className={styles["contact-main__info-item"]}
                    >
                      <span className={styles["contact-main__info-icon"]}>
                        <Icon name={obj.iconName} size={20} />
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
                             {obj.description.map((item) => (
                               <span
                                 key={item.id || item.name || item}
                                className={styles["contact-main__social-item"]}
                                title={item}
                              >
                                {item.toLowerCase().includes("fb") ? (
                                  <Icon name="Facebook" size={18} />
                                ) : (
                                  <Icon name="MailIcon" size={18} />
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
                  <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={styles["contact-channels__card"]}>
                    <span className={styles["contact-channels__icon"]}>
                      <Icon name={obj.iconName} size={22} />
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
                    key={obj.id || obj.slug || obj.name || obj.title || obj}
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
