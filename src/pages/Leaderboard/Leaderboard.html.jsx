import { useState, useEffect, useRef } from "react";

// Data
import { leaderboardData } from "./data";

// Import CSS Modules
import styles from "./Leaderboard.module.css";

const TIME_OPTIONS = [
  { id: "this-week", label: "Tuần này" },
  { id: "this-month", label: "Tháng này" },
  { id: "all-time", label: "Tất cả thời gian" },
];

function Leaderboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const timeDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setIsTimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
      <div className={styles.leaderboardpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["leaderboardpage__orb-1"]} />
        <div className={styles["leaderboardpage__orb-2"]} />



        {/* 1. Hero Section */}
        <section className={styles["board-hero"]}>
          <div className={styles["board-hero__container"]}>
            <div className={styles["board-hero__content"]}>
              <div className={styles["board-hero__badge-wrap"]}>
                <span className={styles["board-hero__tag"]}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                  Bảng danh vọng
                </span>
              </div>
              <h1 className={styles["board-hero__title"]}>
                Tôn vinh nỗ lực học tập không ngừng nghỉ. Nơi những nhà phát
                triển tài năng hội ngộ, thi đua và chinh phục những đỉnh cao
                công nghệ mới mỗi ngày.
              </h1>
            </div>
          </div>
        </section>

        {/* 2. Top 3 Podium Section */}
        <section className={styles["board-podium"]}>
          <div className={styles["board-podium__container"]}>
            <div className={styles["board-podium__list"]}>
              {leaderboardData.podium.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles["board-podium__item"]} ${
                    styles[`board-podium__item--rank-${obj.rank}`]
                  }`}
                >
                  {/* Top Avatar Circle */}
                  <div className={styles["board-podium__avatar-wrapper"]}>
                    <img
                      className={styles["board-podium__avatar"]}
                      src={obj.avatarUrl}
                      alt={obj.name}
                    />
                    <span className={styles["board-podium__rank-badge"]}>
                      #{obj.rank}
                    </span>
                  </div>

                  {/* User Name & Points */}
                  <div className={styles["board-podium__name"]}>{obj.name}</div>
                  <div className={styles["board-podium__points"]}>
                    {obj.points}
                  </div>

                  {/* Podium Stand Box with Medal */}
                  <div className={styles["board-podium__stand"]}>
                    <div className={styles["board-podium__medal-wrapper"]}>
                      {obj.rank === 1 && (
                        <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--gold"]}`}>
                          <span className={styles["board-podium__medal-num"]}>1</span>
                        </div>
                      )}
                      {obj.rank === 2 && (
                        <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--silver"]}`}>
                          <span className={styles["board-podium__medal-num"]}>2</span>
                        </div>
                      )}
                      {obj.rank === 3 && (
                        <div className={`${styles["board-podium__medal"]} ${styles["board-podium__medal--bronze"]}`}>
                          <span className={styles["board-podium__medal-num"]}>3</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Filter & Search Section */}
        <section className={styles["board-filters"]}>
          <div className={styles["board-filters__container"]}>
            <div className={styles["board-filters__card-wrapper"]}>
              <div className={styles["board-filters__row"]}>
                {/* Left Category Tabs */}
                <div className={styles["board-filters__tab-group"]}>
                  {leaderboardData.tabs.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`${styles["board-filters__tab-btn"]} ${
                        activeTab === index
                          ? styles["board-filters__tab-btn--active"]
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Right Controls: Custom Dropdown & Search Input */}
                <div className={styles["board-filters__controls"]}>
                  <div
                    className={styles["board-filters__select-wrapper"]}
                    ref={timeDropdownRef}
                  >
                    <button
                      type="button"
                      onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                      className={`${styles["board-filters__dropdown-btn"]} ${
                        isTimeDropdownOpen ? styles["board-filters__dropdown-btn--open"] : ""
                      }`}
                    >
                      <span>{selectedTime.label}</span>
                      <span className={styles["board-filters__dropdown-chevron"]}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {isTimeDropdownOpen && (
                      <div className={styles["board-filters__dropdown-menu"]}>
                        {TIME_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setSelectedTime(option);
                              setIsTimeDropdownOpen(false);
                            }}
                            className={`${styles["board-filters__dropdown-item"]} ${
                              selectedTime.id === option.id
                                ? styles["board-filters__dropdown-item--selected"]
                                : ""
                            }`}
                          >
                            <span>{option.label}</span>
                            {selectedTime.id === option.id && (
                              <span className={styles["board-filters__dropdown-check"]}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles["board-filters__search-box"]}>
                    <span className={styles["board-filters__search-icon"]}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Tìm người dùng..."
                      className={styles["board-filters__search-input"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Ranking Table Section */}
        <section className={styles["board-ranking"]}>
          <div className={styles["board-ranking__container"]}>
            <div className={styles["board-ranking__table-wrapper"]}>
              <table className={styles["board-ranking__table"]}>
                <thead>
                  <tr
                    className={`${styles["board-ranking__table-row"]} ${styles["board-ranking__table-row--header"]}`}
                  >
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      HẠNG
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      NGƯỜI DÙNG
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      THÀNH TÍCH
                    </th>
                    <th
                      className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--header"]}`}
                    >
                      XU HƯỚNG
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.rankings.map((obj, index) => (
                    <tr
                      key={index}
                      className={`${styles["board-ranking__table-row"]} ${
                        obj.isCurrentUser
                          ? styles["board-ranking__table-row--current-user"]
                          : ""
                      }`}
                    >
                      <td
                        className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--rank"]}`}
                      >
                        {obj.rank}
                      </td>
                      <td className={styles["board-ranking__table-cell"]}>
                        <div className={styles["board-ranking__user-info"]}>
                          {obj.isCurrentUser ? (
                            <div className={styles["board-ranking__avatar-fallback"]}>
                              B
                            </div>
                          ) : (
                            <img
                              className={styles["board-ranking__avatar"]}
                              src={obj.avatarUrl}
                              alt={obj.name}
                            />
                          )}
                          <span className={styles["board-ranking__user-name"]}>
                            {obj.name}
                          </span>
                          {obj.isCurrentUser && (
                            <span className={styles["board-ranking__chip-tag"]}>
                              CURRENT
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`${styles["board-ranking__table-cell"]} ${styles["board-ranking__table-cell--points"]}`}
                      >
                        {obj.points}
                      </td>
                      <td className={styles["board-ranking__table-cell"]}>
                        <span
                          className={`${styles["board-ranking__trend-label"]} ${
                            styles[`board-ranking__trend-label--${obj.trend}`]
                          }`}
                        >
                          {obj.trend === "up" && (
                            <span className={styles["board-ranking__trend-icon--up"]}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                              </svg>
                            </span>
                          )}
                          {obj.trend === "down" && (
                            <span className={styles["board-ranking__trend-icon--down"]}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                                <polyline points="17 18 23 18 23 12" />
                              </svg>
                            </span>
                          )}
                          {obj.trend === "same" && (
                            <span className={styles["board-ranking__trend-icon--same"]}>
                              —
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={styles["board-ranking__pagination-wrapper"]}>
              <nav className={styles["board-ranking__pagination"]}>
                <button
                  type="button"
                  className={styles["board-ranking__page-nav-btn"]}
                  disabled
                >
                  ‹ Trang trước
                </button>
                <div className={styles["board-ranking__page-numbers"]}>
                  <button
                    type="button"
                    className={`${styles["board-ranking__page-btn"]} ${styles["board-ranking__page-btn--active"]}`}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className={styles["board-ranking__page-btn"]}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className={styles["board-ranking__page-btn"]}
                  >
                    3
                  </button>
                  <span className={styles["board-ranking__page-ellipsis"]}>
                    ..
                  </span>
                  <button
                    type="button"
                    className={styles["board-ranking__page-btn"]}
                  >
                    15
                  </button>
                </div>
                <button
                  type="button"
                  className={styles["board-ranking__page-nav-btn"]}
                >
                  Trang sau ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 5. Guide Section */}
        <section className={styles["board-guide"]}>
          <div className={styles["board-guide__container"]}>
            <div className={styles["board-guide__header"]}>
              <h2 className={styles["board-guide__section-title"]}>
                Làm thế nào để leo hạng?
              </h2>
            </div>
            <div className={styles["board-guide__list"]}>
              {leaderboardData.guides.map((obj, index) => (
                <div key={index} className={`${styles["board-guide__card"]} reveal-card`}>
                  <div className={styles["board-guide__icon"]}>
                    {index === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19.439 7.85c-.049-.322-.059-.64-.094-.962a3.567 3.567 0 0 0-3.535-3.238c-.322-.035-.64-.045-.962-.094a3.567 3.567 0 0 0-3.848-3.535 3.567 3.567 0 0 0-3.848 3.535c-.322.049-.64.059-.962.094a3.567 3.567 0 0 0-3.238 3.535c-.035.322-.045.64-.094.962a3.567 3.567 0 0 0 3.535 3.848c.049.322.059.64.094.962a3.567 3.567 0 0 0 3.238 3.535c.322.035.64.045.962.094a3.567 3.567 0 0 0 3.848 3.535 3.567 3.567 0 0 0 3.848-3.535c.322-.049.64-.059.962-.094a3.567 3.567 0 0 0 3.238-3.535c.035-.322.045-.64.094-.962a3.567 3.567 0 0 0-3.535-3.848z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                        <line x1="8" y1="2" x2="8" y2="18" />
                        <line x1="16" y1="6" x2="16" y2="22" />
                      </svg>
                    )}
                  </div>
                  <h3 className={styles["board-guide__title"]}>{obj.title}</h3>
                  <p className={styles["board-guide__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Section */}
        <section className={styles["board-faq"]}>
          <div className={styles["board-faq__container"]}>
            <div className={styles["board-faq__header"]}>
              <h2 className={styles["board-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
            </div>
            <div className={styles["board-faq__accordion-group"]}>
              {leaderboardData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["board-faq__accordion"]}
                >
                  <summary className={styles["board-faq__accordion-summary"]}>
                    <span className={styles["board-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["board-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles["board-faq__accordion-details"]}>
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

export default Leaderboard;
