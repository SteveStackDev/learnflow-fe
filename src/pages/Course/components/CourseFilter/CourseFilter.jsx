import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";
import styles from "./CourseFilter.module.css";

function CourseFilter({
  searchQuery,
  setSearchQuery,
  selectedSort,
  setSelectedSort,
  SORT_OPTIONS,
  filteredCount,
  activeCategoryTab,
  handleCategoryChange,
  categories,
}) {
  const options = SORT_OPTIONS.map((opt) => ({
    value: opt.id,
    label: opt.label,
  }));

  return (
    <>
      {/* 2. Search & Stats Bar Section */}
      <section className={styles["course-search-stats"]}>
        <div className={styles["course-search-stats__container"]}>
          <div className={styles["course-search-stats__card-wrapper"]}>
            {/* Search Input */}
            <div className={styles["course-search-stats__search-box"]}>
              <span className={styles["course-search-stats__search-icon"]}>
                <Icon name="Search" size={18} />
              </span>
              <input
                id="course-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học bạn muốn bắt đầu..."
                aria-label="Tìm khóa học bạn muốn bắt đầu"
                className={styles["course-search-stats__search-input"]}
              />
            </div>

            {/* Unified UI DropdownMenu Component */}
            <DropdownMenu
              options={options}
              value={selectedSort?.id}
              onChange={(val) => {
                const target = SORT_OPTIONS.find((opt) => opt.id === val);
                if (target) setSelectedSort(target);
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className={styles["course-filters"]}>
        <div className={styles["course-filters__container"]}>
          <div className={styles["course-filters__header-row"]}>
            <span className={styles["course-filters__section-subtitle"]}>
              <Icon name="BookOpen" size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
              Hiển thị {filteredCount} khóa học
            </span>

            <div className={styles["course-filters__tab-group"]}>
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles["course-filters__tab-btn"]} ${
                    activeCategoryTab === idx ? styles["course-filters__tab-btn--active"] : ""
                  }`}
                  onClick={() => handleCategoryChange(idx)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseFilter;
