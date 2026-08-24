import React from "react";
import Icon from "~/components/Icon/Icon";
import { DropdownMenu } from "~/components/ui";
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
}) {
  const options = LEVEL_OPTIONS.map((item) => ({
    value: item.id,
    label: item.label,
  }));

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
                  activeTab === index ? styles["roadmap-filters__tab-btn--active"] : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Unified UI DropdownMenu Component */}
          <DropdownMenu
            prefix="Hiển thị theo:"
            options={options}
            value={selectedLevel?.id}
            onChange={(val) => {
              const target = LEVEL_OPTIONS.find((opt) => opt.id === val);
              if (target) setSelectedLevel(target);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default RoadmapFilter;
