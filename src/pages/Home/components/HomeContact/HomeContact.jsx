import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./HomeContact.module.css";

function HomeContact({
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMessage,
  setContactMessage,
  contactErrors,
  setContactErrors,
  isSubmitting,
  handleContactSubmit,
}) {
  return (
    <section className={styles["home-contact"]}>
      <div className={styles["home-contact__container"]}>
        <div className={styles["home-contact__content"]}>
          <h2 className={styles["home-contact__title"]}>
            Bạn cần tư vấn lộ trình?
          </h2>
          <p className={styles["home-contact__desc"]}>
            Để lại thông tin, đội ngũ chuyên gia của LearnFlow sẽ liên hệ và
            tư vấn lộ trình học tập phù hợp nhất với mục tiêu nghề nghiệp của bạn.
          </p>
          <div className={styles["home-contact__tip"]}>
            <span>💡 Nhận tài liệu tư vấn nghề nghiệp miễn phí qua Email sau khi gửi form.</span>
          </div>
        </div>

        <div className={styles["home-contact__form-wrap"]}>
          <form noValidate className={styles["home-contact__form"]} onSubmit={handleContactSubmit}>
            <div className={styles["home-contact__form-group"]}>
              <label htmlFor="home-contact-name" className={styles["home-contact__label"]}>Họ và tên</label>
              <input
                id="home-contact-name"
                type="text"
                value={contactName}
                onChange={(e) => {
                  setContactName(e.target.value);
                  if (contactErrors.name) setContactErrors((prev) => ({ ...prev, name: null }));
                }}
                placeholder="Nhập tên của bạn"
                className={`${styles["home-contact__form-input"]} ${
                  contactErrors.name ? styles["home-contact__form-input--error"] : ""
                }`}
              />
              {contactErrors.name && (
                <span className={styles["home-contact__error-text"]}>
                  <Icon name="AlertCircle" size={13} />
                  {contactErrors.name}
                </span>
              )}
            </div>
            <div className={styles["home-contact__form-group"]}>
              <label htmlFor="home-contact-email" className={styles["home-contact__label"]}>Email</label>
              <input
                id="home-contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value);
                  if (contactErrors.email) setContactErrors((prev) => ({ ...prev, email: null }));
                }}
                placeholder="example@email.com"
                className={`${styles["home-contact__form-input"]} ${
                  contactErrors.email ? styles["home-contact__form-input--error"] : ""
                }`}
              />
              {contactErrors.email && (
                <span className={styles["home-contact__error-text"]}>
                  <Icon name="AlertCircle" size={13} />
                  {contactErrors.email}
                </span>
              )}
            </div>
            <div className={styles["home-contact__form-group"]}>
              <label htmlFor="home-contact-message" className={styles["home-contact__label"]}>Nội dung</label>
              <textarea
                id="home-contact-message"
                value={contactMessage}
                onChange={(e) => {
                  setContactMessage(e.target.value);
                  if (contactErrors.message) setContactErrors((prev) => ({ ...prev, message: null }));
                }}
                placeholder="Tôi muốn tìm hiểu về lộ trình Frontend..."
                rows={4}
                className={`${styles["home-contact__form-input"]} ${styles["home-contact__form-input--textarea"]} ${
                  contactErrors.message ? styles["home-contact__form-input--error"] : ""
                }`}
              />
              {contactErrors.message && (
                <span className={styles["home-contact__error-text"]}>
                  <Icon name="AlertCircle" size={13} />
                  {contactErrors.message}
                </span>
              )}
            </div>

            <div className={styles["home-contact__form-actions"]}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles["home-contact__form-btn"]} ${styles["home-contact__form-btn--contained"]}`}
              >
                {isSubmitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
              </button>
              <Link
                to="/contact"
                className={`${styles["home-contact__form-btn"]} ${styles["home-contact__form-btn--outlined"]}`}
              >
                Xem trang liên hệ chi tiết
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomeContact;
