import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import styles from "./ContestGrid.module.css";

function ContestGrid({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  setCurrentPage,
  totalPages,
  setSearchQuery,
  setActiveTab,
}) {
  return (
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
                      loading="lazy"
                      decoding="async"
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
  );
}

export default ContestGrid;
