import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./ContestHeaderSearch.module.css";

export function ContestHeaderSearch({
  searchQuery,
  onSearchChange,
  tabs,
  activeTabIdx,
  onTabChange,
}) {
  return (
    <div className={styles.header_section}>
      {/* Search Input Bar */}
      <div className={styles.search_wrapper}>
        <div className={styles.search_icon}>
          <Icon name="Search" size={18} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm cuộc thi theo tên, người tạo..."
          className={styles.search_input}
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className={styles.clear_btn}
            title="Xóa tìm kiếm"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Tabs Filter Bar */}
      <div className={styles.tabs_container}>
        {tabs.map((tabLabel, idx) => (
          <button
            key={tabLabel}
            type="button"
            onClick={() => onTabChange(idx)}
            className={`${styles.tab_btn} ${
              activeTabIdx === idx ? styles["tab_btn--active"] : ""
            }`}
          >
            {tabLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContestHeaderSearch;
