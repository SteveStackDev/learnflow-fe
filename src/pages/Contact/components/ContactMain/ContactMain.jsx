import { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContactMain.module.css";

const CONTACT_TYPE_OPTIONS = [
  { value: "tech", label: "Hỗ trợ kỹ thuật" },
  { value: "billing", label: "Hóa đơn & Thanh toán" },
  { value: "course", label: "Tư vấn lộ trình học" },
];

function ContactMain({ info = [] }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [requestType, setRequestType] = useState("tech");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ và tên!";
    }
    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!subject.trim()) {
      newErrors.subject = "Vui lòng nhập tiêu đề!";
    }
    if (!message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Cảm ơn bạn đã liên hệ! Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm nhất.",
        "Gửi thành công!"
      );
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <section className={styles["contact-main"]}>
      <div className={styles["contact-main__container"]}>
        {/* Left Form Card */}
        <div className={styles["contact-main__content"]}>
          <h2 className={styles["contact-main__section-title"]}>
            <Icon name="MessageSquare" size={24} style={{ marginRight: 8, verticalAlign: "middle" }} />
            Gửi tin nhắn cho chúng tôi
          </h2>

          <form onSubmit={handleSubmit} className={styles["contact-main__form"]}>
            <div className={styles["contact-main__form-row"]}>
              <div className={styles["contact-main__form-col"]}>
                <div className={styles["contact-main__form-group"]}>
                  <label htmlFor="contact-fullname" className={styles["contact-main__form-label"]}>
                    Họ và tên <span className={styles["contact-main__required"]}>*</span>
                  </label>
                  <input
                    id="contact-fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={`${styles["contact-main__form-input"]} ${
                      errors.fullname ? styles["contact-main__form-input--error"] : ""
                    }`}
                  />
                  {errors.fullname && (
                    <span className={styles["contact-main__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.fullname}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles["contact-main__form-col"]}>
                <div className={styles["contact-main__form-group"]}>
                  <label htmlFor="contact-email" className={styles["contact-main__form-label"]}>
                    Địa chỉ Email <span className={styles["contact-main__required"]}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@fyset.edu.vn"
                    className={`${styles["contact-main__form-input"]} ${
                      errors.email ? styles["contact-main__form-input--error"] : ""
                    }`}
                  />
                  {errors.email && (
                    <span className={styles["contact-main__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles["contact-main__form-row"]}>
              <div className={styles["contact-main__form-col"]}>
                <div className={styles["contact-main__form-group"]}>
                  <label htmlFor="contact-subject" className={styles["contact-main__form-label"]}>
                    Tiêu đề <span className={styles["contact-main__required"]}>*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ví dụ: Cần hỗ trợ về bài tập..."
                    className={`${styles["contact-main__form-input"]} ${
                      errors.subject ? styles["contact-main__form-input--error"] : ""
                    }`}
                  />
                  {errors.subject && (
                    <span className={styles["contact-main__error-text"]}>
                      <Icon name="AlertCircle" size={13} />
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles["contact-main__form-col"]}>
                <div className={styles["contact-main__form-group"]}>
                  <label className={styles["contact-main__form-label"]}>Loại yêu cầu</label>
                  <DropdownMenu
                    options={CONTACT_TYPE_OPTIONS}
                    value={requestType}
                    onChange={setRequestType}
                  />
                </div>
              </div>
            </div>

            <div
              className={`${styles["contact-main__form-group"]} ${styles["contact-main__form-group--fullwidth"]}`}
            >
              <label htmlFor="contact-message" className={styles["contact-main__form-label"]}>
                Nội dung tin nhắn <span className={styles["contact-main__required"]}>*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mô tả chi tiết thắc mắc hoặc yêu cầu của bạn..."
                className={`${styles["contact-main__form-input"]} ${styles["contact-main__form-input--textarea"]} ${
                  errors.message ? styles["contact-main__form-input--error"] : ""
                }`}
              />
              {errors.message && (
                <span className={styles["contact-main__error-text"]}>
                  <Icon name="AlertCircle" size={13} />
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles["contact-main__btn"]} ${styles["contact-main__btn--contained"]}`}
            >
              {isSubmitting ? (
                <span>Đang gửi...</span>
              ) : (
                <>
                  <Icon name="Send" size={18} style={{ marginRight: 6 }} />
                  <span>Gửi tin nhắn ngay</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Info Column */}
        <div className={styles["contact-main__info"]}>
          <h2 className={styles["contact-main__section-title"]}>
            <Icon name="Headphones" size={24} style={{ marginRight: 8, verticalAlign: "middle" }} />
            Trung tâm hỗ trợ FySet
          </h2>

          <div className={styles["contact-main__info-list"]}>
            {info.map((item) => (
              <div key={item.id || item.title} className={styles["contact-main__info-item"]}>
                <div className={styles["contact-main__info-icon"]}>
                  <Icon name={item.iconName || "Mail"} size={20} />
                </div>
                <div className={styles["contact-main__info-body"]}>
                  <h4 className={styles["contact-main__info-title"]}>{item.title}</h4>
                  {Array.isArray(item.description) ? (
                    <div className={styles["contact-main__social-list"]}>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        className={styles["contact-main__social-item"]}
                        title="Facebook"
                      >
                        <Icon name="Share2" size={16} />
                      </a>
                      <a
                        href="mailto:support@fyset.edu.vn"
                        className={styles["contact-main__social-item"]}
                        title="Email"
                      >
                        <Icon name="Mail" size={16} />
                      </a>
                      <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer"
                        className={styles["contact-main__social-item"]}
                        title="Youtube"
                      >
                        <Icon name="Compass" size={16} />
                      </a>
                    </div>
                  ) : (
                    <p className={styles["contact-main__info-desc"]}>{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Office Location & Google Map Embed */}
          <div className={styles["contact-main__office-box"]}>
            <div className={styles["contact-main__office-text"]}>
              <Icon name="MapPin" size={18} />
              <span>Vị trí văn phòng FySet: Q.1, TP. Hồ Chí Minh</span>
            </div>
            <div className={styles["contact-main__map-wrapper"]}>
              <iframe
                title="FySet Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.497746979679!2d106.69747587570228!3d10.773199859253456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f418579058b%3A0xe543c7b39678c187!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!2m3!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: 12, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMain;
