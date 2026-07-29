import { useState } from "react";

// Data
import { contestData } from "./data";

// Import CSS Modules
import styles from "./Contest.module.css";

function Contest() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.contestpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["contestpage__orb-1"]} />
        <div className={styles["contestpage__orb-2"]} />



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
                <div key={index} className={styles["contest-stats__card"]}>
                  <div
                    className={`${styles["contest-stats__icon"]} ${
                      index === 0
                        ? styles["contest-stats__icon--blue"]
                        : index === 1
                        ? styles["contest-stats__icon--yellow"]
                        : styles["contest-stats__icon--purple"]
                    }`}
                  >
                    {index === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
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
                      key={index}
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
                <div key={index} className={styles["contest-grid__card"]}>
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
                <div key={index} className={styles["contest-why__card"]}>
                  <div className={styles["contest-why__icon"]}>
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="7" />
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                      </svg>
                    )}
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
                  key={index}
                  open={index === 0}
                  className={styles["contest-faq__accordion"]}
                >
                  <summary className={styles["contest-faq__accordion-summary"]}>
                    <span className={styles["contest-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["contest-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
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
