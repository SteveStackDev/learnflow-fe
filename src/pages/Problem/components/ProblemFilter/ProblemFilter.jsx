import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import useDropdownKeyboard from "~/hooks/useDropdownKeyboard";
import styles from "./ProblemFilter.module.css";

function ProblemFilter({
  searchQuery,
  setSearchQuery,
  selectedAlgorithm,
  setSelectedAlgorithm,
  isAlgoDropdownOpen,
  setIsAlgoDropdownOpen,
  algoDropdownRef,
  ALGORITHM_OPTIONS,
  selectedSort,
  setSelectedSort,
  isSortDropdownOpen,
  setIsSortDropdownOpen,
  sortDropdownRef,
  SORT_OPTIONS,
  stats,
  categories,
  activeTab,
  handleTabChange,
}) {
  const algoKeyboard = useDropdownKeyboard({
    isOpen: isAlgoDropdownOpen,
    setIsOpen: setIsAlgoDropdownOpen,
    options: ALGORITHM_OPTIONS,
    selectedOption: selectedAlgorithm,
    onSelect: setSelectedAlgorithm,
  });

  const sortKeyboard = useDropdownKeyboard({
    isOpen: isSortDropdownOpen,
    setIsOpen: setIsSortDropdownOpen,
    options: SORT_OPTIONS,
    selectedOption: selectedSort,
    onSelect: setSelectedSort,
  });

  return (
    <>
      {/* 2. Search, Filter & Stats Section */}
      <section className={styles["prob-filter"]}>
        <div className={styles["prob-filter__container"]}>
          <div className={styles["prob-filter__card-wrapper"]}>
            <div className={styles["prob-filter__search-row"]}>
              <div className={styles["prob-filter__search-box"]}>
                <span className={styles["prob-filter__search-icon"]}>
                  <Icon name="Search" size={18} />
                </span>
                <input
                  id="problem-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài tập theo tên hoặc chủ đề..."
                  aria-label="Tìm kiếm bài tập theo tên hoặc chủ đề"
                  className={styles["prob-filter__search-input"]}
                />
              </div>

              {/* Custom Algorithm Filter Dropdown */}
              <div
                className={`${styles["prob-filter__select-wrapper"]} ${styles["prob-filter__select-wrapper--algo"]}`}
                ref={algoDropdownRef}
              >
                <button
                  type="button"
                  onClick={() => setIsAlgoDropdownOpen(!isAlgoDropdownOpen)}
                  onKeyDown={algoKeyboard.handleKeyDown}
                  aria-haspopup="listbox"
                  aria-expanded={isAlgoDropdownOpen}
                  aria-label="Lọc theo thuật toán"
                  className={`${styles["prob-filter__dropdown-btn"]} ${
                    selectedAlgorithm.id !== "all"
                      ? styles["prob-filter__dropdown-btn--active"]
                      : ""
                  } ${isAlgoDropdownOpen ? styles["prob-filter__dropdown-btn--open"] : ""}`}
                >
                  <span className={styles["prob-filter__dropdown-icon"]}>
                    <Icon name="Cpu" size={15} />
                  </span>
                  <span className={styles["prob-filter__dropdown-text"]}>
                    {selectedAlgorithm.label}
                  </span>
                  <span className={styles["prob-filter__dropdown-chevron"]}>
                    <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
                  </span>
                </button>

                {isAlgoDropdownOpen && (
                  <div className={styles["prob-filter__dropdown-menu"]} role="listbox">
                    {ALGORITHM_OPTIONS.map((option, index) => (
                      <div
                        key={option.id}
                        role="option"
                        aria-selected={selectedAlgorithm.id === option.id}
                        onClick={() => {
                          setSelectedAlgorithm(option);
                          setIsAlgoDropdownOpen(false);
                        }}
                        onMouseEnter={() => algoKeyboard.setFocusedIndex(index)}
                        className={`${styles["prob-filter__dropdown-item"]} ${
                          selectedAlgorithm.id === option.id
                            ? styles["prob-filter__dropdown-item--selected"]
                            : ""
                        } ${
                          algoKeyboard.focusedIndex === index
                            ? styles["prob-filter__dropdown-item--focused"]
                            : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        {selectedAlgorithm.id === option.id && (
                          <span className={styles["prob-filter__dropdown-check"]}>
                            <Icon name="Check" size={15} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Sort Dropdown */}
              <div
                className={`${styles["prob-filter__select-wrapper"]} ${styles["prob-filter__select-wrapper--sort"]}`}
                ref={sortDropdownRef}
              >
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  onKeyDown={sortKeyboard.handleKeyDown}
                  aria-haspopup="listbox"
                  aria-expanded={isSortDropdownOpen}
                  aria-label="Sắp xếp bài tập"
                  className={`${styles["prob-filter__dropdown-btn"]} ${
                    isSortDropdownOpen ? styles["prob-filter__dropdown-btn--open"] : ""
                  }`}
                >
                  <span className={styles["prob-filter__dropdown-text"]}>{selectedSort.label}</span>
                  <span className={styles["prob-filter__dropdown-chevron"]}>
                    <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
                  </span>
                </button>

                {isSortDropdownOpen && (
                  <div className={styles["prob-filter__dropdown-menu"]} role="listbox">
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
                        className={`${styles["prob-filter__dropdown-item"]} ${
                          selectedSort.id === option.id
                            ? styles["prob-filter__dropdown-item--selected"]
                            : ""
                        } ${
                          sortKeyboard.focusedIndex === index
                            ? styles["prob-filter__dropdown-item--focused"]
                            : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        {selectedSort.id === option.id && (
                          <span className={styles["prob-filter__dropdown-check"]}>
                            <Icon name="Check" size={15} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3 Metric Stat Cards */}
            <div className={styles["prob-filter__stat-list"]}>
              {stats.map((obj, index) => (
                <div
                  key={obj.id || obj.slug || obj.name || obj.title || obj}
                  className={styles["prob-filter__stat-card"]}
                >
                  <div
                    className={`${styles["prob-filter__stat-icon"]} ${
                      index === 0
                        ? styles["prob-filter__stat-icon--blue"]
                        : index === 1
                          ? styles["prob-filter__stat-icon--yellow"]
                          : styles["prob-filter__stat-icon--dark"]
                    }`}
                  >
                    <Icon name={obj.iconName} size={20} />
                  </div>
                  <div className={styles["prob-filter__stat-info"]}>
                    <span className={styles["prob-filter__stat-value"]}>{obj.value}</span>
                    <span className={styles["prob-filter__stat-label"]}>{obj.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Filter Tabs & Header Section */}
      <section className={styles["prob-tabs"]}>
        <div className={styles["prob-tabs__container"]}>
          <div className={styles["prob-tabs__header-row"]}>
            <div className={styles["prob-tabs__title-wrap"]}>
              <h2 className={styles["prob-tabs__section-title"]}>Danh sách bài tập</h2>
              <p className={styles["prob-tabs__section-subtitle"]}>
                Lựa chọn mức độ thử thách phù hợp với kỹ năng hiện tại của bạn.
              </p>
            </div>

            <div className={styles["prob-tabs__right-action-wrap"]}>
              <div className={styles["prob-tabs__tab-group"]}>
                {categories.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleTabChange(index)}
                    className={`${styles["prob-tabs__tab-btn"]} ${
                      activeTab === index ? styles["prob-tabs__tab-btn--active"] : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <Link to="/problem/list" className={styles["prob-tabs__view-all-btn"]}>
                <span>Xem tất cả</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProblemFilter;
