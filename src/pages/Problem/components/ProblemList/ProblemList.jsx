import { Link, useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
import { useToast } from "~/context/ToastContext.jsx";
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
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/problem/${id || "two-sum"}`);
  };

  return (
    <section className={styles["prob-challenges"]}>
      <div className={styles["prob-challenges__container"]}>
        {filteredAndSortedItems.length === 0 ? (
          <EmptyState
            iconName="Search"
            title="Không tìm thấy bài tập phù hợp"
            description="Rất tiếc, không có bài tập nào phù hợp với bộ lọc hiện tại của bạn. Thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc."
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
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={`${styles["prob-challenges__card"]} reveal-card`}
                  onClick={() => handleCardClick(obj.id)}
                >
                  <div className={styles["prob-challenges__card-header"]}>
                    <div className={styles["prob-challenges__card-icon"]}>
                      <Icon name={obj.iconName} size={22} />
                    </div>
                    <span
                      className={`${styles["prob-challenges__level-badge"]} ${
                        obj.level === "Dễ"
                          ? styles["prob-challenges__level-badge--easy"]
                          : obj.level === "Trung bình"
                            ? styles["prob-challenges__level-badge--medium"]
                            : styles["prob-challenges__level-badge--hard"]
                      }`}
                    >
                      <span className={styles["prob-challenges__badge-dot"]} />
                      {obj.level}
                    </span>
                  </div>

                  <div className={styles["prob-challenges__card-body"]}>
                    <h3 className={styles["prob-challenges__card-title"]}>{obj.title}</h3>
                    <p className={styles["prob-challenges__card-desc"]}>{obj.description}</p>
                    <div className={styles["prob-challenges__tag-group"]}>
                      {obj.tags.map((item, tIdx) => (
                        <span key={tIdx} className={styles["prob-challenges__tag-item"]}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles["prob-challenges__card-actions"]}>
                    <span className={styles["prob-challenges__rate-text"]}>
                      <Icon name="Clock" size={15} />
                      Tỷ lệ: {obj.successRate}
                    </span>
                    <Link
                      to={`/problem/${obj.id || "two-sum"}`}
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
