import { useState, useEffect, useRef } from "react";
// Data
import { roadmapData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Roadmap.module.css";

const LEVEL_OPTIONS = [
  { id: "all", label: "Tất cả trình độ" },
  { id: "beginner", label: "Mới bắt đầu (Beginner)" },
  { id: "intermediate", label: "Trung cấp (Intermediate)" },
  { id: "advanced", label: "Nâng cao (Advanced)" },
];

function Roadmap() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className={styles.roadmappage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["roadmappage__orb-1"]} />
        <div className={styles["roadmappage__orb-2"]} />



        {/* 1. Hero Section */}
        <section className={styles["roadmap-hero"]}>
          <div className={styles["roadmap-hero__container"]}>
            <div className={styles["roadmap-hero__content"]}>
              <div className={styles["roadmap-hero__left"]}>
                <div className={styles["roadmap-hero__badge-wrap"]}>
                  <span className={styles["roadmap-hero__badge"]}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                    Định hướng tương lai
                  </span>
                </div>
                <h1 className={styles["roadmap-hero__title"]}>
                  Lộ Trình Nghề Nghiệp{" "}
                  <span className={styles["roadmap-hero__title--highlight"]}>
                    Công Nghệ
                  </span>
                </h1>
                <p className={styles["roadmap-hero__desc"]}>
                  Không còn lạc lối giữa hàng nghìn công nghệ. Chúng tôi cung
                  cấp bản đồ học tập chi tiết từ con số 0 đến khi bạn sẵn sàng
                  cho công việc mơ ước.
                </p>
                <div className={styles["roadmap-hero__btn-group"]}>
                  <button
                    type="button"
                    className={`${styles["roadmap-hero__btn"]} ${styles["roadmap-hero__btn--contained"]}`}
                  >
                    <span>Khám phá ngay</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`${styles["roadmap-hero__btn"]} ${styles["roadmap-hero__btn--outlined"]}`}
                  >
                    Tư vấn lộ trình
                  </button>
                </div>
              </div>

              <div className={styles["roadmap-hero__right"]}>
                <div className={styles["roadmap-hero__img-frame"]}>
                  <img
                    className={styles["roadmap-hero__img"]}
                    src={heroUrl}
                    alt="Hero Roadmap Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Search & Filter Section */}
        <section className={styles["roadmap-filters"]}>
          <div className={styles["roadmap-filters__container"]}>
            <div className={styles["roadmap-filters__header"]}>
              <h2 className={styles["roadmap-filters__subtitle"]}>
                Lựa chọn con đường của bạn
              </h2>
            </div>

            <div className={styles["roadmap-filters__search-row"]}>
              <div className={styles["roadmap-filters__search-wrapper"]}>
                <span className={styles["roadmap-filters__search-icon"]}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Tìm vị trí công nghệ bạn muốn theo đuổi..."
                  className={styles["roadmap-filters__search-input"]}
                />
              </div>
              <span className={styles["roadmap-filters__stats"]}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                {roadmapData.totalCountText}
              </span>
            </div>

            <div className={styles["roadmap-filters__controls-row"]}>
              <div className={styles["roadmap-filters__tab-group"]}>
                {roadmapData.tabs.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`${styles["roadmap-filters__tab-btn"]} ${
                      activeTab === index
                        ? styles["roadmap-filters__tab-btn--active"]
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Custom Modern Dropdown Component */}
              <div className={styles["roadmap-filters__select-wrapper"]} ref={dropdownRef}>
                <span className={styles["roadmap-filters__select-label"]}>
                  Hiển thị theo:
                </span>
                
                <div className={styles["roadmap-filters__dropdown-container"]}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${styles["roadmap-filters__dropdown-btn"]} ${
                      isDropdownOpen ? styles["roadmap-filters__dropdown-btn--open"] : ""
                    }`}
                  >
                    <span>{selectedLevel.label}</span>
                    <span className={styles["roadmap-filters__dropdown-chevron"]}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className={styles["roadmap-filters__dropdown-menu"]}>
                      {LEVEL_OPTIONS.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => {
                            setSelectedLevel(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`${styles["roadmap-filters__dropdown-item"]} ${
                            selectedLevel.id === option.id
                              ? styles["roadmap-filters__dropdown-item--selected"]
                              : ""
                          }`}
                        >
                          <span>{option.label}</span>
                          {selectedLevel.id === option.id && (
                            <span className={styles["roadmap-filters__dropdown-check"]}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Cards Section */}
        <section className={styles["roadmap-cards"]}>
          <div className={styles["roadmap-cards__container"]}>
            <div className={styles["roadmap-cards__list"]}>
              {roadmapData.items.map((card, index) => (
                <div key={index} className={styles["roadmap-cards__card"]}>
                  {card.statusLabel && (
                    <span
                      className={`${styles["roadmap-cards__card-badge"]} ${
                        card.statusLabel === "HOT"
                          ? styles["roadmap-cards__card-badge--hot"]
                          : styles["roadmap-cards__card-badge--new"]
                      }`}
                    >
                      {card.statusLabel}
                    </span>
                  )}
                  <div className={styles["roadmap-cards__card-media-wrap"]}>
                    <img
                      className={styles["roadmap-cards__card-media"]}
                      src={heroUrl}
                      alt={card.title}
                    />
                  </div>
                  <div className={styles["roadmap-cards__card-content"]}>
                    <h3 className={styles["roadmap-cards__card-title"]}>
                      {card.title}
                    </h3>
                    <p className={styles["roadmap-cards__card-desc"]}>
                      {card.description}
                    </p>

                    <div className={styles["roadmap-cards__card-tags"]}>
                      {card.tags.map((item, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={styles["roadmap-cards__tag-chip"]}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles["roadmap-cards__card-actions"]}>
                    <button
                      type="button"
                      className={styles["roadmap-cards__card-btn"]}
                    >
                      <span>{card.actionText}</span>
                      <span className={styles["roadmap-cards__card-btn-arrow"]}>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles["roadmap-cards__pagination-wrapper"]}>
              <nav className={styles["roadmap-cards__pagination"]}>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                  disabled
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={`${styles["roadmap-cards__page-btn"]} ${styles["roadmap-cards__page-btn--active"]}`}
                >
                  1
                </button>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  2
                </button>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  3
                </button>
                <span className={styles["roadmap-cards__page-dots"]}>..</span>
                <button
                  type="button"
                  className={styles["roadmap-cards__page-btn"]}
                >
                  ›
                </button>
              </nav>
            </div>
          </div>
        </section>

        {/* 4. Orientation Suggestion Section */}
        <section className={styles["roadmap-suggestions"]}>
          <div className={styles["roadmap-suggestions__container"]}>
            <div className={styles["roadmap-suggestions__header"]}>
              <h2 className={styles["roadmap-suggestions__section-title"]}>
                Không biết bắt đầu từ đâu?
              </h2>
              <p className={styles["roadmap-suggestions__section-subtitle"]}>
                Đừng lo lắng, hãy chọn lĩnh vực mà bạn cảm thấy hứng thú nhất.
                Chúng tôi sẽ gợi ý hướng đi phù hợp.
              </p>
            </div>

            <div className={styles["roadmap-suggestions__list"]}>
              {roadmapData.suggestions.map((obj, index) => (
                <div
                  key={index}
                  className={styles["roadmap-suggestions__card"]}
                >
                  <div className={styles["roadmap-suggestions__icon-wrapper"]}>
                    {(obj.iconName === "IconEye" || index === 0) && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.67-.75 1.67-1.67 0-.42-.16-.8-.43-1.08-.27-.28-.44-.67-.44-1.1 0-.92.75-1.67 1.67-1.67H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"/>
                      </svg>
                    )}
                    {(obj.iconName === "IconCode" || index === 1) && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    )}
                    {(obj.iconName === "IconDatabase" || index === 2) && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                    )}
                    {(obj.iconName === "IconLayers" || index === 3) && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    )}
                  </div>
                  <h3 className={styles["roadmap-suggestions__title"]}>
                    {obj.title}
                  </h3>
                  <p className={styles["roadmap-suggestions__desc"]}>
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section className={styles["roadmap-faq"]}>
          <div className={styles["roadmap-faq__container"]}>
            <div className={styles["roadmap-faq__header"]}>
              <h2 className={styles["roadmap-faq__section-title"]}>
                Câu hỏi thường gặp
              </h2>
              <p className={styles["roadmap-faq__section-subtitle"]}>
                Giải đáp những thắc mắc phổ biến khi chọn lộ trình học tập.
              </p>
            </div>

            <div className={styles["roadmap-faq__accordion-group"]}>
              {roadmapData.faqs.map((obj, index) => (
                <details
                  key={index}
                  open={index === 0}
                  className={styles["roadmap-faq__accordion"]}
                >
                  <summary
                    className={styles["roadmap-faq__accordion-summary"]}
                  >
                    <span className={styles["roadmap-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["roadmap-faq__accordion-icon"]}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </summary>
                  <div className={styles["roadmap-faq__accordion-details"]}>
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

export default Roadmap;
