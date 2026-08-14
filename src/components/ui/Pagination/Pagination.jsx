import React, { useMemo } from "react";
import styles from "./Pagination.module.css";
import Icon from "~/components/Icon/Icon";

/**
 * Hàm hỗ trợ tạo danh sách trang có dấu ba chấm (...)
 */
function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
  // Tổng số nút hiển thị: siblingCount + firstPage + lastPage + currentPage + 2*Ellipsis
  const totalPageNumbers = siblingCount + 5;

  // Trường hợp số trang ít hơn tổng số nút muốn hiển thị
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Trường hợp 1: Không hiện dấu chấm bên trái, chỉ hiện bên phải
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  // Trường hợp 2: Chỉ hiện dấu chấm bên trái, không hiện bên phải
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [firstPageIndex, "...", ...rightRange];
  }

  // Trường hợp 3: Hiện dấu chấm ở cả 2 bên
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
  }
}

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
  showWrapper = true,
  siblingCount = 1,
}) {
  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  if (!totalPages || totalPages <= 1) return null;

  const content = (
    <nav className={`${styles.pagination} ${className}`} aria-label="Phân trang">
      {/* Nút Previous */}
      <button
        type="button"
        onClick={() => onPageChange?.(Math.max(currentPage - 1, 1))}
        className={styles.page_btn}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        <Icon name="ChevronLeft" size={16} />
      </button>

      {/* Render Danh sách trang */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <span key={`ellipsis-${index}`} className={styles.page_ellipsis}>
              &#8230;
            </span>
          );
        }

        const isActive = currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange?.(pageNumber)}
            className={`${styles.page_btn} ${isActive ? styles["page_btn--active"] : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Nút Next */}
      <button
        type="button"
        onClick={() => onPageChange?.(Math.min(currentPage + 1, totalPages))}
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