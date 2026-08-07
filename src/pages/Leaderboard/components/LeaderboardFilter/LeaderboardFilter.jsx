import Icon from "~/components/Icon/Icon";
import styles from "./LeaderboardFilter.module.css";

function LeaderboardFilter({
  tabs,
  activeTab,
  handleTabChange,
  timeOptions,
  selectedTime,
  setSelectedTime,
  isTimeDropdownOpen,
  setIsTimeDropdownOpen,
  timeDropdownRef,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <section className={styles["board-filters"]}>
      <div className={styles["board-filters__container"]}>
        <div className={styles["board-filters__card-wrapper"]}>
          <div className={styles["board-filters__row"]}>
            {/* Left Category Tabs */}
            <div className={styles["board-filters__tab-group"]}>
              {tabs.map((item, index) => (
                <button
                  key={item.id || item.slug || item.name || item.title || item}
                  type="button"
                  onClick={() => handleTabChange(index)}
                  className={`${styles["board-filters__tab-btn"]} ${
                    activeTab === index
                      ? styles["board-filters__tab-btn--active"]
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Controls: Custom Dropdown & Search Input */}
            <div className={styles["board-filters__controls"]}>
              <div
                className={styles["board-filters__select-wrapper"]}
                ref={timeDropdownRef}
              >
                <button
                  type="button"
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  className={`${styles["board-filters__dropdown-btn"]} ${
                    isTimeDropdownOpen ? styles["board-filters__dropdown-btn--open"] : ""
                  }`}
                >
                  <span>{selectedTime.label}</span>
                  <span className={styles["board-filters__dropdown-chevron"]}>
                    <Icon name="ChevronDown" size={16} />
                  </span>
                </button>

                {isTimeDropdownOpen && (
                  <div className={styles["board-filters__dropdown-menu"]}>
                    {timeOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => {
                          setSelectedTime(option);
                          setIsTimeDropdownOpen(false);
                        }}
                        className={`${styles["board-filters__dropdown-item"]} ${
                          selectedTime.id === option.id
                            ? styles["board-filters__dropdown-item--selected"]
                            : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        {selectedTime.id === option.id && (
                          <span className={styles["board-filters__dropdown-check"]}>
                            <Icon name="Check" size={14} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles["board-filters__search-box"]}>
                <span className={styles["board-filters__search-icon"]}>
                  <Icon name="Search" size={16} />
                </span>
                <input
                  id="leaderboard-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm người dùng..."
                  aria-label="Tìm người dùng"
                  className={styles["board-filters__search-input"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardFilter;
