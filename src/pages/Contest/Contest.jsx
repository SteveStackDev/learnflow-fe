import { useEffect } from "react";
import { useState } from "react";

// Data
import { contestData } from "./data";

// Import CSS Modules
import styles from "./Contest.module.css";
// Components
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
// Hooks
import useScrollReveal from "~/hooks/useScrollReveal";

function Contest() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useScrollReveal();

  const handleTabChange = (index) => {
    setActiveTab(index);
  };


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
                    id="contest-search-input"
                    type="text"
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
            {contestData.items.filter((item) => {
              const selectedTab = contestData.tabs[activeTab];
              if (activeTab === 0 || selectedTab === "Tất cả cuộc thi") return true;
              return item.statusLabel.toLowerCase().includes(selectedTab.toLowerCase());
            }).length === 0 ? (
              <EmptyState
                iconName="Trophy"
                title="Không có cuộc thi phù hợp"
                description="Hiện tại không có cuộc thi nào trong danh mục này."
                actionLabel="Xem tất cả cuộc thi"
                onAction={() => setActiveTab(0)}
              />
            ) : (
              <div className={styles["contest-grid__list"]}>
                {contestData.items.filter((item) => {
                  const selectedTab = contestData.tabs[activeTab];
                  if (activeTab === 0 || selectedTab === "Tất cả cuộc thi") return true;
                  return item.statusLabel.toLowerCase().includes(selectedTab.toLowerCase());
                }).map((obj) => (
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
            )}

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
