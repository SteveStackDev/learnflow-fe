import { useNavigate } from "react-router";
import Icon from "~/components/Icon/Icon";
import EmptyState from "~/components/EmptyState/EmptyState";
import { Pagination } from "~/components/ui";
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
  const navigate = useNavigate();

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
              {displayedItems.map((card) => {
                const targetId = card.slug || card.id;
                const bannerSrc = card.banner || card.thumbnail || card.imageUrl || heroUrl;
                const rawLabels =
                  Array.isArray(card.labels) && card.labels.length > 0 ? card.labels : [];
                const labelsList = rawLabels
                  .map((l) => (typeof l === "string" ? l : l.name || l.title || ""))
                  .filter(Boolean);
                console.log(labelsList);
                const rawTags = Array.isArray(card.tags) && card.tags.length > 0 ? card.tags : [];
                const tagsList = rawTags
                  .map((t) => (typeof t === "string" ? t : t.name || t.title || ""))
                  .filter(Boolean);

                const countDisplay = card.enrolledCount.toString()
                  ? `${card.enrolledCount} học viên`
                  : "0 học viên";

                return (
                  <div
                    key={card.id || targetId}
                    className={`${styles["roadmap-cards__card"]} reveal-card`}
                    onClick={() => navigate(`/roadmap/${targetId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {labelsList.map((item, idx) => (
                      <span
                        key={`${item}-${idx}`}
                        className={`${styles["roadmap-cards__card-badge"]} ${
                          item === "HOT"
                            ? styles["roadmap-cards__card-badge--hot"]
                            : styles["roadmap-cards__card-badge--new"]
                        }`}
                      >
                        {item}
                      </span>
                    ))}

                    <div className={styles["roadmap-cards__card-media-wrap"]}>
                      <img
                        className={styles["roadmap-cards__card-media"]}
                        src={bannerSrc}
                        alt={`Biểu tượng lộ trình học ${card.title || "lập trình"}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = heroUrl;
                        }}
                      />
                    </div>

                    <div className={styles["roadmap-cards__card-content"]}>
                      <div className={styles["roadmap-cards__card-header"]}>
                        <h3 className={styles["roadmap-cards__card-title"]}>{card.title}</h3>
                        <span className={styles["roadmap-cards__views-count"]}>
                          <Icon name={card.enrolledCount ? "Users" : "Eye"} size={14} />
                          {countDisplay}
                        </span>
                      </div>
                      <p className={styles["roadmap-cards__card-desc"]}>{card.description}</p>

                      <div className={styles["roadmap-cards__card-tags"]}>
                        {tagsList.map((item, idx) => (
                          <span
                            key={`${item}-${idx}`}
                            className={styles["roadmap-cards__tag-chip"]}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles["roadmap-cards__card-actions"]}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/roadmap/${targetId}`);
                        }}
                        className={styles["roadmap-cards__card-btn"]}
                      >
                        <span>Khám phá lộ trình</span>
                        <span className={styles["roadmap-cards__card-btn-arrow"]}>→</span>
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
              className={`${styles["roadmap-cards__side-nav-btn"]} ${styles["roadmap-cards__side-nav-btn--next"]}`}
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

export default RoadmapGrid;
