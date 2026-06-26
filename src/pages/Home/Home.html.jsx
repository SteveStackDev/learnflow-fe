// Styles
import styles from "./Home.module.css";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Data
import { homeData } from "./data";

function Home() {
  return (
    <>
      <div className={styles.homepage}>
        {/* Hero Section */}
        <section className={styles["home-hero"]}>
          <div className={styles["home-hero__container"]}>
            <div className={styles["home-hero__content"]}>
              <span className={styles["home-hero__badge"]}>
                Mới: Thử thách 30 ngày Java Spring Boot
              </span>
              <h1 className={styles["home-hero__title"]}>
                Dòng chảy học tập, kiến tạo tương lai lập trình viên
              </h1>
              <p className={styles["home-hero__desc"]}>
                Học lập trình theo lộ trình bài bản, luyện tập coding challenge
                mỗi ngày và theo dõi tiến độ của riêng bạn trên nền tảng hiện
                đại nhất.
              </p>
              <div className={styles["home-hero__actions"]}>
                <button
                  type="button"
                  className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--contained"]}`}
                >
                  Bắt đầu ngay
                </button>
                <button
                  type="button"
                  className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--outlined"]}`}
                >
                  Xem lộ trình
                </button>
              </div>
            </div>

            <div className={styles["home-hero__media"]}>
              <img
                className={styles["home-hero__img"]}
                src={heroUrl}
                alt="Hero Image"
              />
            </div>
          </div>
        </section>

        {/* Logo List Section */}
        <section className={styles["home-marquee"]}>
          <div className={styles["home-marquee__container"]}>
            <h2 className={styles["home-marquee__section-title"]}>
              Công nghệ đào tạo cốt lõi
            </h2>
            <div className={styles["home-marquee__wrap"]}>
              {/* Nội dung các logo đặt ở đây */}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles["home-about"]}>
          <div className={styles["home-about__container"]}>
            <div className={styles["home-about__media"]}>
              <img
                className={styles["home-about__img"]}
                src={heroUrl}
                alt="About Image"
              />
            </div>

            <div className={styles["home-about__content"]}>
              <h2 className={styles["home-about__section-title"]}>
                Tại sao chọn LearnFlow?
              </h2>
              <p className={styles["home-about__text"]}>
                Khác với các nền tảng giải đố thuần túy như LeetCode có thể gây
                ngợp cho người mới, LearnFlow được thiết kế như một **người dẫn
                đường**. Chúng tôi không chỉ đưa bài tập, chúng tôi xây dựng tư
                duy lập trình từ những viên gạch đầu tiên.
              </p>

              <div className={styles["home-about__list"]}>
                {homeData.highlights.map((obj, index) => {
                  return (
                    <div key={index} className={styles["home-about__item"]}>
                      <span className={styles["home-about__item-icon"]}>
                        {obj.iconName}
                      </span>
                      <div className={styles["home-about__item-info"]}>
                        <h3 className={styles["home-about__item-title"]}>
                          {obj.title}
                        </h3>
                        <p className={styles["home-about__item-desc"]}>
                          {obj.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className={`${styles["home-about__btn"]} ${styles["home-about__btn--contained"]}`}
              >
                Tìm hiểu thêm về LearnFlow
              </button>
            </div>
          </div>
        </section>

        {/* Figure Section */}
        <section className={styles["home-stats"]}>
          <div className={styles["home-stats__container"]}>
            <div className={styles["home-stats__list"]}>
              {homeData.stats.map((obj, index) => {
                return (
                  <div key={index} className={styles["home-stats__card"]}>
                    <span className={styles["home-stats__card-number"]}>
                      {obj.label}
                    </span>
                    <p className={styles["home-stats__card-desc"]}>
                      {obj.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className={styles["home-features"]}>
          <div className={styles["home-features__container"]}>
            <h2 className={styles["home-features__section-title"]}>
              Tính năng nổi bật
            </h2>
            <p className={styles["home-features__section-subtitle"]}>
              Mọi công cụ bạn cần để trở thành một lập trình viên xuất sắc được
              gói gọn trong một nền tảng duy nhất.
            </p>

            <div className={styles["home-features__list"]}>
              {homeData.features.map((obj, index) => {
                return (
                  <div key={index} className={styles["home-features__card"]}>
                    <span className={styles["home-features__card-icon"]}>
                      {obj.iconName}
                    </span>
                    <h3 className={styles["home-features__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["home-features__card-desc"]}>
                      {obj.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles["home-team"]}>
          <div className={styles["home-team__container"]}>
            <h2 className={styles["home-team__section-title"]}>
              Đội ngũ phát triển
            </h2>
            <p className={styles["home-team__section-subtitle"]}>
              Những người đứng sau sứ mệnh phổ cập lập trình chất lượng cao.
            </p>

            <div className={styles["home-team__list"]}>
              {homeData.team.map((obj, index) => {
                return (
                  <div key={index} className={styles["home-team__card"]}>
                    <img
                      className={styles["home-team__card-avatar"]}
                      alt={obj.title}
                      src={obj.imageUrl}
                    />
                    <div className={styles["home-team__card-content"]}>
                      <h3 className={styles["home-team__card-name"]}>
                        {obj.title}
                      </h3>
                      <p className={styles["home-team__card-role"]}>
                        {obj.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles["home-faq"]}>
          <div className={styles["home-faq__container"]}>
            <h2 className={styles["home-faq__section-title"]}>
              Câu hỏi thường gặp
            </h2>
            <div className={styles["home-faq__accordion-group"]}>
              {homeData.faqs.map((obj, index) => {
                return (
                  <details
                    key={index}
                    open={index === 0}
                    className={styles["home-faq__accordion"]}
                  >
                    <summary className={styles["home-faq__accordion-summary"]}>
                      <span className={styles["home-faq__accordion-title"]}>
                        {obj.question}
                      </span>
                    </summary>
                    <div className={styles["home-faq__accordion-details"]}>
                      <p>{obj.answer}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles["home-contact"]}>
          <div className={styles["home-contact__container"]}>
            <div className={styles["home-contact__content"]}>
              <h2 className={styles["home-contact__title"]}>
                Bạn cần tư vấn lộ trình?
              </h2>
              <p className={styles["home-contact__desc"]}>
                Để lại thông tin, đội ngũ chuyên gia của LearnFlow sẽ liên hệ và
                tư vấn lộ trình học tập phù hợp nhất với mục tiêu nghề nghiệp
                bạn chọn.
              </p>
            </div>

            <div className={styles["home-contact__form-wrap"]}>
              <form className={styles["home-contact__form"]}>
                <div className={styles["home-contact__form-group"]}>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <textarea
                    placeholder="Tôi muốn tìm hiểu về lộ trình Frontend..."
                    rows={5}
                    className={`${styles["home-contact__form-input"]} ${styles["home-contact__form-input--textarea"]}`}
                  />
                </div>

                <div className={styles["home-contact__form-actions"]}>
                  <button
                    type="submit"
                    className={`${styles["home-contact__form-btn"]} ${styles["home-contact__form-btn--contained"]}`}
                  >
                    Gửi yêu cầu
                  </button>
                  <button
                    type="button"
                    className={`${styles["home-contact__form-btn"]} ${styles["home-contact__form-btn--outlined"]}`}
                  >
                    Xem trang liên hệ chi tiết
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
