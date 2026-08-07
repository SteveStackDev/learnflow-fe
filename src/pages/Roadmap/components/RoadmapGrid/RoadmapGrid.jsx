import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./RoadmapGrid.module.css";

function RoadmapGrid({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  setCurrentPage,
  totalPages,
  setSearchQuery,
  setActiveTab,
  setSelectedLevel,
  LEVEL_OPTIONS,
}) {
  return (
    <section className={styles["roadmap-cards"]}>
      <div className={styles["roadmap-cards__container"]}>
        {filteredAndSortedItems.length === 0 ? (
          <EmptyState
            iconName="Search"
            title="Không tìm thấy lộ trình phù hợp"
            description="Không có lộ trình học nào khớp với từ khóa tìm kiếm của bạn."
            actionLabel="Xóa tìm kiếm"
            onAction={() => {
              setSearchQuery("");
              setActiveTab(0);
              setSelectedLevel(LEVEL_OPTIONS[0]);
            }}
          />
        ) : (
          <div className={styles["roadmap-cards__list-wrapper"]}>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`${styles["roadmap-cards__side-nav-btn"]} ${styles["roadmap-cards__side-nav-btn--prev"]}`}
              title="Quay lại trang trước"
              aria-label="Quay lại trang trước"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <div className={styles["roadmap-cards__list"]}>
              {displayedItems.map((card) => (
                <div key={card.id} className={`${styles["roadmap-cards__card"]} reveal-card`}>
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
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles["roadmap-cards__card-content"]}>
                    <div className={styles["roadmap-cards__card-header"]}>
                      <h3 className={styles["roadmap-cards__card-title"]}>{card.title}</h3>
                      <span className={styles["roadmap-cards__views-count"]}>
                        <Icon name="Eye" size={14} />
                        {card.viewsNum ? card.viewsNum.toLocaleString("vi-VN") : "0"} lượt xem
                      </span>
                    </div>
                    <p className={styles["roadmap-cards__card-desc"]}>{card.description}</p>

                    <div className={styles["roadmap-cards__card-tags"]}>
                      {card.tags.map((item) => (
                        <span key={item} className={styles["roadmap-cards__tag-chip"]}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles["roadmap-cards__card-actions"]}>
                    <button type="button" className={styles["roadmap-cards__card-btn"]}>
                      <span>{card.actionText}</span>
                      <span className={styles["roadmap-cards__card-btn-arrow"]}>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`${styles["roadmap-cards__side-nav-btn"]} ${styles["roadmap-cards__side-nav-btn--next"]}`}
              title="Tiến tới trang sau"
              aria-label="Tiến tới trang sau"
            >
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        )}

        {/* Dynamic Pagination Controls */}
        {filteredAndSortedItems.length > 0 && (
          <div className={styles["roadmap-cards__pagination-wrapper"]}>
            <nav className={styles["roadmap-cards__pagination"]}>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={styles["roadmap-cards__page-btn"]}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`${styles["roadmap-cards__page-btn"]} ${
                    currentPage === pageNum ? styles["roadmap-cards__page-btn--active"] : ""
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={styles["roadmap-cards__page-btn"]}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

export default RoadmapGrid;
