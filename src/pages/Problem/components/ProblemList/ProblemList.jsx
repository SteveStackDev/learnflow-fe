import { Link, useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
import styles from "./ProblemList.module.css";

function ProblemList({
  filteredAndSortedItems,
  displayedItems,
  currentPage,
  setCurrentPage,
  totalPages,
  setSearchQuery,
  setActiveTab,
  setSelectedAlgorithm,
  setSelectedSort,
  ALGORITHM_OPTIONS,
  SORT_OPTIONS,
}) {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/problem/${item.slug || item.id}`);
  };

  const getBadgeClass = (level) => {
    if (level === "Dễ" || level === "Easy") return styles["prob-challenges__level-badge--easy"];
    if (level === "Trung bình" || level === "Medium") return styles["prob-challenges__level-badge--medium"];
    return styles["prob-challenges__level-badge--hard"];
  };

  return (
    <section className={styles["prob-challenges"]}>
      <div className={styles["prob-challenges__container"]}>
        {filteredAndSortedItems.length === 0 ? (
          <EmptyState
            iconName="Search"
            title="Không tìm thấy bài tập phù hợp"
            description="Hiện tại chưa có bài tập nào hoặc không có bài nào phù hợp với bộ lọc. Hãy thêm bài tập mới từ trang Quản trị hoặc xóa bộ lọc."
            actionLabel="Xóa tất cả bộ lọc"
            onAction={() => {
              setSearchQuery("");
              setActiveTab(0);
              setSelectedAlgorithm(ALGORITHM_OPTIONS[0]);
              setSelectedSort(SORT_OPTIONS[0]);
            }}
          />
        ) : (
          <div className={styles["prob-challenges__list-wrapper"]}>
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`${styles["prob-challenges__side-nav-btn"]} ${styles["prob-challenges__side-nav-btn--prev"]}`}
              title="Quay lại trang trước"
              aria-label="Quay lại trang trước"
            >
              <Icon name="ChevronLeft" size={24} />
            </button>

            <div className={styles["prob-challenges__list"]}>
              {displayedItems.map((obj) => (
                <div
                  key={obj.id || obj.slug}
                  className={`${styles["prob-challenges__card"]} reveal-card`}
                  onClick={() => handleCardClick(obj)}
                >
                  <div className={styles["prob-challenges__card-header"]}>
                    <div className={styles["prob-challenges__card-icon"]}>
                      <Icon name={obj.iconName || "Code"} size={22} />
                    </div>
                    <span
                      className={`${styles["prob-challenges__level-badge"]} ${getBadgeClass(obj.level || obj.difficulty)}`}
                    >
                      <span className={styles["prob-challenges__badge-dot"]} />
                      {obj.level || obj.difficultyLabel || "Dễ"}
                    </span>
                  </div>

                  <div className={styles["prob-challenges__card-body"]}>
                    <h3 className={styles["prob-challenges__card-title"]}>{obj.title}</h3>
                    <p className={styles["prob-challenges__card-desc"]}>
                      {obj.statement || obj.description}
                    </p>
                    <div className={styles["prob-challenges__tag-group"]}>
                      {(obj.tags || [obj.topic || "Thuật toán"]).map((item, tIdx) => (
                        <span key={tIdx} className={styles["prob-challenges__tag-item"]}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles["prob-challenges__card-actions"]}>
                    <span className={styles["prob-challenges__rate-text"]}>
                      <Icon name="Award" size={15} />
                      {obj.points ? `${obj.points} pts` : "500 pts"}
                    </span>
                    <Link
                      to={`/problem/${obj.slug || obj.id}`}
                      className={styles["prob-challenges__action-btn"]}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Giải bài
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`${styles["prob-challenges__side-nav-btn"]} ${styles["prob-challenges__side-nav-btn--next"]}`}
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

export default ProblemList;
