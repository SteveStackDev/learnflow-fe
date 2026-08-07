import { useState } from "react";
import Icon from "~/components/Icon/Icon";
import { useToast } from "~/context/ToastContext.jsx";
import styles from "./ContactMain.module.css";

function ContactMain({ info }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
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
      newErrors.email = "Vui lòng nhập địa chỉ Email!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Email không đúng định dạng (ví dụ: name@domain.com)";
    }

    if (!subject.trim()) {
      newErrors.subject = "Vui lòng nhập chủ đề liên hệ!";
    }

    if (!message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn!";
    } else if (message.trim().length < 10) {
      newErrors.message = "Nội dung tin nhắn phải có ít nhất 10 ký tự!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, "Lỗi nhập dữ liệu");
      return;
    }

    setIsSubmitting(true);
    // UI hoàn thành – chờ kết nối API/backend.
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Cảm ơn bạn đã liên hệ! (UI hoàn thành – chờ kết nối API/backend)",
        "Gửi thành công (Mock)",
      );
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    }, 1200);
  };

  return (
    <section className={styles["contact-main"]}>
      <div className={styles["contact-main__container"]}>
        {/* Left Side: Form */}
        <div className={styles["contact-main__content"]}>
          <h2 className={styles["contact-main__section-title"]}>Gửi tin nhắn cho chúng tôi</h2>

          <form noValidate className={styles["contact-main__form"]} onSubmit={handleSubmit}>
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
                    onChange={(e) => {
                      setFullname(e.target.value);
                      if (errors.fullname) setErrors((prev) => ({ ...prev, fullname: null }));
                    }}
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
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                    }}
                    placeholder="example@email.com"
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
                    Chủ đề
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: null }));
                    }}
                    placeholder="Vấn đề cần hỗ trợ"
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
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: null }));
                }}
                placeholder="Hãy cho chúng tôi biết chi tiết vấn đề của bạn..."
                rows={6}
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
              {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu ngay"}
            </button>
          </form>
        </div>

        {/* Right Side: Info */}
        <div className={styles["contact-main__info"]}>
          <h2 className={styles["contact-main__section-title"]}>Thông tin hỗ trợ</h2>

          <div className={styles["contact-main__info-list"]}>
            {info.map((obj) => (
              <div
                key={obj.id || obj.slug || obj.name || obj.title || obj}
                className={styles["contact-main__info-item"]}
              >
                <span className={styles["contact-main__info-icon"]}>
                  <Icon name={obj.iconName} size={20} />
                </span>
                <div className={styles["contact-main__info-body"]}>
                  <h3 className={styles["contact-main__info-title"]}>{obj.title}</h3>

                  {typeof obj.description === "string" ? (
                    <p className={styles["contact-main__info-desc"]}>{obj.description}</p>
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
            ))}

            <div className={styles["contact-main__office-box"]}>
              <p className={styles["contact-main__office-text"]}>
                <Icon name="MapPin" size={16} />
                Văn phòng tại Quận 1, TP. Hồ Chí Minh
              </p>
              <div className={styles["contact-main__map-wrapper"]}>
                <iframe
                  title="Văn phòng LearnFlow - Quận 1, TP. Hồ Chí Minh"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.69976397573617!3d10.773374259251845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1aa3e28c61680d2!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMain;
