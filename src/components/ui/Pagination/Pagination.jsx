import React from "react";
import styles from "./Pagination.module.css";
import Icon from "~/components/Icon/Icon";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showWrapper = true,
}) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const content = (
    <nav className={`${styles.pagination} ${className}`}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className={styles.page_btn}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        <Icon name="ChevronLeft" size={16} />
      </button>

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={() => onPageChange(pageNum)}
          className={`${styles.page_btn} ${
            currentPage === pageNum ? styles["page_btn--active"] : ""
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className={styles.page_btn}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
      >
        <Icon name="ChevronRight" size={16} />
      </button>
    </nav>
  );

  if (showWrapper) {
    return <div className={styles.pagination_wrapper}>{content}</div>;
  }

  return content;
}

export default Pagination;
