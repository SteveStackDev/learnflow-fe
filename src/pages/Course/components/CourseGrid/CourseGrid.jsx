import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
import heroUrl from "~/assets/images/Home/hero.webp";
import styles from "./CourseGrid.module.css";

function CourseGrid({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  setCurrentPage,
  totalPages,
  setSearchQuery,
  setActiveCategoryTab,
}) {
  const navigate = useNavigate();
  return (
    <section className={styles["course-grid"]}>
      <div className={styles["course-grid__container"]}>
        {filteredAndSortedItems.length === 0 ? (
          <EmptyState
            iconName="Search"
            title="Không tìm thấy khóa học phù hợp"
            description="Không có khóa học nào khớp với từ khóa tìm kiếm hoặc danh mục của bạn."
            actionLabel="Xóa tìm kiếm"
            onAction={() => {
              setSearchQuery("");
              setActiveCategoryTab(0);
            }}
          />
        ) : (
          <div className={styles["course-grid__list-wrapper"]}>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`${styles["course-grid__side-nav-btn"]} ${styles["course-grid__side-nav-btn--prev"]}`}
              title="Quay lại trang trước"
              aria-label="Quay lại trang trước"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <div className={styles["course-grid__list"]}>
              {displayedItems.map((obj) => (
                <div
                  key={obj.id}
                  className={`${styles["course-grid__card"]} reveal-card`}
                  onClick={() => navigate(`/course/${obj.id}/info`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles["course-grid__card-media-wrap"]}>
                    <span
                      className={`${styles["course-grid__level-chip"]} ${
                        obj.level === "Cơ bản"
                          ? styles["course-grid__level-chip--basic"]
                          : obj.level === "Trung cấp"
                            ? styles["course-grid__level-chip--intermediate"]
                            : styles["course-grid__level-chip--advanced"]
                      }`}
                    >
                      {obj.level}
                    </span>
                    <img
                      src={heroUrl}
                      alt={`Khóa học ${obj.title}`}
                      loading="lazy"
                      decoding="async"
                      className={styles["course-grid__card-img"]}
                    />
                  </div>

                  <div className={styles["course-grid__card-body"]}>
                    <h3 className={styles["course-grid__card-title"]}>{obj.title}</h3>
                    <p className={styles["course-grid__card-desc"]}>{obj.description}</p>
                    <div className={styles["course-grid__card-meta"]}>
                      <span className={styles["course-grid__meta-text"]}>
                        <Icon name="Book" size={15} />
                        {obj.lessonsCount}
                      </span>
                      <span className={styles["course-grid__meta-text"]}>
                        <Icon name="Users" size={16} />
                        {obj.studentsCount} học viên
                      </span>
                    </div>
                  </div>

                  <div className={styles["course-grid__card-actions"]}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${obj.id}/info`);
                      }}
                      className={styles["course-grid__action-btn"]}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`${styles["course-grid__side-nav-btn"]} ${styles["course-grid__side-nav-btn--next"]}`}
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

export default CourseGrid;
