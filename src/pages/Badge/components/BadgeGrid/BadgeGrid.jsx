import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
import styles from "./BadgeGrid.module.css";

function BadgeGrid({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  totalPages,
  setCurrentPage,
  onResetSearch,
}) {
  const navigate = useNavigate();

  return (
    <section className={styles["badge-grid"]}>
      <div className={styles["badge-grid__container"]}>
        {filteredAndSortedItems.length === 0 ? (
          <EmptyState
            iconName="Search"
            title="Không tìm thấy huy hiệu phù hợp"
            description="Không có huy hiệu nào khớp với từ khóa tìm kiếm hoặc danh mục của bạn."
            actionLabel="Xóa tìm kiếm"
            onAction={onResetSearch}
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
              {displayedItems.map((obj, index) => {
                const isEarned =
                  obj.status === "received" ||
                  obj.status === "unlocked" ||
                  Boolean(obj.isEarned);

                const badgeName = obj.name || obj.title || "Danh hiệu FySet";
                const iconName = obj.icon || obj.iconName || "Award";

                return (
                  <div
                    key={obj.id}
                    onClick={() => navigate(`/badge/${obj.id}`)}
                    style={{ cursor: "pointer", transitionDelay: `${index * 80}ms` }}
                    className={`${styles["badge-grid__card"]} reveal-card ${
                      !isEarned ? styles["badge-grid__card--locked"] : ""
                    }`}
                  >
                    <div className={styles["badge-grid__card-header"]}>
                      <span
                        className={`${styles["badge-grid__status-chip"]} ${
                          isEarned
                            ? styles["badge-grid__status-chip--received"]
                            : styles["badge-grid__status-chip--locked"]
                        }`}
                      >
                        {isEarned ? "Đã nhận" : "Chưa nhận"}
                      </span>
                    </div>

                    <div className={styles["badge-grid__card-body"]}>
                      <div
                        className={`${styles["badge-grid__card-icon"]} ${
                          isEarned
                            ? styles["badge-grid__card-icon--active"]
                            : styles["badge-grid__card-icon--disabled"]
                        }`}
                      >
                        <Icon name={iconName} size={24} />
                      </div>
                      <h3 className={styles["badge-grid__card-title"]}>{badgeName}</h3>
                      <p className={styles["badge-grid__card-desc"]}>{obj.description}</p>
                    </div>

                    <div className={styles["badge-grid__card-actions"]}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/badge/${obj.id}`);
                        }}
                        className={`${styles["badge-grid__btn"]} ${
                          isEarned
                            ? styles["badge-grid__btn--contained"]
                            : styles["badge-grid__btn--disabled"]
                        }`}
                      >
                        {isEarned ? "Xem chi tiết" : "Chưa đạt điều kiện"}
                      </button>
                    </div>
                  </div>
                );
              })}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default BadgeGrid;
