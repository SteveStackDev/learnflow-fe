import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";
import styles from "./LeaderboardFilter.module.css";

function LeaderboardFilter({
  tabs,
  activeTab,
  handleTabChange,
  timeOptions = [],
  selectedTime,
  setSelectedTime,
  searchQuery,
  setSearchQuery,
}) {
  const options = timeOptions.map((opt) => ({
    value: opt.id,
    label: opt.label,
  }));

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
                    activeTab === index ? styles["board-filters__tab-btn--active"] : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right Controls: Unified UI DropdownMenu & Search Input */}
            <div className={styles["board-filters__controls"]}>
              <DropdownMenu
                options={options}
                value={selectedTime?.id}
                onChange={(val) => {
                  const target = timeOptions.find((opt) => opt.id === val);
                  if (target) setSelectedTime(target);
                }}
              />

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
