import Icon from "~/components/Icon/Icon";
import styles from "./BadgeFilter.module.css";

function BadgeFilter({ searchQuery, setSearchQuery, tabs, activeTab, onTabChange }) {
  return (
    <section className={styles["badge-filters"]}>
      <div className={styles["badge-filters__container"]}>
        <div className={styles["badge-filters__card-wrapper"]}>
          <div className={styles["badge-filters__row"]}>
            <div className={styles["badge-filters__search-box"]}>
              <span className={styles["badge-filters__search-icon"]}>
                <Icon name="Search" size={18} />
              </span>
              <input
                id="badge-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm badge bạn muốn chinh phục..."
                aria-label="Tìm badge bạn muốn chinh phục"
                className={styles["badge-filters__search-input"]}
              />
            </div>

            <div className={styles["badge-filters__tab-group"]}>
              {tabs.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onTabChange(index)}
                  className={`${styles["badge-filters__tab-btn"]} ${
                    activeTab === index ? styles["badge-filters__tab-btn--active"] : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BadgeFilter;
