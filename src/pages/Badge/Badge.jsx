import { useState, useEffect, useMemo } from "react";

// Data
import { badgeData } from "./data";

// Import CSS Modules
import styles from "./Badge.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

const ITEMS_PER_PAGE = 8; // 2 clean rows of 4 cards (8 badges per page)!

function Badge() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1);
  };

  const itemsPerPage = isMobile ? 4 : 8;

  // Filter Logic
  const filteredAndSortedItems = useMemo(() => {
    return badgeData.items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const selectedTab = badgeData.tabs[activeTab];
      const matchesTab =
        activeTab === 0 ||
        selectedTab === "Tất cả" ||
        selectedTab === "Tất cả huy hiệu" ||
        ((selectedTab === "Đã đạt được" || selectedTab === "Đã nhận") && item.status === "received") ||
        ((selectedTab === "Chưa đạt được" || selectedTab === "Chưa nhận") && item.status === "locked");
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / itemsPerPage));
  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  const receivedCount = badgeData.items.filter((i) => i.status === "received").length;
  const progressPercent = ((receivedCount / badgeData.items.length) * 100).toFixed(1);

  return (
    <>
      <div className={styles.badgepage}>
        {/* Ambient Background Glow Orbs */}
        <div className={styles["badgepage__orb-1"]} />
        <div className={styles["badgepage__orb-2"]} />
        <div className={styles["badgepage__orb-3"]} />
        <div className={styles["badgepage__orb-4"]} />

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
                    <Icon name="ArrowRight" size={18} strokeWidth={2.5} />
                    <span>Khám phá nhiệm vụ</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles["badge-hero__btn"]} ${styles["badge-hero__btn--outlined"]}`}
                  >
                    <Icon name="Book" size={16} />
                    <span>Cách kiếm Badge</span>
                  </button>
                </div>
              </div>

              {/* Right Gamification Showcase Card */}
              <div className={styles["badge-hero__showcase"]}>
                <div className={`${styles["badge-showcase__card"]} reveal-card`}>
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
              <div className={`${styles["badge-stats__card"]} reveal-card`}>
                <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--blue"]}`}>
                  <Icon name="Award" size={20} />
                </div>
                <div className={styles["badge-stats__info"]}>
                  <span className={styles["badge-stats__label"]}>
                    Tổng danh hiệu
                  </span>
                  <span className={styles["badge-stats__value"]}>{badgeData.items.length}</span>
                </div>
              </div>

              <div className={`${styles["badge-stats__card"]} reveal-card`}>
                <div className={`${styles["badge-stats__icon"]} ${styles["badge-stats__icon--yellow"]}`}>
                  <Icon name="Trophy" size={20} />
                </div>
                <div className={styles["badge-stats__info"]}>
                  <span className={styles["badge-stats__label"]}>
                    Đã đạt được
                  </span>
                  <span className={styles["badge-stats__value"]}>{receivedCount}</span>
                </div>
              </div>

              <div className={`${styles["badge-stats__card"]} reveal-card`}>
                <div className={styles["badge-stats__progress-wrapper"]}>
                  <div className={styles["badge-stats__progress-info"]}>
                    <span className={styles["badge-stats__label"]}>
                      Tiến độ tổng quan
                    </span>
                    <span className={styles["badge-stats__percent"]}>{progressPercent}%</span>
                  </div>
                  {/* Custom Linear Progress */}
                  <div className={styles["badge-stats__progress-bar"]}>
                    <div
                      className={styles["badge-stats__progress-fill"]}
                      style={{ width: `${progressPercent}%` }}
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
                    <Icon name="Search" size={18} />
                  </span>
                  <input
                    id="badge-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm badge bạn muốn chinh phục..."
                    aria-label="Tìm badge bạn muốn chinh phục"
                    className={styles["badge-filters__search-input"]}
                  />
                </div>

                <div className={styles["badge-filters__tab-group"]}>
                  {badgeData.tabs.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleTabChange(index)}
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
            {filteredAndSortedItems.length === 0 ? (
              <EmptyState
                iconName="Search"
                title="Không tìm thấy huy hiệu phù hợp"
                description="Không có huy hiệu nào khớp với từ khóa tìm kiếm hoặc danh mục của bạn."
                actionLabel="Xóa tìm kiếm"
                onAction={() => {
                  setSearchQuery("");
                  setActiveTab(0);
                }}
              />
            ) : (
              <div className={styles["badge-grid__list-wrapper"]}>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`${styles["badge-grid__side-nav-btn"]} ${styles["badge-grid__side-nav-btn--prev"]}`}
                  title="Quay lại trang trước"
                  aria-label="Quay lại trang trước"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>

                <div className={styles["badge-grid__list"]}>
                  {displayedItems.map((obj, index) => (
                    <div
                      key={obj.id}
                      className={`${styles["badge-grid__card"]} reveal-card ${
                        obj.status === "locked"
                          ? styles["badge-grid__card--locked"]
                          : ""
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
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
                          <Icon name={obj.iconName} size={24} />
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

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`${styles["badge-grid__side-nav-btn"]} ${styles["badge-grid__side-nav-btn--next"]}`}
                  title="Tiến tới trang sau"
                  aria-label="Tiến tới trang sau"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </div>
            )}

            {/* Dynamic Pagination Controls */}
            {filteredAndSortedItems.length > 0 && (
              <div className={styles["badge-grid__pagination-wrapper"]}>
                <nav className={styles["badge-grid__pagination"]}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={styles["badge-grid__page-btn"]}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`${styles["badge-grid__page-btn"]} ${
                        currentPage === pageNum ? styles["badge-grid__page-btn--active"] : ""
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={styles["badge-grid__page-btn"]}
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
        <section className={styles["badge-guide"]}>
          <div className={styles["badge-guide__container"]}>
            <div className={styles["badge-guide__header"]}>
              <h2 className={styles["badge-guide__section-title"]}>
                Làm thế nào để kiếm Badge?
              </h2>
            </div>
            <div className={styles["badge-guide__list"]}>
              {badgeData.guides.map((obj) => (
                <div key={obj.id} className={`${styles["badge-guide__card"]} reveal-card`}>
                  <div className={styles["badge-guide__icon"]}>
                    <Icon name={obj.iconName} size={24} />
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
                  key={obj.id}
                  open={index === 0}
                  className={styles["badge-faq__accordion"]}
                >
                  <summary className={styles["badge-faq__accordion-summary"]}>
                    <span className={styles["badge-faq__accordion-title"]}>
                      {obj.question}
                    </span>
                    <span className={styles["badge-faq__accordion-icon"]}>
                      <Icon name="ChevronDown" size={18} strokeWidth={2.5} />
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
