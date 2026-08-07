import Icon from "~/components/Icon/Icon";
import useDropdownKeyboard from "~/hooks/useDropdownKeyboard";
import styles from "./CourseFilter.module.css";

function CourseFilter({
  searchQuery,
  setSearchQuery,
  selectedSort,
  setSelectedSort,
  isSortDropdownOpen,
  setIsSortDropdownOpen,
  sortDropdownRef,
  SORT_OPTIONS,
  filteredCount,
  activeCategoryTab,
  handleCategoryChange,
  categories,
}) {
  const sortKeyboard = useDropdownKeyboard({
    isOpen: isSortDropdownOpen,
    setIsOpen: setIsSortDropdownOpen,
    options: SORT_OPTIONS,
    selectedOption: selectedSort,
    onSelect: setSelectedSort,
  });

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

            {/* Custom Sort Dropdown */}
            <div className={styles["course-search-stats__select-wrapper"]} ref={sortDropdownRef}>
              <button
                type="button"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                onKeyDown={sortKeyboard.handleKeyDown}
                aria-haspopup="listbox"
                aria-expanded={isSortDropdownOpen}
                aria-label="Sắp xếp khóa học"
                className={`${styles["course-search-stats__dropdown-btn"]} ${
                  isSortDropdownOpen ? styles["course-search-stats__dropdown-btn--open"] : ""
                }`}
              >
                <span>{selectedSort.label}</span>
                <span className={styles["course-search-stats__dropdown-chevron"]}>
                  <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
                </span>
              </button>

              {isSortDropdownOpen && (
                <div className={styles["course-search-stats__dropdown-menu"]} role="listbox">
                  {SORT_OPTIONS.map((option, index) => (
                    <div
                      key={option.id}
                      role="option"
                      aria-selected={selectedSort.id === option.id}
                      onClick={() => {
                        setSelectedSort(option);
                        setIsSortDropdownOpen(false);
                      }}
                      onMouseEnter={() => sortKeyboard.setFocusedIndex(index)}
                      className={`${styles["course-search-stats__dropdown-item"]} ${
                        selectedSort.id === option.id
                          ? styles["course-search-stats__dropdown-item--selected"]
                          : ""
                      } ${
                        sortKeyboard.focusedIndex === index
                          ? styles["course-search-stats__dropdown-item--focused"]
                          : ""
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedSort.id === option.id && (
                        <span className={styles["course-search-stats__dropdown-check"]}>
                          <Icon name="Check" size={15} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Badge */}
            <div className={styles["course-search-stats__stats-group"]}>
              <div className={styles["course-search-stats__stat-item"]}>
                <span className={styles["course-search-stats__stat-number"]}>{filteredCount}</span>
                <span className={styles["course-search-stats__stat-label"]}>Khóa học</span>
              </div>
              <div className={styles["course-search-stats__divider"]} />
              <div className={styles["course-search-stats__stat-item"]}>
                <span className={styles["course-search-stats__stat-number"]}>15</span>
                <span className={styles["course-search-stats__stat-label"]}>Lĩnh vực</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Tabs & Header Section */}
      <section className={styles["course-filters"]}>
        <div className={styles["course-filters__container"]}>
          <div className={styles["course-filters__header-row"]}>
            <div className={styles["course-filters__title-wrap"]}>
              <h2 className={styles["course-filters__section-title"]}>Tất cả khóa học</h2>
              <p className={styles["course-filters__section-subtitle"]}>
                Lựa chọn lộ trình học tập tối ưu cho sự nghiệp của bạn.
              </p>
            </div>

            <div className={styles["course-filters__tab-group"]}>
              {categories.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleCategoryChange(index)}
                  className={`${styles["course-filters__tab-btn"]} ${
                    activeCategoryTab === index ? styles["course-filters__tab-btn--active"] : ""
                  }`}
                >
                  {item}
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
