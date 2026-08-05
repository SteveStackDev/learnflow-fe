import { useState, useEffect, useMemo } from "react";

// Data
import { contestData } from "./data";

// Import CSS Modules
import styles from "./Contest.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const ITEMS_PER_PAGE = 6; // 2 clean rows of 3 cards!

function Contest() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return contestData.items.filter((item) => {
      const selectedTab = contestData.tabs[activeTab];
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.statusLabel.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 0 || selectedTab === "Tất cả cuộc thi") return matchesSearch;
      if (selectedTab === "Đang diễn ra" || selectedTab === "Đang mở") {
        return matchesSearch && item.statusLabel.includes("ĐANG MỞ");
      }
      if (selectedTab === "Sắp diễn ra") {
        return matchesSearch && item.statusLabel.includes("SẮP DIỄN RA");
      }
      if (selectedTab === "Đã kết thúc") {
        return matchesSearch && item.statusLabel.includes("ĐÃ KẾT THÚC");
      }
      return matchesSearch;
    });
  }, [searchQuery, activeTab]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

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
                  <Icon name="Star" size={18} />
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
                  <Icon name="Book" size={16} />
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
                      {obj.title === "Tổng Contest" ? filteredAndSortedItems.length : obj.value}
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
                    id="contest-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm contest bạn muốn tham gia..."
                    aria-label="Tìm contest bạn muốn tham gia"
                    className={styles["contest-filters__search-input"]}
                  />
                </div>

                <div className={styles["contest-filters__tab-group"]}>
                  {contestData.tabs.map((item, index) => (
                    <button
                      key={item.id || item.slug || item.name || item.title || item}
                      type="button"
                      onClick={() => handleTabChange(index)}
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
            {filteredAndSortedItems.length === 0 ? (
              <EmptyState
                iconName="Search"
                title="Không tìm thấy cuộc thi phù hợp"
                description="Không có cuộc thi nào khớp với từ khóa tìm kiếm của bạn."
                actionLabel="Xóa tìm kiếm"
                onAction={() => {
                  setSearchQuery("");
                  setActiveTab(0);
                }}
              />
            ) : (
              <div className={styles["contest-grid__list-wrapper"]}>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`${styles["contest-grid__side-nav-btn"]} ${styles["contest-grid__side-nav-btn--prev"]}`}
                  title="Quay lại trang trước"
                  aria-label="Quay lại trang trước"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>

                <div className={styles["contest-grid__list"]}>
                  {displayedItems.map((obj) => (
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
                            <Icon name="Calendar" size={16} />
                            {obj.time}
                          </span>
                          <span className={styles["contest-grid__meta-item"]}>
                            <Icon name="Clock" size={15} />
                            {obj.duration}
                          </span>
                          <span className={styles["contest-grid__meta-item"]}>
                            <Icon name="Users" size={16} />
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

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`${styles["contest-grid__side-nav-btn"]} ${styles["contest-grid__side-nav-btn--next"]}`}
                  title="Tiến tới trang sau"
                  aria-label="Tiến tới trang sau"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </div>
            )}

            {/* Dynamic Pagination Controls */}
            {filteredAndSortedItems.length > 0 && (
              <div className={styles["contest-grid__pagination-wrapper"]}>
                <nav className={styles["contest-grid__pagination"]}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={styles["contest-grid__page-btn"]}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles["contest-grid__page-btn"]} ${
                        currentPage === pageNum ? styles["contest-grid__page-btn--active"] : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={styles["contest-grid__page-btn"]}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </nav>
              </div>
            )}
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
              {contestData.benefits.map((obj) => (
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
