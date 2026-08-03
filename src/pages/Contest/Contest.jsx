import { useEffect } from "react";
import { useState } from "react";

// Data
import { contestData } from "./data";

// Import CSS Modules
import styles from "./Contest.module.css";
// Components
import Icon from "~/components/Icon/Icon";

function Contest() {
  const [activeTab, setActiveTab] = useState(0);


  // Intersection Observer for scroll animations (Staggered)
  useEffect(() => {
    let delay = 0;
    let timeoutId;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${delay * 100}ms`;
            entry.target.classList.add("reveal-card--visible");
            delay++;
            observer.unobserve(entry.target);
          }
        });
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          delay = 0;
        }, 150);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    const cards = document.querySelectorAll(".reveal-card");
    cards.forEach((card) => {
      // Reset any inline delay if re-running
      card.style.transitionDelay = "0ms";
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <>
      <div className={styles.contestpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["contestpage__orb-1"]} />
        <div className={styles["contestpage__orb-2"]} />
        <div className={styles["contestpage__orb-3"]} />
        <div className={styles["contestpage__orb-4"]} />



        {/* 1. Hero Section */}
        <section className={styles["contest-hero"]}>
          <div className={styles["contest-hero__container"]}>
            <div className={styles["contest-hero__content"]}>
              <div className={styles["contest-hero__badge-wrap"]}>
                <span className={styles["contest-hero__tag"]}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Chinh phục thử thách mới
                </span>
              </div>
              <h1 className={styles["contest-hero__title"]}>
                Đấu trường lập trình{" "}
                <span className={styles["contest-hero__title--highlight"]}>
                  LearnFlow
                </span>
              </h1>
              <p className={styles["contest-hero__desc"]}>
                Nơi hội tụ những tài năng lập trình xuất sắc nhất. Thử thách bản
                thân qua các kỳ thi thuật toán đỉnh cao, bứt phá giới hạn kỹ
                năng và khẳng định vị thế trên bảng xếp hạng.
              </p>
              <div className={styles["contest-hero__btn-group"]}>
                <button
                  type="button"
                  className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--contained"]}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Tham gia ngay</span>
                </button>
                <button
                  type="button"
                  className={`${styles["contest-hero__btn"]} ${styles["contest-hero__btn--outlined"]}`}
                >
                  <span>Xem luật chơi</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Overview Stats Section */}
        <section className={styles["contest-stats"]}>
          <div className={styles["contest-stats__container"]}>
            <div className={styles["contest-stats__list"]}>
              {contestData.stats.map((obj, index) => (
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contest-stats__card"]} reveal-card`}>
                  <div
                    className={`${styles["contest-stats__icon"]} ${
                      index === 0
                        ? styles["contest-stats__icon--blue"]
                        : index === 1
                        ? styles["contest-stats__icon--yellow"]
                        : styles["contest-stats__icon--purple"]
                    }`}
                  >
                    <Icon name={obj.iconName} size={22} />
                  </div>
                  <div className={styles["contest-stats__info"]}>
                    <span className={styles["contest-stats__label"]}>
                      {obj.title}
                    </span>
                    <span className={styles["contest-stats__value"]}>
                      {obj.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Search & Filter Bar Section */}
        <section className={styles["contest-filters"]}>
          <div className={styles["contest-filters__container"]}>
            <div className={styles["contest-filters__card-wrapper"]}>
              <div className={styles["contest-filters__row"]}>
                <div className={styles["contest-filters__search-box"]}>
                  <span className={styles["contest-filters__search-icon"]}>
                    <Icon name="Search" size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm contest bạn muốn tham gia..."
                    className={styles["contest-filters__search-input"]}
                  />
                </div>

                <div className={styles["contest-filters__tab-group"]}>
                  {contestData.tabs.map((item, index) => (
                    <button
                      key={item.id || item.slug || item.name || item.title || item}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`${styles["contest-filters__tab-btn"]} ${
                        activeTab === index
                          ? styles["contest-filters__tab-btn--active"]
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Contests Cards Grid Section */}
        <section className={styles["contest-grid"]}>
          <div className={styles["contest-grid__container"]}>
            <div className={styles["contest-grid__list"]}>
              {contestData.items.map((obj, index) => (
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contest-grid__card"]} reveal-card`}>
                  {/* Banner Image with Status Badge */}
                  <div className={styles["contest-grid__card-media"]}>
                    <span
                      className={`${styles["contest-grid__status-badge"]} ${
                        obj.statusLabel.includes("ĐANG MỞ")
                          ? styles["contest-grid__status-badge--open"]
                          : styles["contest-grid__status-badge--upcoming"]
                      }`}
                    >
                      {obj.statusLabel}
                    </span>
                    <img
                      src={obj.imageUrl}
                      alt={obj.title}
                      className={styles["contest-grid__card-img"]}
                    />
                  </div>

                  <div className={styles["contest-grid__card-body"]}>
                    <h3 className={styles["contest-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <div className={styles["contest-grid__card-meta"]}>
                      <span className={styles["contest-grid__meta-item"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {obj.time}
                      </span>
                      <span className={styles["contest-grid__meta-item"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {obj.duration}
                      </span>
                      <span className={styles["contest-grid__meta-item"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        {obj.participants}
                      </span>
                    </div>
                  </div>

                  <div className={styles["contest-grid__card-actions"]}>
                    <button
                      type="button"
                      className={`${styles["contest-grid__action-btn"]} ${
                        obj.actionVariant === "contained"
                          ? styles["contest-grid__action-btn--contained"]
                          : styles["contest-grid__action-btn--outlined"]
                      }`}
                    >
                      {obj.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["contest-grid__pagination-wrapper"]}>
              <nav className={styles["contest-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                  disabled
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles["contest-grid__page-btn"]} ${styles["contest-grid__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  3
                </button>
                <span className={styles["contest-grid__page-ellipsis"]}>
                  ..
                </span>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  12
                </button>
                <button
                  type="button"
                  className={styles["contest-grid__page-btn"]}
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 5. Benefits Section */}
        <section className={styles["contest-why"]}>
          <div className={styles["contest-why__container"]}>
            <div className={styles["contest-why__header"]}>
              <h2 className={styles["contest-why__section-title"]}>
                Tại sao nên tham gia Contest?
              </h2>
              <div className={styles["contest-why__title-line"]} />
            </div>

            <div className={styles["contest-why__list"]}>
              {contestData.benefits.map((obj, index) => (
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["contest-why__card"]} reveal-card`}>
                  <div className={styles["contest-why__icon"]}>
                    <Icon name={obj.iconName} size={24} />
                  </div>
                  <h3 className={styles["contest-why__title"]}>{obj.title}</h3>
                  <p className={styles["contest-why__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className={styles["contest-faq"]}>
          <div className={styles["contest-faq__container"]}>
            <div className={styles["contest-faq__header"]}>
              <h2 className={styles["contest-faq__section-title"]}>
                Những câu hỏi thường gặp
              </h2>
            </div>
            <div className={styles["contest-faq__accordion-group"]}>
              {contestData.faqs.map((obj, index) => (
                <details
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  open={index === 0}
                  className={styles["contest-faq__accordion"]}
                >
                  <summary className={styles["contest-faq__accordion-summary"]}>
                    <span className={styles["contest-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["contest-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className={styles["contest-faq__accordion-details"]}>
                    <p>{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contest;
