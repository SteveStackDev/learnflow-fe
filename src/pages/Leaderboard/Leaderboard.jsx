import { useState, useEffect, useRef, useMemo } from "react";

// Data
import { leaderboardData } from "./data";

// Import CSS Modules
import styles from "./Leaderboard.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const TIME_OPTIONS = [
  { id: "this-week", label: "Tuần này" },
  { id: "this-month", label: "Tháng này" },
  { id: "all-time", label: "Tất cả thời gian" },
];

const ITEMS_PER_PAGE = 5;

function Leaderboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTime, setSelectedTime] = useState(TIME_OPTIONS[0]);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const timeDropdownRef = useRef(null);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

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

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return leaderboardData.rankings
      .filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const selectedCategory = leaderboardData.tabs[activeTab];
        const matchesCategory =
          activeTab === 0 || selectedCategory === "Tổng xếp hạng" || item.category === selectedCategory;
        const matchesTimeframe =
          selectedTime.id === "all-time" || item.timeframe === selectedTime.id || !item.timeframe;
        return matchesSearch && matchesCategory && matchesTimeframe;
      })
      .sort((a, b) => (b.exp || 0) - (a.exp || 0));
  }, [searchQuery, activeTab, selectedTime]);

  // Reset page when search or timeframe changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTime]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  return (
    <>
      <div className={styles.leaderboardpage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["leaderboardpage__orb-1"]} />
        <div className={styles["leaderboardpage__orb-2"]} />
        <div className={styles["leaderboardpage__orb-3"]} />
        <div className={styles["leaderboardpage__orb-4"]} />

        {/* 1. Hero Section */}
        <section className={styles["board-hero"]}>
          <div className={styles["board-hero__container"]}>
            <div className={styles["board-hero__content"]}>
              <div className={styles["board-hero__badge-wrap"]}>
                <span className={styles["board-hero__tag"]}>
                  <Icon name="Book" size={16} />
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
              {leaderboardData.podium.map((obj) => (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
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
                      key={item.id || item.slug || item.name || item.title || item}
                      type="button"
                      onClick={() => handleTabChange(index)}
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
                        <Icon name="ChevronDown" size={16} />
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
                                <Icon name="Check" size={14} strokeWidth={3} />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles["board-filters__search-box"]}>
                    <span className={styles["board-filters__search-icon"]}>
                      <Icon name="Search" size={16} />
                    </span>
                    <input
                      id="leaderboard-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm người dùng..."
                      aria-label="Tìm người dùng"
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
                  {filteredAndSortedItems.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <EmptyState
                          iconName="Search"
                          title="Không tìm thấy người dùng"
                          description="Không có ai trong bảng xếp hạng khớp với từ khóa của bạn."
                          actionLabel="Xóa tìm kiếm"
                          onAction={() => {
                            setSearchQuery("");
                            setActiveTab(0);
                          }}
                        />
                      </td>
                    </tr>
                  ) : (
                    displayedItems.map((obj) => (
                      <tr
                        key={obj.id || obj.slug || obj.name || obj.title || obj}
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
                                <Icon name="TrendingUp" size={16} />
                              </span>
                            )}
                            {obj.trend === "down" && (
                              <span className={styles["board-ranking__trend-icon--down"]}>
                                <Icon name="TrendingDown" size={16} />
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Dynamic Pagination Controls */}
            {filteredAndSortedItems.length > 0 && (
              <div className={styles["board-ranking__pagination-wrapper"]}>
                <nav className={styles["board-ranking__pagination"]}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={styles["board-ranking__page-btn"]}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles["board-ranking__page-btn"]} ${
                        currentPage === pageNum ? styles["board-ranking__page-btn--active"] : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={styles["board-ranking__page-btn"]}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </nav>
              </div>
            )}
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
              {leaderboardData.guides.map((obj) => (
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["board-guide__card"]} reveal-card`}>
                  <div className={styles["board-guide__icon"]}>
                    <Icon name={obj.iconName} size={22} />
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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  open={index === 0}
                  className={styles["board-faq__accordion"]}
                >
                  <summary className={styles["board-faq__accordion-summary"]}>
                    <span className={styles["board-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["board-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
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
