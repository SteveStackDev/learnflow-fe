import { useState, useEffect, useRef } from "react";
// Data
import { roadmapData } from "./data";

// Images
import heroUrl from "~/assets/images/Home/hero.webp";

// Import CSS Modules
import styles from "./Roadmap.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const LEVEL_OPTIONS = [
  { id: "all", label: "Tất cả trình độ" },
  { id: "beginner", label: "Mới bắt đầu (Beginner)" },
  { id: "intermediate", label: "Trung cấp (Intermediate)" },
  { id: "advanced", label: "Nâng cao (Advanced)" },
];

function Roadmap() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

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


  // Intersection Observer for scroll animations (Staggered)
  useScrollReveal();


  return (
    <>
      <div className={styles.roadmappage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["roadmappage__orb-1"]} />
        <div className={styles["roadmappage__orb-2"]} />
        <div className={styles["roadmappage__orb-3"]} />
        <div className={styles["roadmappage__orb-4"]} />



        {/* 1. Hero Section */}
        <section className={styles["roadmap-hero"]}>
          <div className={styles["roadmap-hero__container"]}>
            <div className={styles["roadmap-hero__content"]}>
              <div className={styles["roadmap-hero__left"]}>
                <div className={styles["roadmap-hero__badge-wrap"]}>
                  <span className={styles["roadmap-hero__badge"]}>
                    <Icon name="Clock" size={16} />
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
                    <Icon name="ArrowRight" size={18} strokeWidth={2.5} />
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

        {/* 1.5 Milestone Progress Tracker */}
        <section className={styles["roadmap-progress"]}>
          <div className={styles["roadmap-progress__container"]}>
            <div className={styles["roadmap-progress__header"]}>
              <h2 className={styles["roadmap-progress__title"]}>Tiến trình học tập của bạn</h2>
              <span className={styles["roadmap-progress__percentage"]}>45%</span>
            </div>
            <div className={styles["roadmap-progress__bar-bg"]}>
              <div className={styles["roadmap-progress__bar-fill"]} style={{ width: "45%" }}></div>
            </div>
            <div className={styles["roadmap-progress__milestones"]}>
              <div className={`${styles["roadmap-progress__milestone"]} ${styles["roadmap-progress__milestone--completed"]}`}>
                <div className={styles["roadmap-progress__dot"]}>✓</div>
                <span>Tân binh</span>
              </div>
              <div className={`${styles["roadmap-progress__milestone"]} ${styles["roadmap-progress__milestone--current"]}`}>
                <div className={styles["roadmap-progress__dot"]}></div>
                <span>Thực tập sinh</span>
              </div>
              <div className={styles["roadmap-progress__milestone"]}>
                <div className={styles["roadmap-progress__dot"]}></div>
                <span>Lập trình viên</span>
              </div>
              <div className={styles["roadmap-progress__milestone"]}>
                <div className={styles["roadmap-progress__dot"]}></div>
                <span>Chuyên gia</span>
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
                  <Icon name="Search" size={18} />
                </span>
                <input
                  id="roadmap-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm vị trí công nghệ bạn muốn theo đuổi..."
                  aria-label="Tìm vị trí công nghệ bạn muốn theo đuổi"
                  className={styles["roadmap-filters__search-input"]}
                />
              </div>
              <span className={styles["roadmap-filters__stats"]}>
                <Icon name="Layers" size={22} strokeWidth={2.5} />
                {roadmapData.totalCountText}
              </span>
            </div>

            <div className={styles["roadmap-filters__controls-row"]}>
              <div className={styles["roadmap-filters__tab-group"]}>
                {roadmapData.tabs.map((item, index) => (
                  <button
                    key={item.id || item.slug || item.name || item.title || item}
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
                      <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
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
                              <Icon name="Check" size={15} strokeWidth={3} />
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

        {/* 4. Roadmap Cards Grid Section */}
        <section className={styles["roadmap-cards"]}>
          <div className={styles["roadmap-cards__container"]}>
            {roadmapData.items.filter((item) => {
              const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.description.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesSearch;
            }).length === 0 ? (
              <EmptyState
                iconName="Search"
                title="Không tìm thấy lộ trình phù hợp"
                description="Không có lộ trình học nào khớp với từ khóa tìm kiếm của bạn."
                actionLabel="Xóa bộ lọc"
                onAction={() => {
                  setSearchQuery("");
                  setActiveTab(0);
                }}
              />
            ) : (
              <div className={styles["roadmap-cards__list"]}>
                {roadmapData.items.filter((item) => {
                  const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesSearch;
                }).map((card) => (
                  <div key={card.id || card.slug || card.name || card.title || card} className={`${styles["roadmap-cards__card"]} reveal-card`}>
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
                      {card.tags.map((item) => (
                        <span
                          key={item.id || item.name || item}
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
            )}

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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["roadmap-suggestions__card"]} reveal-card`}
                >
                  <div className={styles["roadmap-suggestions__icon-wrapper"]}>
                    <Icon name={obj.iconName} size={24} />
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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
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
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
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
