import { useEffect } from "react";
import { Link } from "react-router";
// Styles
import styles from "./Home.module.css";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Data
import { homeData } from "./data";

function Home() {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles["reveal-card--visible"]);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    });

    const elements = document.querySelectorAll(`.${styles["reveal-card"]}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div className={styles.homepage}>
        {/* Ambient Glow Orbs */}
        <div className={styles["homepage__orb-1"]} />
        <div className={styles["homepage__orb-2"]} />

        {/* 1. Hero Section */}
        <section className={styles["home-hero"]}>
          <div className={styles["home-hero__container"]}>
            <div className={styles["home-hero__content"]}>
              <div className={styles["home-hero__left"]}>
                <div className={styles["home-hero__badge-wrap"]}>
                  <span className={styles["home-hero__badge"]}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d8ff" strokeWidth="2">
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="#00d8ff" />
                </svg>
                <span>React</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3776ab" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>Python</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2">
                  <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1558 20.2036 10.2312 17.915 10.0215C17.4475 6.58156 14.4984 3.9 10.9 3.9C6.81309 3.9 3.5 7.21309 3.5 11.3C3.5 11.7588 3.54162 12.2078 3.62141 12.6433C2.08316 13.4116 1 14.9961 1 16.8C1 19.3405 3.05949 21.4 5.6 21.4H17.5" />
                </svg>
                <span>AWS</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2496ed" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Docker</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#68a063" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>Node.js</span>
              </div>

              <div className={styles["home-marquee__tech-item"]}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#47a248" strokeWidth="2">
                  <ellipse cx="12" cy="12" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
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
                  <div key={index} className={styles["home-about__item"]}>
                    <div className={styles["home-about__item-icon"]}>
                      {index === 0 ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
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
                  key={index}
                  className={`${styles["home-stats__card"]} ${styles["reveal-card"]}`}
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
                  key={index}
                  className={`${styles["home-features__card"]} ${styles["reveal-card"]}`}
                  style={{ transitionDelay: `${index * 130}ms` }}
                >
                  <div className={styles["home-features__card-icon"]}>
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
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
                  key={index}
                  className={`${styles["home-team__card"]} ${styles["reveal-card"]}`}
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
                  key={index}
                  open={index === 0}
                  className={styles["home-faq__accordion"]}
                >
                  <summary className={styles["home-faq__accordion-summary"]}>
                    <span className={styles["home-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["home-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
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
              <form className={styles["home-contact__form"]} onSubmit={(e) => e.preventDefault()}>
                <div className={styles["home-contact__form-group"]}>
                  <label className={styles["home-contact__label"]}>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <label className={styles["home-contact__label"]}>Email</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={styles["home-contact__form-input"]}
                  />
                </div>
                <div className={styles["home-contact__form-group"]}>
                  <label className={styles["home-contact__label"]}>Nội dung</label>
                  <textarea
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
