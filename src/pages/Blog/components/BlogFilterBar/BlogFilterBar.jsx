import React from "react";
import Icon from "~/components/Icon/Icon";
import styles from "./BlogFilterBar.module.css";

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI & Data" },
  { id: "career", label: "Sự nghiệp" },
  { id: "tech", label: "Tin tức Tech" },
];

export default function BlogFilterBar({
  activeCategory,
  onSelectCategory,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className={styles.bar_container}>
      <div className={styles.category_list}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`${styles.category_btn} ${
                isActive ? styles["category_btn--active"] : ""
              }`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className={styles.view_toggle_group}>
        <button
          type="button"
          className={`${styles.view_btn} ${
            viewMode === "grid" ? styles["view_btn--active"] : ""
          }`}
          onClick={() => onViewModeChange("grid")}
          title="Chế độ lưới"
          aria-label="Grid View"
        >
          <Icon name="Grid" size={16} />
        </button>
        <button
          type="button"
          className={`${styles.view_btn} ${
            viewMode === "list" ? styles["view_btn--active"] : ""
          }`}
          onClick={() => onViewModeChange("list")}
          title="Chế độ danh sách"
          aria-label="List View"
        >
          <Icon name="List" size={16} />
        </button>
      </div>
    </div>
  );
}
