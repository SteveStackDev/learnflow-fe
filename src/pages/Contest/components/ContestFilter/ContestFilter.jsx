import { Link } from "react-router";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestFilter.module.css";

function ContestFilter({ searchQuery, setSearchQuery, tabs, activeTab, handleTabChange }) {
  return (
    <section className={styles["contest-filters"]}>
      <div className={styles["contest-filters__container"]}>
        {/* Card Wrapper containing Search Box & Filter Tabs */}
        <div className={styles["contest-filters__card-wrapper"]}>
          <div className={styles["contest-filters__row"]}>
            <div className={styles["contest-filters__search-box"]}>
              <span className={styles["contest-filters__search-icon"]}>
                <Icon name="Search" size={18} />
              </span>
              <input
                id="contest-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm contest bạn muốn tham gia..."
                aria-label="Tìm contest bạn muốn tham gia"
                className={styles["contest-filters__search-input"]}
              />
            </div>

            <div className={styles["contest-filters__tab-group"]}>
              {tabs.map((item, index) => (
                <button
                  key={item.id || item.slug || item.name || item.title || item}
                  type="button"
                  onClick={() => handleTabChange(index)}
                  className={`${styles["contest-filters__tab-btn"]} ${
                    activeTab === index ? styles["contest-filters__tab-btn--active"] : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Right-Aligned View All Button Row Below the Sort/Filter Bar */}
        <div className={styles["contest-filters__view-all-row"]}>
          <Link to="/contest/list" className={styles["contest-filters__view-all-btn"]}>
            <span>Xem tất cả</span>
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContestFilter;
