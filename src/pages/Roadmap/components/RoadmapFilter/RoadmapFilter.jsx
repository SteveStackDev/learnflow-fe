import Icon from "~/components/Icon/Icon";
import styles from "./RoadmapFilter.module.css";

function RoadmapFilter({
  searchQuery,
  setSearchQuery,
  totalCount,
  tabs,
  activeTab,
  handleTabChange,
  LEVEL_OPTIONS,
  selectedLevel,
  setSelectedLevel,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
}) {
  return (
    <section className={styles["roadmap-filters"]}>
      <div className={styles["roadmap-filters__container"]}>
        <div className={styles["roadmap-filters__header"]}>
          <span className={styles["roadmap-filters__subtitle"]}>
            <Icon name="Compass" size={15} />
            Lựa chọn con đường của bạn
          </span>
        </div>

        <div className={styles["roadmap-filters__search-row"]}>
          <div className={styles["roadmap-filters__search-wrapper"]}>
            <span className={styles["roadmap-filters__search-icon"]}>
              <Icon name="Search" size={18} />
            </span>
            <input
              id="roadmap-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm vị trí công nghệ bạn muốn theo đuổi..."
              aria-label="Tìm vị trí công nghệ bạn muốn theo đuổi"
              className={styles["roadmap-filters__search-input"]}
            />
          </div>
          <span className={styles["roadmap-filters__stats"]}>
            <Icon name="Layers" size={22} strokeWidth={2.5} />
            {totalCount} lộ trình học
          </span>
        </div>

        <div className={styles["roadmap-filters__controls-row"]}>
          <div className={styles["roadmap-filters__tab-group"]}>
            {tabs.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => handleTabChange(index)}
                className={`${styles["roadmap-filters__tab-btn"]} ${
                  activeTab === index
                    ? styles["roadmap-filters__tab-btn--active"]
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Custom Modern Dropdown Component */}
          <div className={styles["roadmap-filters__select-wrapper"]} ref={dropdownRef}>
            <span className={styles["roadmap-filters__select-label"]}>
              Hiển thị theo:
            </span>
            
            <div className={styles["roadmap-filters__dropdown-container"]}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${styles["roadmap-filters__dropdown-btn"]} ${
                  isDropdownOpen ? styles["roadmap-filters__dropdown-btn--open"] : ""
                }`}
              >
                <span>{selectedLevel.label}</span>
                <span className={styles["roadmap-filters__dropdown-chevron"]}>
                  <Icon name="ChevronDown" size={16} strokeWidth={2.5} />
                </span>
              </button>

              {isDropdownOpen && (
                <div className={styles["roadmap-filters__dropdown-menu"]}>
                  {LEVEL_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => {
                        setSelectedLevel(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`${styles["roadmap-filters__dropdown-item"]} ${
                        selectedLevel.id === option.id
                          ? styles["roadmap-filters__dropdown-item--selected"]
                          : ""
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedLevel.id === option.id && (
                        <span className={styles["roadmap-filters__dropdown-check"]}>
                          <Icon name="Check" size={15} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadmapFilter;
