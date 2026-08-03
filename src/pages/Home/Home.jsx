import { useState, useEffect } from "react";
import { Link } from "react-router";
// Styles
import styles from "./Home.module.css";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Data
import { homeData } from "./data";
// Components
import Icon from "~/components/Icon/Icon";

// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";
import { useToast } from "~/context/ToastContext.jsx";

function Home() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const { toast } = useToast();

  useScrollReveal();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail) {
      toast.error("Vui lòng nhập Họ tên và Email!", "Lỗi thông tin");
      return;
    }
    toast.success("Đã nhận thông tin tư vấn! LearnFlow sẽ gửi tài liệu qua Email cho bạn.", "Gửi thành công");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };
  return (
    <>
      <div className={styles.homepage}>
        {/* Ambient Glow Orbs */}
        <div className={styles["homepage__orb-1"]} />
        <div className={styles["homepage__orb-2"]} />
        <div className={styles["homepage__orb-3"]} />
        <div className={styles["homepage__orb-4"]} />

        {/* 1. Hero Section */}
        <section className={styles["home-hero"]}>
          <div className={styles["home-hero__container"]}>
            <div className={styles["home-hero__content"]}>
              <div className={styles["home-hero__left"]}>
                <div className={styles["home-hero__badge-wrap"]}>
                  <span className={styles["home-hero__badge"]}>
                    <Icon name="Star" size={18} />
                    Mới: Thử thách 30 ngày Java Spring Boot
                  </span>
                </div>
                <h1 className={styles["home-hero__title"]}>
                  Dòng chảy học tập, kiến tạo tương lai{" "}
                  <span className={styles["home-hero__title--highlight"]}>
                    lập trình viên
                  </span>
                </h1>
                <p className={styles["home-hero__desc"]}>
                  Học lập trình theo lộ trình bài bản, luyện tập coding challenge
                  mỗi ngày và theo dõi tiến độ của riêng bạn trên nền tảng hiện
                  đại nhất.
                </p>
                <div className={styles["home-hero__actions"]}>
                  <Link
                    to="/signup"
                    className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--contained"]}`}
                  >
                    Bắt đầu ngay
                  </Link>
                  <Link
                    to="/roadmap"
                    className={`${styles["home-hero__btn"]} ${styles["home-hero__btn--outlined"]}`}
                  >
                    Xem lộ trình
                  </Link>
                </div>
              </div>

              {/* Right Side: Interactive Terminal & Dashboard Mockup */}
              <div className={styles["home-hero__right"]}>
                <div className={styles["home-hero__terminal-card"]}>
                  <div className={styles["home-hero__terminal-header"]}>
                    <div className={styles["home-hero__terminal-dots"]}>
                      <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--red"]}`} />
                      <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--yellow"]}`} />
                      <span className={`${styles["home-hero__dot"]} ${styles["home-hero__dot--green"]}`} />
                    </div>
                    <span className={styles["home-hero__terminal-url"]}>
                      learnflow.dev/dashboard
                    </span>
                  </div>

                  <div className={styles["home-hero__terminal-body"]}>
                    {/* Dashboard Mini Stats Widgets */}
                    <div className={styles["home-hero__dashboard-widgets"]}>
                      <div className={styles["home-hero__widget-box"]}>
                        <span className={styles["home-hero__widget-label"]}>Chuỗi Streak hiện tại</span>
                        <div className={styles["home-hero__widget-val-wrap"]}>
                          <span className={styles["home-hero__widget-val"]}>42</span>
                          <span className={styles["home-hero__widget-unit"]}>ngày 🔥</span>
                        </div>
                      </div>

                      <div className={styles["home-hero__widget-box"]}>
                        <span className={styles["home-hero__widget-label"]}>Hạng Thành viên</span>
                        <div className={styles["home-hero__widget-val-wrap"]}>
                          <span className={styles["home-hero__widget-val"]}>Vàng</span>
                          <span className={styles["home-hero__widget-unit"]}>🏅</span>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    <div className={styles["home-hero__code-box"]}>
                      <div className={styles["home-hero__code-line"]}>
                        <span className={styles["home-hero__line-num"]}>1</span>
                        <code>
                          <span className={styles["home-hero__code-keyword"]}>const</span> <span className={styles["home-hero__code-var"]}>student</span> = <span className={styles["home-hero__code-func"]}>new</span> <span className={styles["home-hero__code-class"]}>LearnFlow</span>();
                        </code>
                      </div>
                      <div className={styles["home-hero__code-line"]}>
                        <span className={styles["home-hero__line-num"]}>2</span>
                        <code>
                          <span className={styles["home-hero__code-var"]}>student</span>.<span className={styles["home-hero__code-prop"]}>target</span> = <span className={styles["home-hero__code-num"]}>100</span>;
                        </code>
                      </div>
                      <div className={styles["home-hero__code-line"]}>
                        <span className={styles["home-hero__line-num"]}>3</span>
                        <code>
                          <span className={styles["home-hero__code-keyword"]}>return</span> <span className={styles["home-hero__code-var"]}>target</span> - <span className={styles["home-hero__code-var"]}>progress</span>;
                        </code>
                      </div>
                      <div className={styles["home-hero__code-line"]}>
                        <span className={styles["home-hero__line-num"]}>4</span>
                        <code>
                          <span className={styles["home-hero__code-comment"]}>// {`>`}</span>
                        </code>
                      </div>
                      <div className={styles["home-hero__code-line"]}>
                        <span className={styles["home-hero__line-num"]}>5</span>
                        <code>
                          <span className={styles["home-hero__code-string"]}>🔥 Bắt đầu buổi học ngay...</span>
                        </code>
                      </div>

                      <div className={styles["home-hero__code-footer-btn"]}>
                        <span>Đang phát triển...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Logo Cloud Section */}
        <section className={styles["home-marquee"]}>
          <div className={styles["home-marquee__container"]}>
            <h2 className={styles["home-marquee__section-title"]}>
              CÔNG NGHỆ ĐÀO TẠO CỐT LÕI
            </h2>
            <div className={styles["home-marquee__wrap"]}>
              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="ReactTech" size={22} />
                <span>React</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="PythonTech" size={22} />
                <span>Python</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="AwsTech" size={22} />
                <span>AWS</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="DockerTech" size={22} />
                <span>Docker</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="NodeTech" size={22} />
                <span>Node.js</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <Icon name="MongoTech" size={22} />
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. About Section */}
        <section className={styles["home-about"]}>
          <div className={styles["home-about__container"]}>
            <div className={styles["home-about__media"]}>
              <div className={styles["home-about__img-frame"]}>
                <img
                  className={styles["home-about__img"]}
                  src={heroUrl}
                  alt="LearnFlow About Image"
                />
              </div>
            </div>

            <div className={styles["home-about__content"]}>
              <h2 className={styles["home-about__section-title"]}>
                Tại sao chọn LearnFlow?
              </h2>
              <p className={styles["home-about__text"]}>
                Khác với các nền tảng giải đố thuần túy như LeetCode có thể gây
                ngợp cho người mới, LearnFlow được thiết kế như một{" "}
                <strong>người dẫn đường</strong>. Chúng tôi không chỉ đưa bài
                tập, chúng tôi xây dựng tư duy lập trình từ những viên gạch đầu tiên.
              </p>

              <div className={styles["home-about__list"]}>
                {homeData.highlights.map((obj, index) => (
                  <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={styles["home-about__item"]}>
                    <div className={styles["home-about__item-icon"]}>
                      <Icon name={obj.iconName} size={22} />
                    </div>
                    <div className={styles["home-about__item-info"]}>
                      <h3 className={styles["home-about__item-title"]}>
                        {obj.title}
                      </h3>
                      <p className={styles["home-about__item-desc"]}>
                        {obj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className={`${styles["home-about__btn"]} ${styles["home-about__btn--contained"]}`}
              >
                Tìm hiểu thêm về LearnFlow
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Figures Banner Section */}
        <section className={styles["home-stats"]}>
          <div className={styles["home-stats__container"]}>
            <div className={styles["home-stats__list"]}>
              {homeData.stats.map((obj, index) => (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["home-stats__card"]} reveal-card`}
                  style={{ transitionDelay: `${index * 130}ms` }}
                >
                  <span className={styles["home-stats__card-number"]}>
                    {obj.value}
                  </span>
                  <p className={styles["home-stats__card-desc"]}>
                    {obj.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Features Section */}
        <section className={styles["home-features"]}>
          <div className={styles["home-features__container"]}>
            <div className={styles["home-features__header"]}>
              <h2 className={styles["home-features__section-title"]}>
                Tính năng nổi bật
              </h2>
              <p className={styles["home-features__section-subtitle"]}>
                Mọi công cụ bạn cần để trở thành một lập trình viên xuất sắc được
                gói gọn trong một nền tảng duy nhất.
              </p>
            </div>

            <div className={styles["home-features__list"]}>
              {homeData.features.map((obj, index) => (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["home-features__card"]} reveal-card`}
                  style={{ transitionDelay: `${index * 130}ms` }}
                >
                  <div className={styles["home-features__card-icon"]}>
                    <Icon name={obj.iconName} size={24} />
                  </div>
                  <h3 className={styles["home-features__card-title"]}>
                    {obj.title}
                  </h3>
                  <p className={styles["home-features__card-desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Team Section */}
        <section className={styles["home-team"]}>
          <div className={styles["home-team__container"]}>
            <div className={styles["home-team__header"]}>
              <h2 className={styles["home-team__section-title"]}>
                Đội ngũ phát triển
              </h2>
              <p className={styles["home-team__section-subtitle"]}>
                Những người đứng sau sự thành công của các lập trình viên chất lượng cao.
              </p>
            </div>

            <div className={styles["home-team__list"]}>
              {homeData.team.map((obj, index) => (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["home-team__card"]} reveal-card`}
                  style={{ transitionDelay: `${index * 130}ms` }}
                >
                  <img
                    className={styles["home-team__card-avatar"]}
                    alt={obj.name}
                    src={heroUrl}
                  />
                  <div className={styles["home-team__card-content"]}>
                    <h3 className={styles["home-team__card-name"]}>
                      {obj.name}
                    </h3>
                    <p className={styles["home-team__card-role"]}>
                      {obj.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className={styles["home-faq"]}>
          <div className={styles["home-faq__container"]}>
            <div className={styles["home-faq__header"]}>
              <h2 className={styles["home-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
            </div>

            <div className={styles["home-faq__accordion-group"]}>
              {homeData.faqs.map((obj, index) => (
                <details
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  open={index === 0}
                  className={styles["home-faq__accordion"]}
                >
                  <summary className={styles["home-faq__accordion-summary"]}>
                    <span className={styles["home-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["home-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className={styles["home-faq__accordion-details"]}>
                    <p>{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Contact Section */}
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
              <form className={styles["home-contact__form"]} onSubmit={handleContactSubmit}>
                <div className={styles["home-contact__form-group"]}>
                  <label htmlFor="home-contact-name" className={styles["home-contact__label"]}>Họ và tên</label>
                  <input
                    id="home-contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nhập tên của bạn"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <label htmlFor="home-contact-email" className={styles["home-contact__label"]}>Email</label>
                  <input
                    id="home-contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="example@email.com"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <label htmlFor="home-contact-message" className={styles["home-contact__label"]}>Nội dung</label>
                  <textarea
                    id="home-contact-message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tôi muốn tìm hiểu về lộ trình Frontend..."
                    rows={4}
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
      </div>
    </>
  );
}

export default Home;
