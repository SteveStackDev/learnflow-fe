import { useEffect } from "react";
import { useState } from "react";

// Data
import { badgeData } from "./data";

// Import CSS Modules
import styles from "./Badge.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { SkeletonCard } from "~/components/Skeleton/Skeleton.jsx";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

function Badge() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };


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
                  <span className={styles["badge-stats__value"]}>64</span>
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
                  <span className={styles["badge-stats__value"]}>12</span>
                </div>
              </div>

              <div className={`${styles["badge-stats__card"]} reveal-card`}>
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
                      key={item.id || item.slug || item.name || item.title || item}
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
            {isLoading ? (
              <div className={styles["badge-grid__list"]}>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : badgeData.items.filter((item) => {
              const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.description.toLowerCase().includes(searchQuery.toLowerCase());
              const selectedTab = badgeData.tabs[activeTab];
              const matchesTab = activeTab === 0 || selectedTab === "Tất cả huy hiệu" ||
                                (selectedTab === "Đã đạt được" && item.status === "received") ||
                                (selectedTab === "Chưa đạt được" && item.status === "locked");
              return matchesSearch && matchesTab;
            }).length === 0 ? (
              <EmptyState
                iconName="Award"
                title="Không tìm thấy huy hiệu phù hợp"
                description="Không có huy hiệu nào khớp với từ khóa tìm kiếm hoặc danh mục của bạn."
                actionLabel="Xóa bộ lọc"
                onAction={() => {
                  setSearchQuery("");
                  setActiveTab(0);
                }}
              />
            ) : (
              <div className={styles["badge-grid__list"]}>
                {badgeData.items.filter((item) => {
                  const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
                  const selectedTab = badgeData.tabs[activeTab];
                  const matchesTab = activeTab === 0 || selectedTab === "Tất cả huy hiệu" ||
                                    (selectedTab === "Đã đạt được" && item.status === "received") ||
                                    (selectedTab === "Chưa đạt được" && item.status === "locked");
                  return matchesSearch && matchesTab;
                }).map((obj) => (
                  <div
                    key={obj.id || obj.slug || obj.name || obj.title || obj}
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
            )}

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
                <div key={obj.id || obj.slug || obj.name || obj.title || obj} className={`${styles["badge-guide__card"]} reveal-card`}>
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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
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
