import { useState } from "react";

// Data
import { badgeData } from "./data";

// Import CSS Modules
import styles from "./Badge.module.css";

function Badge() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.badgepage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["badgepage__orb-1"]} />
        <div className={styles["badgepage__orb-2"]} />



        {/* 1. Hero Section */}
        <section className={styles["badge-hero"]}>
          <div className={styles["badge-hero__container"]}>
            <div className={styles["badge-hero__grid"]}>
              {/* Left Content */}
              <div className={styles["badge-hero__content"]}>
                <div className={styles["badge-hero__badge-wrap"]}>
                  <span className={styles["badge-hero__tag"]}>
                    🏆 Hệ Thống Danh Hiệu & Đổi Thưởng
                  </span>
                </div>
                <h1 className={styles["badge-hero__title"]}>
                  Chinh Phục Danh Hiệu{" "}
                  <span className={styles["badge-hero__title--highlight"]}>
                    Khẳng Định Năng Lực
                  </span>
                </h1>
                <p className={styles["badge-hero__desc"]}>
                  Thu thập các huy hiệu độc quyền từ bài lab, streak học tập và các cuộc thi coding.
                  Mở khóa đặc quyền, tích lũy điểm XP và khẳng định tên tuổi trên bảng vàng LearnFlow.
                </p>
                <div className={styles["badge-hero__actions"]}>
                  <button
                    type="button"
                    className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--contained"]}`}
                  >
                    <span>Khám phá nhiệm vụ</span>
                    <span className={styles["badge-hero__btn-icon"]}>🚀</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--outlined"]}`}
                  >
                    <span>Cách kiếm Badge</span>
                    <span className={styles["badge-hero__btn-icon"]}>💡</span>
                  </button>
                </div>
              </div>

              {/* Right Gamification Showcase Card */}
              <div className={styles["badge-hero__showcase"]}>
                <div className={styles["badge-showcase__card"]}>
                  <div className={styles["badge-showcase__badge-header"]}>
                    <div className={styles["badge-showcase__medal-box"]}>
                      <span className={styles["badge-showcase__medal-emoji"]}>🥇</span>
                    </div>
                    <div className={styles["badge-showcase__badge-meta"]}>
                      <span className={styles["badge-showcase__rank-badge"]}>LEVEL 12 MASTER</span>
                      <h3 className={styles["badge-showcase__badge-name"]}>Legend Coder Badge</h3>
                    </div>
                  </div>

                  {/* XP Progress */}
                  <div className={styles["badge-showcase__xp-wrapper"]}>
                    <div className={styles["badge-showcase__xp-info"]}>
                      <span className={styles["badge-showcase__xp-label"]}>Tiến độ kinh nghiệm (XP)</span>
                      <span className={styles["badge-showcase__xp-val"]}>4,850 / 5,000 XP</span>
                    </div>
                    <div className={styles["badge-showcase__xp-bar"]}>
                      <div className={styles["badge-showcase__xp-fill"]} style={{ width: "97%" }} />
                    </div>
                  </div>

                  {/* Achievement Chips */}
                  <div className={styles["badge-showcase__chips"]}>
                    <div className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--flame"]}`}>
                      <span>🔥 7 Ngày Streak</span>
                    </div>
                    <div className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--gold"]}`}>
                      <span>⚡ Top 1% Coders</span>
                    </div>
                    <div className={`${styles["badge-showcase__chip"]} ${styles["badge-showcase__chip--emerald"]}`}>
                      <span>🎯 50+ Labs Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Overview Stats Section */}
        <section className={styles["badge-stats"]}>
          <div className={styles["badge-stats__container"]}>
            <div className={styles["badge-stats__list"]}>
              <div className={styles["badge-stats__card"]}>
                <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--blue"]}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <div className={styles["badge-stats__info"]}>
                  <span className={styles["badge-stats__label"]}>
                    Tổng danh hiệu
                  </span>
                  <span className={styles["badge-stats__value"]}>64</span>
                </div>
              </div>

              <div className={styles["badge-stats__card"]}>
                <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--yellow"]}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className={styles["badge-stats__info"]}>
                  <span className={styles["badge-stats__label"]}>
                    Đã đạt được
                  </span>
                  <span className={styles["badge-stats__value"]}>12</span>
                </div>
              </div>

              <div className={styles["badge-stats__card"]}>
                <div className={styles["badge-stats__progress-wrapper"]}>
                  <div className={styles["badge-stats__progress-info"]}>
                    <span className={styles["badge-stats__label"]}>
                      Tiến độ tổng quan
                    </span>
                    <span className={styles["badge-stats__percent"]}>18.7%</span>
                  </div>
                  {/* Custom Linear Progress */}
                  <div className={styles["badge-stats__progress-bar"]}>
                    <div
                      className={styles["badge-stats__progress-fill"]}
                      style={{ width: "18.7%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search & Filter Section */}
        <section className={styles["badge-filters"]}>
          <div className={styles["badge-filters__container"]}>
            <div className={styles["badge-filters__card-wrapper"]}>
              <div className={styles["badge-filters__row"]}>
                <div className={styles["badge-filters__search-box"]}>
                  <span className={styles["badge-filters__search-icon"]}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm badge bạn muốn chinh phục..."
                    className={styles["badge-filters__search-input"]}
                  />
                </div>

                <div className={styles["badge-filters__tab-group"]}>
                  {badgeData.tabs.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`${styles["badge-filters__tab-btn"]} ${
                        activeTab === index
                          ? styles["badge-filters__tab-btn--active"]
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

        {/* 4. Badges Cards Grid Section */}
        <section className={styles["badge-grid"]}>
          <div className={styles["badge-grid__container"]}>
            <div className={styles["badge-grid__list"]}>
              {badgeData.items.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles["badge-grid__card"]} ${
                    obj.status === "locked"
                      ? styles["badge-grid__card--locked"]
                      : ""
                  }`}
                >
                  <div className={styles["badge-grid__card-header"]}>
                    <span
                      className={`${styles["badge-grid__status-chip"]} ${
                        obj.status === "received"
                          ? styles["badge-grid__status-chip--received"]
                          : styles["badge-grid__status-chip--locked"]
                      }`}
                    >
                      {obj.badgeText}
                    </span>
                  </div>

                  <div className={styles["badge-grid__card-body"]}>
                    <div
                      className={`${styles["badge-grid__card-icon"]} ${
                        obj.status === "received"
                          ? styles["badge-grid__card-icon--active"]
                          : styles["badge-grid__card-icon--disabled"]
                      }`}
                    >
                      {index === 0 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
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
                      {index === 4 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M6 12h.01M18 12h.01" />
                        </svg>
                      )}
                      {index === 5 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      )}
                      {index === 6 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                          <path d="M4 22h16" />
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                        </svg>
                      )}
                      {index === 7 && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                      )}
                    </div>
                    <h3 className={styles["badge-grid__card-title"]}>
                      {obj.title}
                    </h3>
                    <p className={styles["badge-grid__card-desc"]}>
                      {obj.description}
                    </p>
                  </div>

                  <div className={styles["badge-grid__card-actions"]}>
                    <button
                      type="button"
                      className={`${styles["badge-grid__btn"]} ${
                        obj.status === "received"
                          ? styles["badge-grid__btn--contained"]
                          : styles["badge-grid__btn--disabled"]
                      }`}
                      disabled={obj.status === "locked"}
                    >
                      {obj.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["badge-grid__pagination-wrapper"]}>
              <nav className={styles["badge-grid__pagination"]}>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                  disabled
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles["badge-grid__page-btn"]} ${styles["badge-grid__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  3
                </button>
                <span className={styles["badge-grid__page-ellipsis"]}>..</span>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  8
                </button>
                <button
                  type="button"
                  className={styles["badge-grid__page-btn"]}
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 5. Guide Section */}
        <section className={styles["badge-guide"]}>
          <div className={styles["badge-guide__container"]}>
            <div className={styles["badge-guide__header"]}>
              <h2 className={styles["badge-guide__section-title"]}>
                Làm thế nào để kiếm Badge?
              </h2>
            </div>
            <div className={styles["badge-guide__list"]}>
              {badgeData.guides.map((obj, index) => (
                <div key={index} className={styles["badge-guide__card"]}>
                  <div className={styles["badge-guide__icon"]}>
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                  </div>
                  <h3 className={styles["badge-guide__title"]}>{obj.title}</h3>
                  <p className={styles["badge-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className={styles["badge-faq"]}>
          <div className={styles["badge-faq__container"]}>
            <div className={styles["badge-faq__header"]}>
              <h2 className={styles["badge-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
            </div>
            <div className={styles["badge-faq__accordion-group"]}>
              {badgeData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["badge-faq__accordion"]}
                >
                  <summary className={styles["badge-faq__accordion-summary"]}>
                    <span className={styles["badge-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["badge-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles["badge-faq__accordion-details"]}>
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

export default Badge;
